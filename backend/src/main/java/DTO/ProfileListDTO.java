package DTO;

import java.util.List;

public class ProfileListDTO {
    public final List<String> ProfileItems;

    public ProfileListDTO(List<String> profileItems){
        this.ProfileItems = profileItems;
    }
}
