package nguyen.tan.hung.product.service;

import nguyen.tan.hung.product.dto.ReviewDto;
import nguyen.tan.hung.product.repository.ReviewEntity;

import java.util.List;

public interface ReviewService {
    void saveReview(ReviewDto reviewDto);

    List<ReviewEntity> getReviewList(Integer productId,int page);
}
