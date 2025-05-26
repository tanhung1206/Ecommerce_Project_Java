package nguyen.tan.hung.user.repo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="address")
public class AddressEntity {
    @Id
    @Column(name = "addressId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fullName;
    private String phoneNumber;
    private String street;
    private String ward;
    private String district;
    private String city;
    private String postalCode;
    private String country;
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany
    @JoinColumn(name = "addressId")
    private List<OrderEntity> orderEntityList;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserEntity user;
}
