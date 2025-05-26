package nguyen.tan.hung.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nguyen.tan.hung.product.repository.ProductEntity;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class ProductFilterDto {
    private int id;
    private String name;
    private double price;
    private String mainImage;
    private int rating;

    public ProductFilterDto(ProductEntity entity){
        id=entity.getId();
        name=entity.getName();
        price=entity.getPrice();
        mainImage=entity.getMainImage();
        rating=entity.getRating();
    }
}
