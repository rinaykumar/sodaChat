package DAO;

import DTO.AddMessageDTO;
import DTO.MessagesListDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class MessagesDAO {

    private static MessagesDAO instance;

    Gson gson = new GsonBuilder()
            .create();

    private MessagesDAO(){

    }

    // Open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);

    public void addMessage(String text, String user) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
        MongoCollection<Document> MessagesCollection = db.getCollection("Messages");

        // Create new DTO and convert to JSON
        Date date = new Date();
        AddMessageDTO newMessageDTO = new AddMessageDTO(text, user, date);
        String messageJSON = gson.toJson(newMessageDTO);

        // Create new mongo Document from JSON
        Document newMessage = Document.parse(messageJSON);

        // Add Document to Collection
        MessagesCollection.insertOne(newMessage);
    }

    /*
    public void deleteItem(String item, double price) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> MessagesCollection = db.getCollection("Messages");

        // Create new DTO and convert to JSON
        AddItemDTO newItemDTO = new AddItemDTO(item, price);
        String itemJSON = gson.toJson(newItemDTO);

        // Create new mongo Document from JSON
        Document newItem = Document.parse(itemJSON);

        // Delete Document from Collections
        MessagesCollection.findOneAndDelete(newItem);
    }
    */

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