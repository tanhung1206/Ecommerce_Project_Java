package nguyen.tan.hung.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nguyen.tan.hung.product.repository.ImageEntity;
import nguyen.tan.hung.product.repository.ProductEntity;
import nguyen.tan.hung.product.repository.ReviewEntity;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProductDetailDto {
    private int id;
    private String name;
    private Double price;
    private String mainImage;
    private int quantity;
    private String summary;
    private String description;
    private int rating;
    private String status;

    private List<ImageEntity> imageList;
//    private List<ReviewEntity> reviewList;

    public ProductDetailDto(ProductEntity entity){
        id=entity.getId();
        name=entity.getName();
        this.price=entity.getPrice();
        mainImage=entity.getMainImage();
        quantity=entity.getQuantity();
        summary=entity.getSummary();
        description=entity.getDescription();
        rating=entity.getRating();
        status=entity.getStatus();
        imageList=entity.getImageList();
//        reviewList=entity.getReviewList();
    }
}
