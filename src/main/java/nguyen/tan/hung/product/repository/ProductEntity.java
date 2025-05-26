package nguyen.tan.hung.product.repository;

import jakarta.persistence.*;
import lombok.*;
import nguyen.tan.hung.brand.repo.BrandEntity;
import nguyen.tan.hung.category.repo.CategoryEntity;
import nguyen.tan.hung.user.repo.CartItemEntity;
import nguyen.tan.hung.user.repo.OrderDetailEntity;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
//@Data
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="product")
public class ProductEntity {
    @Id
    @Column(name = "productId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Double price;
//    private Double newPrice;
    private String mainImage;
    private Integer quantity;
    private Integer soldQuantity;
    private String summary;
    private String description;
    private Integer rating;
    private String status;
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany
    @JoinColumn(name = "productId")
    private List<ImageEntity> imageList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")
    private CategoryEntity category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brandId")
    private BrandEntity brand;

    @OneToMany
    @JoinColumn(name = "productId")
    private List<ReviewEntity> reviewList;

    @OneToMany
    @JoinColumn(name = "productId")
    private List<OrderDetailEntity>orderDetailList;

    @OneToMany
    @JoinColumn(name = "productId")
    private List<CartItemEntity>cartItemEntityList;

}
