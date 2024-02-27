package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Children;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildInformationRepository extends JpaRepository<Children, Long> {
}
