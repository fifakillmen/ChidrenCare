package com.v1.ChildrenCare.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "classes")
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;
    @Column(unique = true)
    String className;
    @JsonFormat(pattern = "dd/MM/yyyy")
    LocalDate startDate;
    @JsonFormat(pattern = "dd/MM/yyyy")
    LocalDate endDate;
    @Column(length = 2000)
    String description;
    String ageRange;
    @ManyToOne
    @JoinColumn(name = "service_id")
    Service service;
    @OneToOne
    User createdPerson;
    @OneToMany
    @JoinColumn(name = "child_information_id")
    Set<ChildInformation> childInformation;

    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive;
    @org.springframework.data.annotation.CreatedDate
    @Column(updatable = false)
    private LocalDate CreatedDate;
    @ManyToOne
@JoinColumn(name = "created_by", updatable = false)
private User createdBy;

    @OneToMany
    private List<User> ModifiedBy ;
    @org.springframework.data.annotation.LastModifiedDate
    private LocalDate LastModifiedDate;
    //-------------------
    public Classes() {
    }

    public Classes(Long id, String className, LocalDate startDate, LocalDate endDate, String description, String ageRange, Service service, User createdPerson, Set<ChildInformation> childInformation, enumActive isActive, LocalDate createdDate, User createdBy, List<User> modifiedBy, LocalDate lastModifiedDate) {
        this.id = id;
        this.className = className;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.ageRange = ageRange;
        this.service = service;
        this.createdPerson = createdPerson;
        this.childInformation = childInformation;
        this.isActive = isActive;
        CreatedDate = createdDate;
        this.createdBy = createdBy;
        ModifiedBy = modifiedBy;
        LastModifiedDate = lastModifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAgeRange() {
        return ageRange;
    }

    public void setAgeRange(String ageRange) {
        this.ageRange = ageRange;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public User getCreatedPerson() {
        return createdPerson;
    }

    public void setCreatedPerson(User createdPerson) {
        this.createdPerson = createdPerson;
    }

    public Set<ChildInformation> getChildInformation() {
        return childInformation;
    }

    public void setChildInformation(Set<ChildInformation> childInformation) {
        this.childInformation = childInformation;
    }

    public enumActive getIsActive() {
        return isActive;
    }

    public void setIsActive(enumActive isActive) {
        this.isActive = isActive;
    }

    public LocalDate getCreatedDate() {
        return CreatedDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        CreatedDate = createdDate;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public List<User> getModifiedBy() {
        return ModifiedBy;
    }

    public void setModifiedBy(List<User> modifiedBy) {
        ModifiedBy = modifiedBy;
    }

    public LocalDate getLastModifiedDate() {
        return LastModifiedDate;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        LastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Classes{");
        sb.append("id=").append(id);
        sb.append(", className='").append(className).append('\'');
        sb.append(", startDate=").append(startDate);
        sb.append(", endDate=").append(endDate);
        sb.append(", description='").append(description).append('\'');
        sb.append(", ageRange='").append(ageRange).append('\'');
        sb.append(", service=").append(service);
        sb.append(", createdPerson=").append(createdPerson);
        sb.append(", childInformation=").append(childInformation);
        sb.append(", isActive=").append(isActive);
        sb.append(", CreatedDate=").append(CreatedDate);
        sb.append(", createdBy=").append(createdBy);
        sb.append(", ModifiedBy=").append(ModifiedBy);
        sb.append(", LastModifiedDate=").append(LastModifiedDate);
        sb.append('}');
        return sb.toString();
    }
}
