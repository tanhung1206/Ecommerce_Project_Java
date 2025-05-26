package nguyen.tan.hung.brand.repo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nguyen.tan.hung.product.repository.ProductEntity;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "brand")
public class BrandEntity {
    @Id
    @Column(name = "brandId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String imagePath;
    private String name;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany
    @JoinColumn(name = "brandId")
    List<ProductEntity> productList;
}
