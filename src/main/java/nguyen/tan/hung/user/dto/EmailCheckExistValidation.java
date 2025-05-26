package nguyen.tan.hung.user.dto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import nguyen.tan.hung.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class EmailCheckExistValidation implements ConstraintValidator<EmailCheckExist,String> {

    private final UserService userService;

    @Autowired
    public EmailCheckExistValidation(@Qualifier("userServiceImpl") UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value!=null&&userService.isEmailExist(value)){
            return false;
        }
        return true;
    }
}
