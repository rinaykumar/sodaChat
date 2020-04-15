package demo;

import static spark.Spark.*;

public class SparkDemo {
  public static void main(String[] args) {
    port(1235);
    webSocket("/ws", WebSocketHandler.class);
    get("/hello", (req, res) -> "hi");
  }
}
