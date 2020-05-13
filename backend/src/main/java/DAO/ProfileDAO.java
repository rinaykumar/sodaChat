package DAO;

import DTO.UpdateProfileDTO;
import DTO.ProfileListDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProfileDAO {

    private static ProfileDAO instance;

    Gson gson = new GsonBuilder()
            .create();


    // Open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);

    public void ChangeProfile(String username, String userpassword) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
        MongoCollection<Document> itemsCollection = db.getCollection("Profile");

        // Create new DTO and convert to JSON
        UpdateProfileDTO newItemDTO = new UpdateProfileDTO(username, userpassword);
        String itemJSON = gson.toJson(newItemDTO);

        // Create new mongo Document from JSON
        Document newItem = Document.parse(itemJSON);

        // Add Document to Collection
        itemsCollection.insertOne(newItem);
    }

    public void deleteUser(String username, String userpassword) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
        MongoCollection<Document> itemsCollection = db.getCollection("Profile");

        // Create new DTO and convert to JSON
        UpdateProfileDTO newItemDTO = new UpdateProfileDTO(username, userpassword);
        String itemJSON = gson.toJson(newItemDTO);

        // Create new mongo Document from JSON
        Document newItem = Document.parse(itemJSON);

        // Delete Document from Collections
        itemsCollection.findOneAndDelete(newItem);
    }

    public ProfileListDTO getUpdatedProfile() {
        MongoDatabase db = mongoClient.getDatabase("FinalDatabase");
        MongoCollection<Document> itemsCollection = db.getCollection("Profile");
        List<String> items = itemsCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    document.remove("_id");
                    return document.toJson();
                })
                .collect(Collectors.toList());
        return new ProfileListDTO(items);
    }


    public static ProfileDAO getInstance() {
        if(instance == null) {
            instance = new ProfileDAO();
        }
        return instance;
    }
}