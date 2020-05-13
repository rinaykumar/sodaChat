package DTO;

public class AuthDto
{
    public final String username;
    public final String password;

    public AuthDto(String username, String password)
    {
        this.username = username;
        this.password = password;
    }
}