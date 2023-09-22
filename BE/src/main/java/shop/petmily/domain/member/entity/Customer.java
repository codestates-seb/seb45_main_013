package shop.petmily.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(length = 255)
    private String name;

    @Column(length = 11, unique = true)
    private String phone;

    @Column(length = 30)
    private String address;

    @Column(length = 500)
    private String photo;
}
