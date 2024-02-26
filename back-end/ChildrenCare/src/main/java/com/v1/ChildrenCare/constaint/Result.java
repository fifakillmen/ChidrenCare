package com.v1.ChildrenCare.constaint;

import com.v1.ChildrenCare.enumPack.enumResultStatus;
import lombok.Data;

@Data
public class Result {
    private String message;
    private enumResultStatus status;
    private Object data;

    public Result(String message, enumResultStatus status, Object data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}