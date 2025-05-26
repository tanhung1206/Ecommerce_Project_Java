package nguyen.tan.hung.product.dto;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PriceValidation.class)
public @interface Price {
    String message() default "maxPrice must be greater than or equal to minPrice";

    Class<?>[] groups() default {};

    public abstract Class<? extends Payload>[] payload() default {};
}
