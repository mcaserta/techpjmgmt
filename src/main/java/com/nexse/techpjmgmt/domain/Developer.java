package com.nexse.techpjmgmt.domain;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configurable
@Entity
public class Developer {

    @NotNull
    @Size(min = 3)
    private String name;

    @NotNull
    @Size(min = 3)
    private String surname;

    @Size(min = 3)
    private String email;

    @ManyToMany(cascade = {CascadeType.PERSIST} , fetch = FetchType.EAGER)
    private Set<Project> projects = new HashSet<Project>();
    @Version
    @Column(name = "version")
    private Integer version;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @PersistenceContext
    transient EntityManager entityManager;

    public static final EntityManager entityManager() {
        EntityManager em = new Developer().entityManager;
        if (em == null)
            throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }

    public static long countDevelopers() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Developer o", Long.class).getSingleResult();
    }

    public static List<Developer> findDeveloperEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Developer o", Developer.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }

    public static Developer findDeveloper(Long id) {
        if (id == null) return null;
        return entityManager().find(Developer.class, id);
    }

    public static List<Developer> findAllDevelopers() {
        return entityManager().createQuery("SELECT o FROM Developer o", Developer.class).getResultList();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Long getId() {
        return this.id;
    }

    public Integer getVersion() {
        return this.version;
    }

    @Transactional
    public void persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
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
            Developer attached = Developer.findDeveloper(this.id);
            this.entityManager.remove(attached);
        }
    }

    @Transactional
    public Developer merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Developer merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }

    @Transactional
    public void clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }

    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    public String getSurname() {
        return this.surname;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public String getName() {
        return this.name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Developer)) return false;

        Developer developer = (Developer) o;

        if (id != null ? !id.equals(developer.id) : developer.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
