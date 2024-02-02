package com.v1.ChildrenCare.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class ServiceBookingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    User customer;

    @ManyToOne
    @JoinColumn(name = "service_id_id")
    Service serviceId;

    @ManyToOne
    @JoinColumn(name = "child_id_id")
    ChildInformation childID;

    @ManyToOne
    @JoinColumn(name = "mod_id")
    User mod;

    String status = PENDING;

    LocalDate createDate;

    public static final String PENDING = "Pending";
    public static final String APPROVED = "Approved";
    public static final String DENIED = "Denied";

    public ServiceBookingList() {
    }

    public ServiceBookingList(Long id, User customer, Service serviceId, ChildInformation childID, User mod, String status, LocalDate createDate) {
        this.id = id;
        this.customer = customer;
        this.serviceId = serviceId;
        this.childID = childID;
        this.mod = mod;
        this.status = status;
        this.createDate = createDate;
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

    public ChildInformation getChildID() {
        return childID;
    }

    public void setChildID(ChildInformation childID) {
        this.childID = childID;
    }

    public User getMod() {
        return mod;
    }

    public void setMod(User mod) {
        this.mod = mod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("ServiceBookingList{");
        sb.append("id=").append(id);
        sb.append(", customer=").append(customer);
        sb.append(", serviceId=").append(serviceId);
        sb.append(", childID=").append(childID);
        sb.append(", mod=").append(mod);
        sb.append(", status='").append(status).append('\'');
        sb.append(", createDate=").append(createDate);
        sb.append('}');
        return sb.toString();
    }
}
