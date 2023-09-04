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

    @Column
    private String photo;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
