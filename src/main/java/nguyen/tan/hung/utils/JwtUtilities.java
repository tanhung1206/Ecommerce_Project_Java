package nguyen.tan.hung.utils;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Component
@PropertySource("classpath:key.properties")
public class JwtUtilities {
    private String jwtsecret;

    private long jwtExpirationTime;

    private Key key;

    //    public JwtUtilities(){
//        this.key=getSignKey();
//    }
    public JwtUtilities(
            @Value("${jwt.jwtsecret}") String jwtsecret,
            @Value("${jwt.jwtExpirationTime}") long jwtExpirationTime
    ) {
        this.jwtsecret = jwtsecret;
        this.jwtExpirationTime = jwtExpirationTime;
        try {
            this.key = getSignKey(); // Lúc này jwtsecret đã được inject
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    public Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtsecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Integer id) {
        return Jwts.builder()
                .setSubject(id + "")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(Date.from(Instant.now().plus(jwtExpirationTime, ChronoUnit.MILLIS)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Integer extractUserId(String token) {
        return Integer.parseInt(extractClaim(token, Claims::getSubject));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


}
