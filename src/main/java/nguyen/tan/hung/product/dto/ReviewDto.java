package nguyen.tan.hung.product.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewDto {
    @Min(1)
    @Max(5)
    private int rating;

    @NotEmpty
    private String review;

    private int userId;
    private int productId;
}
