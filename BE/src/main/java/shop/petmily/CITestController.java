package shop.petmily;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CITestController {

    @GetMapping("/hello")
    public String helloworld(){
        return "Hello hello!!";
    }

}
