package nguyen.tan.hung.user.service;

import jakarta.validation.Valid;
import nguyen.tan.hung.product.dto.ReviewDto;
import nguyen.tan.hung.user.dto.UserLoginDto;
import nguyen.tan.hung.user.dto.UserRegisterDto;
import nguyen.tan.hung.user.repo.UserEntity;

public interface UserService {
    public boolean isEmailExist(String email);

    int save( UserRegisterDto userRegisterDto);

//    int validateLogin( UserLoginDto userLoginDto);

    void activeUser(int userId);
    UserEntity findUserByEmail(String email);

    void saveReview( ReviewDto reviewDto);
}
