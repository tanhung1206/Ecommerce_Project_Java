package nguyen.tan.hung.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/carts")
public class CartController {
    @GetMapping("/")
    public String cart(){
        return "cart";
    }
}
