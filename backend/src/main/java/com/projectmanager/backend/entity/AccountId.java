package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class AccountId implements java.io.Serializable {
    private static final long serialVersionUID = 1158849339771324166L;
    @Column(name = "provider", nullable = false, length = Integer.MAX_VALUE)
    private String provider;

    @Column(name = "provideraccountid", nullable = false, length = Integer.MAX_VALUE)
    private String provideraccountid;

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProvideraccountid() {
        return provideraccountid;
    }

    public void setProvideraccountid(String provideraccountid) {
        this.provideraccountid = provideraccountid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AccountId entity = (AccountId) o;
        return Objects.equals(this.provider, entity.provider) &&
                Objects.equals(this.provideraccountid, entity.provideraccountid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(provider, provideraccountid);
    }

}