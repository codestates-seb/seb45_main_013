package shop.petmily.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import shop.petmily.global.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @OneToOne(mappedBy = "member", cascade = CascadeType.PERSIST)
    private Petsitter petsitter;

    @Column(length = 30, unique = true, nullable = false)
    private String email;

    @Column(length = 30, unique = true, nullable = false)
    private String nickName;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean petsitterBoolean;

    @Column(length = 255)
    private String name;

    @Column(length = 11, unique = true)
    private String phone;

    @Column(length = 30)
    private String address;

    @Column
    private String photo;

    @Column(length = 300)
    private String body;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<RefreshToken> refreshTokens = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 255, nullable = false)
    private MemberStatus status = MemberStatus.MEMBER_ACTIVE;

    public enum MemberStatus {

        MEMBER_ACTIVE("활동"),
        MEMBER_SLEEP("휴면"),
        MEMBER_QUIT("탈퇴");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
    public Member(Long memberId) {
        this.memberId = memberId;
    }

    public void setRoles(List<String> roles) {
        this.roles = new ArrayList<>(roles);
    }

    public void setPetsitterBoolean(boolean petsitterBoolean) {
        this.petsitterBoolean = petsitterBoolean;
    }
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<MemberFavoritePetsitter> favoritePetsitters = new ArrayList<>();
}
