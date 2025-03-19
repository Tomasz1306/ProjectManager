package com.projectmanager.backend.config;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "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";

    private List<String> blackList = new ArrayList<String>();

    public boolean isTokenOnBlackList(String token) {
        for (String _token : blackList) {
            if (token.equals(_token)) {
                return true;
            }
        }
        return false;
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public void addTokenToBlackList(String token, UserDetails userDetails) {
        if (isTokenValid(token, userDetails)) {
            blackList.add(token);
        }
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String generateToken(Map<String, Object> extraClaims,
            UserDetails userDetails) {
        return Jwts.builder().setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
