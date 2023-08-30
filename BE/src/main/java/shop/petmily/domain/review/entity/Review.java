package shop.petmily.domain.review.entity;

import lombok.*;
import org.hibernate.validator.constraints.Range;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.petsitter.entity.Petsitter;
import shop.petmily.domain.reservation.entity.Reservation;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @Column(length = 10000, nullable = false)
    private String body;

    @Range(min = 1, max = 5)
    private int star;

    @ElementCollection
    private List<String> photos = new ArrayList<>();

    public void addPhotos(String photo){
        photos.add(photo);
    }

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime lastModifiedAt;

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
