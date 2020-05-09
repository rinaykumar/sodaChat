package Server;

import DTO.AuthDto;
import DTO.AuthResponseDto;
import com.google.gson.Gson;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

import static spark.Spark.*;

public class Server
{
  public static void main(String[] args) {

    MongoClient mongoClient = new MongoClient("localhost", 27017);
    MongoDatabase db = mongoClient.getDatabase("MyDatabase");
    MongoCollection<Document> userCollection = db.getCollection("Users");


    Gson gson = new Gson();

    port(1235);
    webSocket("/ws", WebSocketHandler.class);
    get("/hello", (req, res) -> "hi");


    post("api/authenticate",(req, res) -> {
      String bodyString = req.body();
      AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);

      List<Document> user = userCollection.find(new Document("username", authDto.username))
              .into(new ArrayList<>());
      if(user.size() != 1) {
          AuthResponseDto responseDto = new AuthResponseDto(false, "User not found");
          return gson.toJson(responseDto);
      }

      Document userDocument = user.get(0);
      if(!userDocument.getString("password").equals(authDto.password)) {
          AuthResponseDto responseDto = new AuthResponseDto(false, "Password is incorrect");
          return gson.toJson(responseDto);
      }

      AuthResponseDto responseDto = new AuthResponseDto(true, null);
      return gson.toJson(responseDto);

    });

    post("api/register", (req, res) -> {
      String bodyString = req.body();
      AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);

      List<Document> user = userCollection.find(new Document("username", authDto.username))
              .into(new ArrayList<>());

      if(!user.isEmpty()) {
        AuthResponseDto authResponseDto = new AuthResponseDto(false, "User already exists");
        return gson.toJson(authResponseDto);
      }

      Document newUser = new Document()
              .append("username", authDto.username)
              .append("password", authDto.password);
      userCollection.insertOne(newUser);
      AuthResponseDto authResponseDto = new AuthResponseDto(true, null);

      return gson.toJson(authResponseDto);
    });


  }
}
