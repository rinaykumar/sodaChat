package DTO;

public class AuthDTO {
    public final String username;
    public final String password;
    public final int profilePic;

    public AuthDTO(String username, String password, int profilePic) {
        this.username = username;
        this.password = password;
        this.profilePic = profilePic;
    }
}
