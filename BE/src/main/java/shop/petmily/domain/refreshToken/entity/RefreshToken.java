package shop.petmily.domain.refreshToken.entity;

import shop.petmily.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.petmily.domain.petsitter.entity.Petsitter;

import javax.persistence.*;

@Entity
@Table(name = "refresh_token")
@NoArgsConstructor
@Getter
@Setter
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PETSITTER_ID")
    private Petsitter petsitter;

    @Column(name = "REFRESH_TOKEN", nullable = false)
    private String value;
}
