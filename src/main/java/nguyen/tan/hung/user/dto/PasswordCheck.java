package nguyen.tan.hung.user.dto;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy=PasswordValidation.class)
public @interface PasswordCheck {
    String message() default "Password doesn't match";
    Class<?>[]groups() default{};
    public abstract Class<? extends Payload>[]payload() default{};
}
