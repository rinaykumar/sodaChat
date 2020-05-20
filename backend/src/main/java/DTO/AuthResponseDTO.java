package DTO;

public class AuthResponseDto {
    public final Boolean success;
    public final String error;

    public AuthResponseDto(Boolean success, String error) {
        this.success = success;
        this.error = error;
    }
}
