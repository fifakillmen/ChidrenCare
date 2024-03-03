package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Blog;
import com.v1.ChildrenCare.entity.Service;
import com.v1.ChildrenCare.enumPack.enumActive;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    @Query("SELECT s FROM Service s WHERE s.serviceTitle LIKE %:search% OR s.serviceDetail LIKE %:search% AND (s.category.id = :categoryId OR :categoryId IS NULL) AND (s.isActive = :isActive OR :isActive IS NULL)")
    Page<Service> findAllService(Pageable pageable, @Param("search") String search, @Param("categoryId") Long categoryId, @Param("isActive") enumActive isActive);

    @Query("SELECT s FROM Service s WHERE s.serviceTitle LIKE %:search% OR s.serviceDetail LIKE %:search% AND (s.category.id = :categoryId OR :categoryId IS NULL) ")
    Page<Service> findAllService(Pageable pageable, @Param("search") String search, @Param("categoryId") Long categoryId);

}
