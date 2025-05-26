package nguyen.tan.hung.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/abouts")
public class AboutController {
    @GetMapping("/")
    public String about(){
        return "about";
    }
}
