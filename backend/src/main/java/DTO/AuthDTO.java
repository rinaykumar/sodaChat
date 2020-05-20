package DTO;

public class AuthDto {
    public final String username;
    public final String password;
    public final int profilePic;

    public AuthDto(String username, String password, int profilePic) {
        this.username = username;
        this.password = password;
        this.profilePic = profilePic;
    }
}
