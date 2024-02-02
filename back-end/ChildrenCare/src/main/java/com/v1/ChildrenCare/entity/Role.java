package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumRole;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "native",strategy = "native")
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private enumRole name;

    public Role() {
    }

    public Role(Long id, enumRole name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public enumRole getName() {
        return name;
    }

    public void setName(enumRole name) {
        this.name = name;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Role{");
        sb.append("id=").append(id);
        sb.append(", name=").append(name);
        sb.append('}');
        return sb.toString();
    }
}
