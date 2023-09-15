package shop.petmily.domain.pet.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.service.MemberService;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.repository.PetRepository;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PetService {
    private final PetRepository repository;
    private final S3UploadService uploadService;
    private final MemberService memberService;

    public PetService(PetRepository repository,
                      S3UploadService uploadService,
                      MemberService memberService){
        this.repository = repository;
        this.uploadService = uploadService;
        this.memberService = memberService;
    }

    //펫생성
    public void createPet(Pet pet, MultipartFile file){
        if(file != null) pet.setPhoto(uploadService.saveFile(file));
        repository.save(pet);
    }

    //펫수정
    public void updatePet(Pet pet, MultipartFile file){
        Pet verifiedPet = verifiedPet(pet.getPetId());
        String beforeFileName = null;

        petActiveCheck(verifiedPet);
        verifiedPetOwner(verifiedPet.getMember().getMemberId(), pet.getMember().getMemberId());

        Optional.ofNullable(pet.getAge())
                .ifPresent(verifiedPet::setAge);
        Optional.ofNullable(pet.getWeight())
                .ifPresent(verifiedPet::setWeight);
        Optional.ofNullable(pet.getName())
                .ifPresent(verifiedPet::setName);
        Optional.ofNullable(pet.getBody())
                .ifPresent(verifiedPet::setBody);
        Optional.ofNullable(pet.getNeutering())
                .ifPresent(neutering -> {
                    if (!verifiedPet.getNeutering() && neutering) {
                        verifiedPet.setNeutering(true);
                    } else {
                        throw new BusinessLogicException(ExceptionCode.ALREADY_NEUTERING);
                    }
                });

        if(verifiedPet.getPhoto() != null) beforeFileName = verifiedPet.getPhoto();
        if(file != null) verifiedPet.setPhoto(uploadService.saveFile(file));

        repository.save(verifiedPet);

        if(beforeFileName != null) uploadService.deleteFile(beforeFileName);
    }

    //펫사진삭제
    public void photoDelete(Long petId, Long requestMemberId){
        Pet verifiedPet = verifiedPet(petId);
        String beforeFileName;

        petActiveCheck(verifiedPet);
        verifiedPetOwner(verifiedPet.getMember().getMemberId(), requestMemberId);

        if(verifiedPet.getPhoto() != null) {
            beforeFileName = verifiedPet.getPhoto();
        } else {
            throw new BusinessLogicException(ExceptionCode.NO_PHOTO);
        }

        verifiedPet.setPhoto(null);
        repository.save(verifiedPet);

        uploadService.deleteFile(beforeFileName);

    }

    //펫1마리 정보 찾기
    public Pet findPet(Long petId){
        Pet verifiedPet = verifiedPet(petId);
        petActiveCheck(verifiedPet);
        return verifiedPet;
    }

    //특정 멤버 펫 전부 찾기
    public List<Pet> findPets(Long memberId){
        Member member = memberService.findMember(memberId);
        return  repository.findByMemberAndActive(member, true);
    }

    //펫 삭제(비활성화)
    public void disablePet(Long petId, Long requestMemberId){
        Pet verifiedPet = verifiedPet(petId);

        petActiveCheck(verifiedPet);
        verifiedPetOwner(verifiedPet.getMember().getMemberId(), requestMemberId);

        verifiedPet.setActive(false);
        repository.save(verifiedPet);
    }

    //펫 검증
    private Pet verifiedPet(Long petId) {
        Optional<Pet> optionalPet = repository.findById(petId);
        return optionalPet.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_EXIST));
    }

    //펫 주인 판별
    public void verifiedPetOwner(long originMemberId, Long requestMemberId) {
        if (originMemberId != requestMemberId) throw new BusinessLogicException(ExceptionCode.NOT_MY_PET);
    }

    //펫 활성화 검증
    public void petActiveCheck(Pet pet){
        if (!pet.getActive()) throw new BusinessLogicException(ExceptionCode.NOT_ACTIVE_PET);
    }
}
