package shop.petmily.domain.reservation.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.petmily.domain.pet.entity.Pet;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ReservationPet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ReservationPetId;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    public void addReservation(Reservation reservation){this.reservation = reservation;}

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    public void addPet(Pet pet){this.pet = pet;}
}
