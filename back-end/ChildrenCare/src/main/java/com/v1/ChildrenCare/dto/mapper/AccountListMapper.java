package com.v1.ChildrenCare.dto.mapper;

import com.v1.ChildrenCare.dto.AccountDto;
import com.v1.ChildrenCare.dto.mapper.decorator.AccountListMapperDecorator;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.enumPack.enumRole;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
@DecoratedWith(AccountListMapperDecorator.class)
public interface AccountListMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "password", target = "password")
    @Mapping(source = "accessToken", target = "accessToken")
    @Mapping(source = "accessTokenActive", target = "accessTokenActive")
    @Mapping(source = "isActive", target = "isActive")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "modifiedBy_UserId", target = "modifiedBy_UserId")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    @Mapping(source = "role", target = "role", qualifiedByName = "mapAccountRolesToStrings")
    AccountDto AccountToAccountDto(Account account);

    @Named("mapAccountRolesToStrings")
    default List<String> mapAccountRolesToStrings(List<Role> roles) {
        return roles.stream()
                .map(Role::getStringName)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
    }
}
