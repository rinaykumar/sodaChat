package DAO;

import DTO.AddMessageDTO;
import DTO.MessagesListDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.mongodb.client.model.Filters.eq;

public class MessagesDAO {

  private static MessagesDAO instance;

  Gson gson = new GsonBuilder()
    .create();

  private MessagesDAO(){

  }

  // Open connection
  MongoClient mongoClient = new MongoClient("localhost", 27017);

  public void addMessage(String text, String user, int thumbsUp) {

    // Connect to mongo
    MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
    MongoCollection<Document> MessagesCollection = db.getCollection("Messages");
    MongoCollection<Document> userCollection = db.getCollection("Users");

    // For setting profile pic
    Document userToFind = userCollection.find(eq("username", user)).first();
    String picNum = userToFind.get("profilePic").toString();

    // Create new DTO and convert to JSON
    Date date = new Date();

    AddMessageDTO newMessageDTO = new AddMessageDTO(text, user, thumbsUp, date, picNum);
    String messageJSON = gson.toJson(newMessageDTO);

    // Create new mongo Document from JSON
    Document newMessage = Document.parse(messageJSON);

    // Add Document to Collection
    MessagesCollection.insertOne(newMessage);
  }

  public void updateLikes(String text, int thumbsUp) {
    // Connect to mongo
    MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
    MongoCollection<Document> MessagesCollection = db.getCollection("Messages");

    // Updating Likes of a message
    Document messageToFind = MessagesCollection.find(eq("text", text)).first();
    int likeNum = (Integer) messageToFind.get("thumbsUp"); //converts object to int

    System.out.println("text issssss: " + messageToFind.get("text"));

    Bson filter = new Document("text", text);
    Bson newVale = new Document("thumbsUp", thumbsUp);
    Bson updateLikes = new Document("$set", newVale);
    MessagesCollection.updateOne(filter, updateLikes);

  }
  public MessagesListDTO getAllMessages() {
    MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
    MongoCollection<Document> messagesCollection = db.getCollection("Messages");
    List<String> messages = messagesCollection.find().into(new ArrayList<>())
      .stream()
      .map(document -> {
        document.remove("_id");
        return document.toJson();
      })
      .collect(Collectors.toList());
    return new MessagesListDTO(messages);
  }

  public static MessagesDAO getInstance() {
    if(instance == null) {
      instance = new MessagesDAO();
    }
    return instance;
  }
}
