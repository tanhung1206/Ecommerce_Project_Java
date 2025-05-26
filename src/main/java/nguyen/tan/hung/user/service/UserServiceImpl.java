package nguyen.tan.hung.user.service;

import nguyen.tan.hung.product.dto.ReviewDto;
import nguyen.tan.hung.user.dto.UserLoginDto;
import nguyen.tan.hung.user.dto.UserRegisterDto;
import nguyen.tan.hung.user.repo.UserEntity;
import nguyen.tan.hung.user.repo.UserRepository;
import nguyen.tan.hung.utils.PassWordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    final
    UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isEmailExist(String email) {
        if(userRepository.findUserByEmail(email)==null){
            return false;
        }
        return true;
    }

    @Override
    public int save(UserRegisterDto userRegisterDto) {
        UserEntity entity=UserEntity.builder()
                .fullName(userRegisterDto.getFullName())
                .email(userRegisterDto.getEmail())
                .password(PassWordUtils.encode(userRegisterDto.getPassword()))
                .isActive(false)
                .build();
        return userRepository.save(entity);
    }

//    @Override
//    public int validateLogin(UserLoginDto userLoginDto) {
//        UserEntity userDb=userRepository.findUserByEmail(userLoginDto.getEmail());
//        if(userDb!=null){
//            String passwordDb=userDb.getPassword();
//            if(PassWordUtils.matches(userLoginDto.getPassword(),passwordDb)){
//                if(userDb.getIsActive()){
//                    return 0;
//                }
//                else{
//                    return 1;
//                }
//            }
//        }
//        return 2;
//    }

    @Override
    public void activeUser(int userId) {
        userRepository.activeUser(userId);
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public void saveReview(ReviewDto reviewDto) {

    }
}
