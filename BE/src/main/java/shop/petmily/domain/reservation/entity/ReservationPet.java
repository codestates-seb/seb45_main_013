package shop.petmily.domain.reservation.entity;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.pet.entity.Pet;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ReservationPet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ReservationPetId;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;
}
