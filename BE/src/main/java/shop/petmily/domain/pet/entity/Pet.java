package shop.petmily.domain.pet.entity;

import lombok.Getter;
import lombok.Setter;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Pet extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petId;

    @Column(length = 255 ,nullable = false)
    @Enumerated(value = EnumType.STRING)
    private PetType type;

    @Column(length = 255 ,nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Column(length = 255 ,nullable = false)
    private String species;

    @Column(nullable = false)
    private Integer weight;

    @Column(length = 500)
    private String photo;

    @Column(length = 500)
    private String body;

    @Column
    private Boolean male;

    @Column
    private Boolean neutering;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public enum PetType{
        DOG("강아지"),
        CAT("고양이");

        @Getter
        private String petType;

        PetType(String petType){this.petType = petType;}
    }
}
