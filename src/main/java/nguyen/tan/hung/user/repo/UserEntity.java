package nguyen.tan.hung.user.repo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nguyen.tan.hung.product.repository.ReviewEntity;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class UserEntity {
    @Id
    @Column(name = "userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String userName;
    private String email;
    private String fullName;
    private String password;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private String avatar;
    private Boolean isAdmin;
    private Boolean isActive;

    @OneToMany
    @JoinColumn(name = "userId")
    List<ReviewEntity> reviewList;

    @OneToMany
    @JoinColumn(name = "userId")
    List<AddressEntity> addressList;

    @OneToMany
    @JoinColumn(name = "userId")
    List<CartItemEntity> cartItemList;

    @OneToMany
    @JoinColumn(name = "userId")
    List<OrderEntity> orderList;
}
