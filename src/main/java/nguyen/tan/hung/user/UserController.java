package nguyen.tan.hung.user;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import nguyen.tan.hung.service.EmailService;
import nguyen.tan.hung.user.dto.UserLoginDto;
import nguyen.tan.hung.user.dto.UserRegisterDto;
import nguyen.tan.hung.user.repo.UserEntity;
import nguyen.tan.hung.user.service.UserService;
import nguyen.tan.hung.utils.JwtUtilities;
import nguyen.tan.hung.utils.PassWordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Controller
@RequestMapping("/users/")
public class UserController {
    final
    UserService userService;
    final
    EmailService emailService;
    final
    JwtUtilities jwtUtilities;

//    @Autowired
//    public UserController(@Qualifier("userServiceImpl") UserService userService) {
    @Autowired
    public UserController(@Qualifier("userServiceImpl") UserService userService, EmailService emailService,JwtUtilities jwtUtilities) {
        this.userService = userService;
        this.emailService = emailService;
        this.jwtUtilities = jwtUtilities;
    }

    @GetMapping("/login")
    public String loginForm(@ModelAttribute("userLoginDto") UserLoginDto userLoginDto){
        return "login";
    }

    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("userLoginDto")UserLoginDto userLoginDto, BindingResult result, RedirectAttributes redirectAttributes, HttpSession session,HttpServletRequest request){
        if(result.hasErrors()){
            return "login";
        }
        else{
            UserEntity userEntity=userService.findUserByEmail(userLoginDto.getEmail());
            if(userEntity!=null){
                String passwordDb=userEntity.getPassword();
                if(PassWordUtils.matches(userLoginDto.getPassword(),passwordDb)){
                    if(userEntity.getIsActive()){
                        session.setAttribute("isLogin",true);
                        session.setAttribute("userId",userEntity.getId());
                        return "redirect:/products/";
                    }
                    else{
                        String token=jwtUtilities.generateToken(userEntity.getId());
                        String content= ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()+"/users/active?token="+token;
//                        request.getContextPath()+"/users/active?token="+token;
                        emailService.send(userLoginDto.getEmail(),"Active Account",content);// create new thread to do this
                        redirectAttributes.addFlashAttribute("message","Please check your email to active account");
                        return "redirect:/users/login";
                    }
                }
            }
            redirectAttributes.addFlashAttribute("error","Invalid username or password");
            return "redirect:/users/login";
        }
    }
    @GetMapping("/register")
    public String registerForm(@ModelAttribute("userRegisterDto")UserRegisterDto userRegisterDto){
        return "register";
    }

    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("userRegisterDto")UserRegisterDto userRegisterDto, BindingResult result, RedirectAttributes redirectAttributes, HttpServletRequest request){
        if(result.hasErrors()){
            return "register";
        }
        else{
            Integer userId=userService.save(userRegisterDto);
            String token=jwtUtilities.generateToken(userId);
            String content= ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()+"/users/active?token="+token;
            emailService.send(userRegisterDto.getEmail(),"Active Account",content);// create new thread to do this
            redirectAttributes.addFlashAttribute("message","Register successful. Please check your email to active account");
            return "redirect:/users/login";
        }
    }
    @GetMapping("/profile")
    public String profile(){
        return "profile";
    }

    @GetMapping("/active")
    public String active(@RequestParam(name = "token")String token,RedirectAttributes redirectAttributes){
        if(jwtUtilities.validateToken(token)){
            int userId=jwtUtilities.extractUserId(token);
            userService.activeUser(userId);
            redirectAttributes.addFlashAttribute("message","Your account is active.Please login");
            return "redirect:/users/login";
        }
        else{
            redirectAttributes.addFlashAttribute("error","Invalid token.Please enter your username,password to active account");
            return "redirect:/users/login";
        }
    }
}
