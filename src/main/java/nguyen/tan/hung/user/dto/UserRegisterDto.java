package nguyen.tan.hung.user.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@PasswordCheck
public class UserRegisterDto {
    @NotEmpty(message = "Full name is required")
    private String fullName;

    @NotEmpty(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    @EmailCheckExist
    private String email;

    @Size(min = 8,message = "Password must be at least 8 characters")
    private String password;


    @Size(min = 8)
    private String reTypePassword;
}
