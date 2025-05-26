package nguyen.tan.hung.user.dto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidation implements ConstraintValidator<PasswordCheck,UserRegisterDto> {

    @Override
    public boolean isValid(UserRegisterDto value, ConstraintValidatorContext context) {
        String password=value.getPassword();
        String reTypePassword=value.getReTypePassword();
        if(password!=null&&reTypePassword!=null&&!password.equals(reTypePassword)){
            context.disableDefaultConstraintViolation();
            context
                    .buildConstraintViolationWithTemplate("Password does not match")
                    .addPropertyNode("reTypePassword")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
