package nguyen.tan.hung.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class UserInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        return HandlerInterceptor.super.preHandle(request, response, handler);
        HttpSession session=request.getSession();
        if(session.getAttribute("isLogin")==null){
            response.sendRedirect(request.getContextPath()+"/users/login");
            return false;
        }
        return true;
    }
}
