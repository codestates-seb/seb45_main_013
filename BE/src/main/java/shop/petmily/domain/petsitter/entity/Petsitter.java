package shop.petmily.domain.petsitter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shop.petmily.domain.refreshToken.entity.RefreshToken;
import shop.petmily.domain.role.Role;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Petsitter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "petsitter_id")
    private Long petsitterId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(length = 255, unique = true, nullable = false)
    private String name;

    @Column(length = 255, unique = true, nullable = false)
    private String displayName;

    @Column(length = 255, unique = true, nullable = false)
    private String phone;

    @Column(length = 255, nullable = false)
    private String address;

    @Column(length = 255)
    private String possiblePetType;

    @Column(length = 255)
    private String possibleDay;

    @Column(length = 255)
    private String possibleTimeStart;

    @Column(length = 255)
    private String possibleTimeEnd;

    @Column(length = 255)
    private String possibleLocation;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

//    @ManyToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(name = "petsitter_roles", joinColumns = @JoinColumn(name = "petsitter_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Role> roles = new HashSet<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 255, nullable = false)
    private PetsitterStatus status = PetsitterStatus.PETSITTER_ACTIVE;

    @OneToMany(mappedBy = "petsitter", cascade = CascadeType.REMOVE)
    private List<RefreshToken> refreshTokens = new ArrayList<>();

    @Column(name = "create_at")
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(name = "last_modified_at")
    private LocalDateTime lastModifiedAt = LocalDateTime.now();

    private boolean isPetSitter = true;

    public enum PetsitterStatus {

        PETSITTER_ACTIVE("활동"),
        PETSITTER_SLEEP("휴면"),
        PETSITTER_QUIT("탈퇴");

        @Getter
        private String status;

        PetsitterStatus(String status) {
            this.status = status;
        }
    }
    public Petsitter(Long petsitterId) {
        this.petsitterId = petsitterId;
    }
}
