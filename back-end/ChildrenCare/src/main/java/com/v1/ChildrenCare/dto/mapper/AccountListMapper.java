package com.v1.ChildrenCare.dto.mapper;

import com.v1.ChildrenCare.dto.AccountDto;
import com.v1.ChildrenCare.dto.PostDto;
import com.v1.ChildrenCare.dto.mapper.decorator.AccountListMapperDecorator;
import com.v1.ChildrenCare.dto.mapper.decorator.PostListMapperDecorator;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.Post;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
@DecoratedWith(AccountListMapperDecorator.class)
public interface AccountListMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "password", target = "password")
    @Mapping(source = "accessToken", target = "accessToken")
    @Mapping(source = "accessTokenActive", target = "accessTokenActive")
    @Mapping(source = "role", target = "role")
    @Mapping(source = "isActive", target = "isActive")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "modifiedBy_UserId", target = "modifiedBy_UserId")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    AccountDto AccountToAccountDto(Account account);
}
