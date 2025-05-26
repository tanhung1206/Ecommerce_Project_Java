package nguyen.tan.hung.product.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import nguyen.tan.hung.product.dto.ReviewDto;
import nguyen.tan.hung.user.repo.UserEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class ReviewRepository {
    @PersistenceContext
    private EntityManager entityManager;
    @Transactional
    public void saveReview(ReviewDto reviewDto) {
        UserEntity user=entityManager.find(UserEntity.class,reviewDto.getUserId());
        ProductEntity product=entityManager.find(ProductEntity.class,reviewDto.getProductId());
        if(user!=null&&product!=null){
            ReviewEntity entity=ReviewEntity.builder()
                    .user(user)
                    .product(product)
                    .review(reviewDto.getReview())
                    .stars(reviewDto.getRating())
                    .build();
            entityManager.persist(entity);
        }
    }

    public List<ReviewEntity> getReviewList(Integer productId,int page) {
        TypedQuery<ReviewEntity>query=entityManager.createQuery("from ReviewEntity r where r.product.id=:productId",ReviewEntity.class);
        query.setFirstResult((page-1)*1);
        query.setMaxResults(1);
        return query.getResultList();
    }
}
