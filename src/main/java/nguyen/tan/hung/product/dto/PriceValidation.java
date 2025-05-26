package nguyen.tan.hung.product.dto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.annotation.Annotation;

public class PriceValidation implements ConstraintValidator<Price,ProductFilterRequest> {
    @Override
    public void initialize(Price constraintAnnotation) {
//        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(ProductFilterRequest productFilterRequest, ConstraintValidatorContext constraintValidatorContext) {
        Double minPrice=productFilterRequest.getMinPrice();
        Double maxPrice=productFilterRequest.getMaxPrice();
        if(minPrice!=null&&maxPrice!=null&&maxPrice<minPrice){
            return false;
        }
        return true;
    }
}
