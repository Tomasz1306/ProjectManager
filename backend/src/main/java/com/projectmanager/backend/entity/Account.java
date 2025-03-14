package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table(name = "account")
public class Account {
    @EmbeddedId
    private AccountId id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userid", nullable = false)
    private Person userid;

    @Column(name = "type", nullable = false, length = Integer.MAX_VALUE)
    private String type;

    @Column(name = "refresh_token", length = Integer.MAX_VALUE)
    private String refreshToken;

    @Column(name = "access_token", length = Integer.MAX_VALUE)
    private String accessToken;

    @Column(name = "expires_at")
    private Integer expiresAt;

    @Column(name = "token_type", length = Integer.MAX_VALUE)
    private String tokenType;

    @Column(name = "scope", length = Integer.MAX_VALUE)
    private String scope;

    @Column(name = "id_token", length = Integer.MAX_VALUE)
    private String idToken;

    @Column(name = "session_state", length = Integer.MAX_VALUE)
    private String sessionState;

    @ColumnDefault("now()")
    @Column(name = "createdat", nullable = false)
    private Instant createdat;

    @ColumnDefault("now()")
    @Column(name = "updatedat", nullable = false)
    private Instant updatedat;

    public AccountId getId() {
        return id;
    }

    public void setId(AccountId id) {
        this.id = id;
    }

    public Person getUserid() {
        return userid;
    }

    public void setUserid(Person userid) {
        this.userid = userid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Integer getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Integer expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public String getSessionState() {
        return sessionState;
    }

    public void setSessionState(String sessionState) {
        this.sessionState = sessionState;
    }

    public Instant getCreatedat() {
        return createdat;
    }

    public void setCreatedat(Instant createdat) {
        this.createdat = createdat;
    }

    public Instant getUpdatedat() {
        return updatedat;
    }

    public void setUpdatedat(Instant updatedat) {
        this.updatedat = updatedat;
    }

}