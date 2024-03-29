package com.v1.ChildrenCare.dto.mapper;

import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.dto.mapper.decorator.UserListMapperDecorator;
import com.v1.ChildrenCare.entity.User;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
@DecoratedWith(UserListMapperDecorator.class)
public interface UserListMapper {
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "dob", target = "dob")
    @Mapping(source = "phone", target = "phone")
    @Mapping(source = "address", target = "address")
    @Mapping(source = "avartaLink", target = "avartaLink")
    @Mapping(source = "avatarFileName", target = "avatarFileName")
    @Mapping(source = "gender", target = "gender")
    UserDto UserToUserDto(User user);



}
