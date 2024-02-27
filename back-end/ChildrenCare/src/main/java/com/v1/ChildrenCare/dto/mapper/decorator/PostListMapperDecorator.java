package com.v1.ChildrenCare.dto.mapper.decorator;


import com.v1.ChildrenCare.dto.mapper.PostListMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class PostListMapperDecorator implements PostListMapper {

    @Autowired
    @Qualifier("delegate")
    private PostListMapper postListMapper;
}
