package shop.petmily.domain.reservation.entity;

import lombok.*;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.pet.entity.Pet;
import shop.petmily.domain.petsitter.entity.Petsitter;

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
    private String body;

    @Column(nullable = false)
    private String reservationTimeStart;

    @Column(nullable = false)
    private String reservationTimeEnd;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime lastModifiedAt;

    @Enumerated(EnumType.STRING)
    private Progress progress;

    // 회원(예약자) 정보
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 펫시터 정보
    @ManyToOne
    @JoinColumn(name = "petsitter_id")
    private Petsitter petsitter;
}
