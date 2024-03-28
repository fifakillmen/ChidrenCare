package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Category;
import com.v1.ChildrenCare.entity.Post;
import com.v1.ChildrenCare.entity.Service;
import com.v1.ChildrenCare.enumPack.enumActive;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
