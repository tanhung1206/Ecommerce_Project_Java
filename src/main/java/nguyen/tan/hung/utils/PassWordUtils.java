package nguyen.tan.hung.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PassWordUtils {
    private static final BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();

    public static String encode(String password){
        return encoder.encode(password);
    }
    public static boolean matches(String rawPassword,String hashedPassword){
        return encoder.matches(rawPassword,hashedPassword);
    }

}
