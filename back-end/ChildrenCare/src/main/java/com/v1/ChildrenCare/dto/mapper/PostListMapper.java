package com.v1.ChildrenCare.dto.mapper;

import com.v1.ChildrenCare.dto.PostDto;
import com.v1.ChildrenCare.dto.mapper.decorator.PostListMapperDecorator;
import com.v1.ChildrenCare.entity.Post;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
@DecoratedWith(PostListMapperDecorator.class)
public interface PostListMapper {
    @Mapping(source = "title", target = "title")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "updatedDate", target = "updatedDate")
    @Mapping(source = "imageLink", target = "imageLink") // Map imageLink to imageFile
    @Mapping(source = "isActive", target = "isActive")
    PostDto postToPostDto(Post post);
}

