package com.v1.ChildrenCare.dto.mapper.decorator;

import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.dto.mapper.UserListMapper;
import com.v1.ChildrenCare.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class UserListMapperDecorator implements UserListMapper {
    @Autowired
    @Qualifier("delegate")
    private UserListMapper userListMapper;

}
