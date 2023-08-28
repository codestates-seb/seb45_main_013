package shop.petmily.domain.pet.entity;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long petId;

    @Column
    private String type;

    @Column
    private String name;

    @Column
    private int age;

    @Column
    private String species;

    @Column
    private int weight;

    @ElementCollection
    private List<String> photo;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime lastModifiedAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
