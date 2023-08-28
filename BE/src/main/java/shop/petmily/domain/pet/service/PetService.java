package shop.petmily.domain.pet.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.pet.repository.PetRepository;
import shop.petmily.global.AWS.service.S3UploadService;

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

        Optional.ofNullable(pet.getAge())
                .ifPresent(age -> verifiedPet.setAge(age));
        Optional.ofNullable(pet.getWeight())
                .ifPresent(weight -> verifiedPet.setWeight(weight));

        if(file != null) {
            uploadService.deleteFile(verifiedPet.getPhoto());
            verifiedPet.setPhoto(uploadService.saveFile(file));
        }

        verifiedPet.setLastModifiedAt(LocalDateTime.now());

        return repository.save(verifiedPet);
    }

    public void deletePet(long petId){
        repository.delete(verifiedPet(petId));
    }

    private Pet verifiedPet(long petId) {
        Optional<Pet> optionalPet = repository.findById(petId);
        Pet pet = optionalPet.orElseThrow(() -> new RuntimeException());
        return pet;
    }
}
