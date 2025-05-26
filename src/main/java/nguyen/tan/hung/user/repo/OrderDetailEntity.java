package nguyen.tan.hung.user.repo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nguyen.tan.hung.product.repository.ProductEntity;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="orderdetail")
public class OrderDetailEntity {
    @Id
    @Column(name = "orderDetailId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer quantity;
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


    @ManyToOne
    @JoinColumn(name="productId")
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private OrderEntity order;

}
