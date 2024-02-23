package com.v1.ChildrenCare.constaint;

import lombok.Data;

@Data
public class Result {
    private String message;
    private String status;
    private Object data;

    public Result(String message, String status, Object data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}