package nguyen.tan.hung.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserLoginDto {
    @Email(message = "Please enter a valid email address")
    @NotEmpty(message = "Email is required")
    private String email;

    @Size(min = 8,message = "Password must be at least 8 characters")
    private String password;
}
