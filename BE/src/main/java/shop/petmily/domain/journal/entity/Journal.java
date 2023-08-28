package shop.petmily.domain.journal.entity;

import lombok.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.reservation.entity.Reservation;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long journalId;

    @Column(length = 10000, nullable = false)
    private String body;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime lastModifiedAt;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

//    @OneToOne
//    @JoinColumn(name = "petStter_id")
//    private PetSitter petSitter;


}
