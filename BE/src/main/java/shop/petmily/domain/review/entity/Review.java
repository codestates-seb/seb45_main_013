package shop.petmily.domain.review.entity;

import lombok.*;
import org.hibernate.validator.constraints.Range;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.entity.Petsitter;
import shop.petmily.domain.reservation.entity.Reservation;
import shop.petmily.global.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(length = 10000, nullable = false)
    private String body;

    @Range(min = 1, max = 5)
    private Integer star;

    @ElementCollection
    private List<String> photos = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "petsitter_id")
    private Petsitter petsitter;

}
