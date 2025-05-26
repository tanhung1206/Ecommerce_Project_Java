package nguyen.tan.hung.user.dto;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailCheckExistValidation.class)
public @interface EmailCheckExist {
    String message() default "Email is exist";
    Class<?>[] groups() default {};
    public abstract Class<? extends Payload>[] payload() default {};
}
