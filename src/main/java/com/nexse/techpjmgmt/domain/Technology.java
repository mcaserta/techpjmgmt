package com.nexse.techpjmgmt.domain;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Configurable
public class Technology {

    @NotNull
    @Column(unique = true)
    @Size(min = 3)
    private String name;
    @PersistenceContext
    transient EntityManager entityManager;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Version
    @Column(name = "version")
    private Integer version;

    public static List<Technology> findTechnologyEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Technology o", Technology.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }

    public static Technology findTechnology(Long id) {
        if (id == null) return null;
        return entityManager().find(Technology.class, id);
    }

    public static final EntityManager entityManager() {
        EntityManager em = new Technology().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }

    public static long countTechnologys() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Technology o", Long.class).getSingleResult();
    }

    public static List<Technology> findAllTechnologys() {
        return entityManager().createQuery("SELECT o FROM Technology o", Technology.class).getResultList();
    }

    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Transactional
    public void flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }

    @Transactional
    public void remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            Technology attached = Technology.findTechnology(this.id);
            this.entityManager.remove(attached);
        }
    }

    @Transactional
    public void persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }

    @Transactional
    public Technology merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Technology merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }

    @Transactional
    public void clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getVersion() {
        return this.version;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
