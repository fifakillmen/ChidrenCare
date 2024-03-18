package com.v1.ChildrenCare.dto.mapper.decorator;

import com.v1.ChildrenCare.dto.mapper.AccountListMapper;
import com.v1.ChildrenCare.dto.mapper.PostListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class AccountListMapperDecorator implements AccountListMapper {
    @Autowired
    @Qualifier("delegate")
    private AccountListMapper accountListMapper;
}
