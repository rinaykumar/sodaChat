package Server;


import DAO.MessagesDAO;
import DTO.AddMessageDTO;
import DTO.AuthDTO;
import DTO.AuthResponseDTO;
import DTO.MessagesListDTO;
import com.mongodb.BasicDBObject;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.mongodb.client.model.Filters.eq;
import static spark.Spark.*;


public class Server {
  private static List<String> items = new ArrayList<>();

  public static void main(String[] args){
    // Open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);
    // Get ref to database
    MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
    // Get ref to collection
    MongoCollection<Document> messageCollection = db.getCollection("Messages");

    MongoCollection<Document> userCollection = db.getCollection("Users");

    // Check if initial user is in database, if not then add
    List<Document> initialUser1 = userCollection.find(new Document("username", "user"))
      .into(new ArrayList<>());

    if (initialUser1.isEmpty()) {
      Document newUser = new Document()
        .append("username", "user")
        .append ("password", "password")
        .append("profilePic", 1);

          userCollection.insertOne(newUser);
      }

      // Init Gson
    Gson gson = new Gson();

    port(1234);

    // 2 way communication
    webSocket("/ws", WebSocketHandler.class); // open socket and leave it open
    get("/hello", (req, res) -> "hi"); // test

    post("api/authenticate",(req, res) -> {
      String bodyString = req.body();
      AuthDTO authDTO = gson.fromJson(bodyString, AuthDTO.class);

      List<Document> user = userCollection.find(new Document("username", authDTO.username))
        .into(new ArrayList<>());
      if(user.size() != 1) {
        AuthResponseDTO responseDTO = new AuthResponseDTO(false, "User not found");
        return gson.toJson(responseDTO);
      }

      Document userDocument = user.get(0);
      if(!userDocument.getString("password").equals(authDTO.password)) {
        AuthResponseDTO responseDTO = new AuthResponseDTO(false, "Password is incorrect");
        return gson.toJson(responseDTO);
      }
      AuthResponseDTO responseDTO = new AuthResponseDTO(true, null);

      return gson.toJson(responseDTO);
    });

    post("api/register", (req, res) -> {
      String bodyString = req.body();
      AuthDTO authDTO = gson.fromJson(bodyString, AuthDTO.class);

      List<Document> user = userCollection.find(new Document("username", authDTO.username))
        .into(new ArrayList<>());

      if(!user.isEmpty()) {
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(false, "User already exists");
        return gson.toJson(authResponseDTO);
      }

        Random rand = new Random();
        int profilePicNum = rand.nextInt(4);

      Document newUser = new Document()
        .append("username", authDTO.username)
        .append("password", authDTO.password)
        .append("profilePic", profilePicNum);
      userCollection.insertOne(newUser);

      AuthResponseDTO authResponseDTO = new AuthResponseDTO(true, null);
      return gson.toJson(authResponseDTO);
    });

    post("/api/addMessage", (req, res) -> {
      String bodyString = req.body();
      AddMessageDTO messageDTO = gson.fromJson(bodyString,
        AddMessageDTO.class);
      // Add it to the list
      MessagesDAO messagesDAO = MessagesDAO.getInstance();
      messagesDAO.addMessage(messageDTO.text, messageDTO.user, messageDTO.thumbsUp);

      System.out.println(bodyString);
      return "OK";
    });

      post("/api/updateLikes", (req, res) -> {

          String bodyString = req.body();

          AddMessageDTO messageDTO = gson.fromJson(bodyString,
                  AddMessageDTO.class);
          // Add it to the list
          MessagesDAO messagesDAO = MessagesDAO.getInstance();
          messagesDAO.updateLikes(messageDTO.text, messageDTO.thumbsUp);
          System.out.println(bodyString);
          return "OK";
      });

    post("/api/profilePic", (req, res) -> {
      String bodyString = req.body();
      Document userToFind = userCollection.find(eq("username", bodyString)).first();
      assert userToFind != null;
      return userToFind.get("profilePic").toString();
    });


    get("/api/getAllMessages", (req, res) -> {
      MessagesDAO messagesDAO = MessagesDAO.getInstance();
      MessagesListDTO list = messagesDAO.getAllMessages();
      return gson.toJson(list);
    });

      post("/api/changeusername", (req, res) -> {
          //this one is quite strange to me, much to work on
          String bodyString = req.body();
          AuthDTO authDTO = gson.fromJson(bodyString, AuthDTO.class);
          Document found = userCollection.find(new Document("username",authDTO.username)).first();

          System.out.println(bodyString);
          System.out.println(authDTO.username);
          System.out.println(authDTO.password);

          if(found != null) {
              //Document userDocument = user.get(0);
              Bson updatedvalue = new Document("username",authDTO.password);
              Bson updateopt = new Document("$set", updatedvalue);
              userCollection.updateOne(found, updateopt);
          }
          return "username changed";
      });

      post("/api/changepassword", (req, res) -> {
          //this one is quite strange to me, much to work on
          String bodyString = req.body();
          AuthDTO authDTO = gson.fromJson(bodyString, AuthDTO.class);
          Document found = userCollection.find(new Document("username",authDTO.username)).first();

          System.out.println(bodyString);
          System.out.println(authDTO.username);
          System.out.println(authDTO.password);

          if(found != null) {
              //Document userDocument = user.get(0);
              Bson updatedvalue = new Document("password",authDTO.password);
              Bson updateopt = new Document("$set", updatedvalue);
              userCollection.updateOne(found, updateopt);
          }
          return "password changed";
      });

      post("/api/deleteUser", (req, res) -> {
      String bodyString = req.body();
      AuthDTO authDTO = gson.fromJson(bodyString, AuthDTO.class);

      List<Document> user = userCollection.find(new Document("username", authDTO.username))
              .into(new ArrayList<>());
        System.out.println(bodyString);
        System.out.println(authDTO.username);

      if(!user.isEmpty()) {
        BasicDBObject theQuery = new BasicDBObject();
        theQuery.put("username", authDTO.username);
        userCollection.deleteOne(theQuery);
      }
          return "delete complete";
    });
  }
}
