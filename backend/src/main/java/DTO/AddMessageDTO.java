package DTO;

import java.util.Date;

public class AddMessageDTO {
    public final String text;
    public final String user;
    public final Date date;
    // public final int likeCount;

    public AddMessageDTO(String text, String user, Date date) {
        this.text = text;
        this.user = user;
        this.date = date;
        // this.likeCount = likeCount;
    }
}
