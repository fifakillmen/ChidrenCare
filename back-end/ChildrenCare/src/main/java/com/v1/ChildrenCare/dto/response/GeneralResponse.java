package com.v1.ChildrenCare.dto.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class GeneralResponse<T> {
    @JsonProperty("code")
    private final enumResultStatus code;

    @JsonProperty("message")
    private final String message;

    @JsonProperty("data")
    private T data;

    public static <E> GeneralResponse<E> of(E data) {
        return GeneralResponse.<E>builder()
                .code(enumResultStatus.OK)
                .message("SUCCESS")
                .data(data)
                .build();
    }

    public static <E> GeneralResponse<E> of(E data, String message) {
        return GeneralResponse.<E>builder()
                .code(enumResultStatus.OK)
                .message(message)
                .data(data)
                .build();
    }

    public static GeneralResponse<Object> of(Exception ex) {
        return GeneralResponse.builder()
                .code(enumResultStatus.ERROR)
                .message(ex.getMessage())
                .build();
    }

}