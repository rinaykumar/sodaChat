package Server;

import static spark.Spark.*;

public class Server
{
  public static void main(String[] args) {
    port(1235);
    webSocket("/ws", WebSocketHandler.class);
    get("/hello", (req, res) -> "hi");

    post("api/authenticate",(req, res) -> {
      String bodyString = req.body();
      return 0;
    });


  }
}
