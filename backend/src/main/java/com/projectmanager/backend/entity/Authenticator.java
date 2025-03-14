package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "authenticator")
public class Authenticator {
    @EmbeddedId
    private AuthenticatorId id;

    @MapsId("userid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userid", nullable = false)
    private Person userid;

    @Column(name = "provideraccountid", nullable = false, length = Integer.MAX_VALUE)
    private String provideraccountid;

    @Column(name = "credentialpublickey", nullable = false, length = Integer.MAX_VALUE)
    private String credentialpublickey;

    @Column(name = "counter", nullable = false)
    private Integer counter;

    @Column(name = "credentialdevicetype", nullable = false, length = Integer.MAX_VALUE)
    private String credentialdevicetype;

    @Column(name = "credentialbackedup", nullable = false)
    private Boolean credentialbackedup = false;

    @Column(name = "transports", length = Integer.MAX_VALUE)
    private String transports;

    public AuthenticatorId getId() {
        return id;
    }

    public void setId(AuthenticatorId id) {
        this.id = id;
    }

    public Person getUserid() {
        return userid;
    }

    public void setUserid(Person userid) {
        this.userid = userid;
    }

    public String getProvideraccountid() {
        return provideraccountid;
    }

    public void setProvideraccountid(String provideraccountid) {
        this.provideraccountid = provideraccountid;
    }

    public String getCredentialpublickey() {
        return credentialpublickey;
    }

    public void setCredentialpublickey(String credentialpublickey) {
        this.credentialpublickey = credentialpublickey;
    }

    public Integer getCounter() {
        return counter;
    }

    public void setCounter(Integer counter) {
        this.counter = counter;
    }

    public String getCredentialdevicetype() {
        return credentialdevicetype;
    }

    public void setCredentialdevicetype(String credentialdevicetype) {
        this.credentialdevicetype = credentialdevicetype;
    }

    public Boolean getCredentialbackedup() {
        return credentialbackedup;
    }

    public void setCredentialbackedup(Boolean credentialbackedup) {
        this.credentialbackedup = credentialbackedup;
    }

    public String getTransports() {
        return transports;
    }

    public void setTransports(String transports) {
        this.transports = transports;
    }

}