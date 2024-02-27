package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class ServiceBookingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @ManyToOne
    @JoinColumn(name = "service_id_id")
    private Service serviceId;

    @ManyToOne
    @JoinColumn(name = "child_id_id")
    private Children childID;

    @ManyToOne
    @JoinColumn(name = "mod_id")
    private User mod;
    @Enumerated(EnumType.STRING)
    private enumStatus status;




    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive;
    @org.springframework.data.annotation.CreatedDate
    @Column(updatable = false)
    private LocalDate CreatedDate;

    @ManyToOne
@JoinColumn(name = "created_by", updatable = false)
private User createdBy;

    private Long ModifiedBy_UserId ;
    @org.springframework.data.annotation.LastModifiedDate
    private LocalDate LastModifiedDate;
    //-------------------

    public ServiceBookingList() {
    }

    public ServiceBookingList(Long id, User customer, Service serviceId, Children childID, User mod, enumStatus status, enumActive isActive, LocalDate createdDate, User createdBy, Long modifiedBy_UserId, LocalDate lastModifiedDate) {
        this.id = id;
        this.customer = customer;
        this.serviceId = serviceId;
        this.childID = childID;
        this.mod = mod;
        this.status = status;
        this.isActive = isActive;
        CreatedDate = createdDate;
        this.createdBy = createdBy;
        ModifiedBy_UserId = modifiedBy_UserId;
        LastModifiedDate = lastModifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Service getServiceId() {
        return serviceId;
    }

    public void setServiceId(Service serviceId) {
        this.serviceId = serviceId;
    }

    public Children getChildID() {
        return childID;
    }

    public void setChildID(Children childID) {
        this.childID = childID;
    }

    public User getMod() {
        return mod;
    }

    public void setMod(User mod) {
        this.mod = mod;
    }

    public enumStatus getStatus() {
        return status;
    }

    public void setStatus(enumStatus status) {
        this.status = status;
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

    public Long getModifiedBy_UserId() {
        return ModifiedBy_UserId;
    }

    public void setModifiedBy_UserId(Long modifiedBy_UserId) {
        ModifiedBy_UserId = modifiedBy_UserId;
    }

    public LocalDate getLastModifiedDate() {
        return LastModifiedDate;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        LastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        return "ServiceBookingList{" +
                "id=" + id +
                ", customer=" + customer +
                ", serviceId=" + serviceId +
                ", childID=" + childID +
                ", mod=" + mod +
                ", status=" + status +
                ", isActive=" + isActive +
                ", CreatedDate=" + CreatedDate +
                ", createdBy=" + createdBy +
                ", ModifiedBy_UserId=" + ModifiedBy_UserId +
                ", LastModifiedDate=" + LastModifiedDate +
                '}';
    }
}
