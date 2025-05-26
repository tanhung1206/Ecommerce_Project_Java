package nguyen.tan.hung.product.service;

import nguyen.tan.hung.product.dto.ReviewDto;
import nguyen.tan.hung.product.repository.ReviewEntity;
import nguyen.tan.hung.product.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{
    final
    ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void saveReview(ReviewDto reviewDto) {
        reviewRepository.saveReview(reviewDto);
    }

    @Override
    public List<ReviewEntity> getReviewList(Integer productId,int page) {
        return reviewRepository.getReviewList(productId,page);
    }
}
