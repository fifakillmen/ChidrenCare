package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Children;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Children, Long> {
    @Query(value = "SELECT * " +
            "FROM childrencare.children c " +
            "WHERE " +
            "((:name IS NULL) OR (LOWER(c.first_name) like CONCAT('%', LOWER(:name), '%')) OR (LOWER(c.last_name) like CONCAT('%', LOWER(:name), '%'))) " +
            "AND (:isActive IS NULL OR :isActive = c.is_active) " +
            "AND (:ageMin IS NULL OR c.age >= :ageMin) " +
            "AND (:ageMax IS NULL OR c.age <= :ageMax) "
            , nativeQuery = true)
    Page<Children> search(String name, String isActive, String ageMin, String ageMax, Pageable pageable);
}
