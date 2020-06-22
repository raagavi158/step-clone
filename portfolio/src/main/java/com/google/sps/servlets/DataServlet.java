// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
    private List<String> quotes = new ArrayList<>();
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query("User").addSort("Comments", SortDirection.DESCENDING);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        String albumNames = "";
        for (Entity entity : results.asIterable()) {
            albumNames = (String) entity.getProperty("Comments");
        }
        response.setContentType("application/json;");
        response.getWriter().println(albumNames);
    }
     @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // If the user sends another POST request after the game is over, then start a new game.

        // Get the input from the form.
        String text = request.getParameter("player-choice");
        String[] words = text.split("\\s*,\\s*");
        for(int i = 0; i < words.length; i++) {
            quotes.add(words[i]);
        }
    Entity taskEntity = new Entity("User");
    taskEntity.setProperty("Comments", convertToJsonUsingGson());
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(taskEntity);
    // Redirect back to the HTML page.
    response.sendRedirect("/music.html");
    }

    private String convertToJsonUsingGson() {
        String json = "[";
        int i;
        for( i = 0;  i < quotes.size()-1; i++) {
            json += "\"" + quotes.get(i) +"\",";
        }
        json += "\"" + quotes.get(i) +"\"";
        json += "]";
        System.out.println(json);
        return json;
        
    }
}
