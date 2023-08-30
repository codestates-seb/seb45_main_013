package shop.petmily.domain.pet.service;

import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.repository.PetRepository;
import shop.petmily.global.AWS.service.S3UploadService;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PetService {
    private final PetRepository repository;
    private final S3UploadService uploadService;

    public PetService(PetRepository repository, S3UploadService uploadService)
    {
        this.repository = repository;
        this.uploadService = uploadService;
    }

    public Pet createPet(Pet pet, MultipartFile file) throws IOException {
        LocalDateTime now = LocalDateTime.now();

        pet.setCreatedAt(now);
        pet.setLastModifiedAt(now);

        if(file != null) pet.setPhoto(uploadService.saveFile(file));

        return repository.save(pet);
    }

    public Pet updatePet(Pet pet, MultipartFile file) throws IOException {
        Pet verifiedPet = verifiedPet(pet.getPetId());

        verifiedPetOwner(verifiedPet.getMember().getMemberId(), pet.getMember().getMemberId());

        if(pet.getAge() != 0) verifiedPet.setAge(pet.getAge());
        if(pet.getWeight() != 0) verifiedPet.setWeight(pet.getWeight());

        if(file != null) {
            if(verifiedPet.getPhoto() != null) uploadService.deleteFile(verifiedPet.getPhoto());
            verifiedPet.setPhoto(uploadService.saveFile(file));
        }

        verifiedPet.setLastModifiedAt(LocalDateTime.now());

        return repository.save(verifiedPet);
    }

    public Pet photoDelete(long petId, Long requestMemberId){
        Pet verifiedPet = verifiedPet(petId);
        verifiedPetOwner(verifiedPet.getMember().getMemberId(), requestMemberId);

        uploadService.deleteFile(verifiedPet.getPhoto());
        verifiedPet.setPhoto(null);
        verifiedPet.setLastModifiedAt(LocalDateTime.now());

        return repository.save(verifiedPet);
    }

    public Pet findPet(long petId){
        Pet verifiedPet = verifiedPet(petId);
        return  verifiedPet;
    }

    public void deletePet(long petId, Long requestMemberId){
        Pet verifiedPet = verifiedPet(petId);
        verifiedPetOwner(verifiedPet.getMember().getMemberId(), requestMemberId);
        repository.delete(verifiedPet);
    }

    private Pet verifiedPet(long petId) {
        Optional<Pet> optionalPet = repository.findById(petId);
        Pet pet = optionalPet.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PET_NOT_EXIST));
        return pet;
    }

    private void verifiedPetOwner(long originMemberId, Long requestMemberId) {
        if (originMemberId != requestMemberId) throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
    }
}