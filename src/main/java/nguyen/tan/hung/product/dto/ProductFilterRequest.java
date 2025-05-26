package nguyen.tan.hung.product.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductFilterRequest {
    @Min(1)
    private Integer categoryId;

    @Min(1)
    private Integer brandId;

//    @NotEmpty
    private String name;

    @Min(1)
    @Max(5)
    private Integer rating;

    @Min(0)
    @Max(1000)
    private Double minPrice;

    @Min(0)
    @Max(1000)
    private Double maxPrice;

    @Min(0)
    private Integer page;

    @Min(1)
    @Max(6)
    private Integer sortId;
}
