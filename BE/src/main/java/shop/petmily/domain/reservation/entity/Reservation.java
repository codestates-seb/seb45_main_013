package shop.petmily.domain.reservation.entity;

import lombok.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.global.audit.Auditable;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    @Column(length = 500, nullable = false)
    private String body;

    @Column
    private String phone;

    @Column
    private String adress;

    @Column(nullable = false)
    private Date reservationDay;

    @Column(nullable = false)
    private Time reservationTimeStart;

    @Column(nullable = false)
    private Time reservationTimeEnd;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.PERSIST)
    private List<ReservationPet> ReservationPets = new ArrayList<>();

    public void addReservationPets(ReservationPet reservationPet) {ReservationPets.add(reservationPet);}

    @Enumerated(EnumType.STRING)
    private Progress progress;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "petsitter_id")
    private Petsitter petsitter;
}
