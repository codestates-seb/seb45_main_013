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

    @Column
    @Enumerated(value = EnumType.STRING)
    private PetType type;

    @Column
    private String name;

    @Column
    private Integer age;

    @Column
    private String species;

    @Column
    private Integer weight;

    @Column
    private String photo;

    @Column
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
