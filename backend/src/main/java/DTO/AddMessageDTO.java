package DTO;

import java.util.Date;

public class AddMessageDTO {
  public final String text;
  public final String user;
  public final Date date;

  public final int thumbsUp;
  public final String picNum;

  public AddMessageDTO(String text, String user, int thumbsUp, Date date, String picNum) {
    this.text = text;
    this.user = user;
    this.date = date;
    this.thumbsUp = thumbsUp;
    this.picNum = picNum;
  }
}
