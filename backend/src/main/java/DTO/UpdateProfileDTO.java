package DTO;

public class UpdateProfileDTO {
    public final String NewUsername;
    public final String NewUserpassword;

    public UpdateProfileDTO(String newUsername, String newUserpassword) {
        this.NewUsername = newUsername;
        this.NewUserpassword = newUserpassword;
    }
    
}
