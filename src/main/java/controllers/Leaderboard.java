package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("entry/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Leaderboard{
    @GET
    @Path("list")
    public String entryList() {
        System.out.println("Invoked Leaderboard.entryList()");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Leaderboard ORDER BY entryID");
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {
                JSONObject row = new JSONObject();
                row.put("entryID", results.getInt(1));
                row.put("name", results.getString(2));
                row.put("time", results.getInt(3));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }
    @POST
    @Path("save")
    public String entrySave(@FormDataParam("name") String name, @FormDataParam("time") Integer time) {
        System.out.println("Invoked Leaderboard.entrySave()");
        try {
            PreparedStatement count = Main.db.prepareStatement("SELECT COUNT(*) FROM Leaderboard");
            ResultSet result = count.executeQuery();
            result.next();
            int i=result.getInt(1)+1;
            boolean placeFound = false;
            while (i>0 && !placeFound){
                i--;
                PreparedStatement identify = Main.db.prepareStatement("SELECT (time) FROM Leaderboard WHERE entryID = i");
                if ((identify.executeQuery()).getInt(1) > time) {
                    PreparedStatement shift = Main.db.prepareStatement("UPDATE Leaderboard SET entryID = ? WHERE entryID = i");
                    shift.setInt(1, (i + 1));
                    shift.execute();
                }else{
                    placeFound = true;
                }
            }
            PreparedStatement insert = Main.db.prepareStatement("INSERT INTO Leaderboard VALUES (?,?,?)");
            insert.setInt(1, i);
            insert.setString(2, name);
            insert.setInt(3, time);
            insert.execute();
            return "{\"OK\": \"Added entry.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to create new item, please see server console for more info.\"}";
        }
    }
}
