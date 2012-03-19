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
public class Project {

    @NotNull
    @Column(unique = true)
    @Size(min = 3)
    private String name;

    @NotNull
    private int pjyear;

    @NotNull
    @Size(min = 3)
    private String description;
    @PersistenceContext
    transient EntityManager entityManager;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Version
    @Column(name = "version")
    private Integer version;

    public static Project findProject(Long id) {
        if (id == null) return null;
        return entityManager().find(Project.class, id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Project)) return false;

        Project project = (Project) o;

        if (id != null ? !id.equals(project.id) : project.id != null) return false;
        if (!name.equals(project.name)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + (id != null ? id.hashCode() : 0);
        return result;
    }

    public static List<Project> findAllProjects() {
        return entityManager().createQuery("SELECT o FROM Project o", Project.class).getResultList();
    }

    public static long countProjects() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Project o", Long.class).getSingleResult();
    }

    public static List<Project> findProjectEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Project o", Project.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }

    public static final EntityManager entityManager() {
        EntityManager em = new Project().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }

    public String getDescription() {
        return this.description;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getName() {
        return this.name;
    }

    public int getPjyear() {
        return this.pjyear;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPjyear(int pjyear) {
        this.pjyear = pjyear;
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
            Project attached = Project.findProject(this.id);
            this.entityManager.remove(attached);
        }
    }

    @Transactional
    public Project merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Project merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }

    @Transactional
    public void persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }

    @Transactional
    public void clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public Integer getVersion() {
        return this.version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
