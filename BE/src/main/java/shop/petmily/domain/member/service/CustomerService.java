package shop.petmily.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.petmily.domain.member.entity.Customer;
import shop.petmily.domain.member.entity.Member;
import shop.petmily.domain.member.repository.CustomerRepository;
import shop.petmily.global.exception.BusinessLogicException;
import shop.petmily.global.exception.ExceptionCode;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional
    public Customer addCustomerProfile(Customer customer) {
        return customerRepository.save(customer);
    }

    @Transactional(readOnly = true)
    public Customer findCustomer(Member member) {
        return customerRepository.findByMember(member).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
