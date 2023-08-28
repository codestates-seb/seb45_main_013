package shop.petmily.domain.reservation.entity;

import lombok.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.pet.entity.Pet;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    // 예약 정보
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reservationId;

    @Column(length = 500, nullable = false)
    private String body; // 예약 시 요구 사항

    @Column(nullable = false)
    private String reservationTimeStart;

    @Column(nullable = false)
    private String reservationTimeEnd;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime lastModifiedAt;

    @Column(nullable = false)
    private String progress;

    // 예약자 정보
    @OneToMany
    @JoinColumn(name = "member_id")
    private Member member;

    // 펫시터 정보
//    @ManyToOne
//    @JoinColumn("petSitter_id")
//    private PetSitter petSitter;

//    private List<Pet> pets;


}
