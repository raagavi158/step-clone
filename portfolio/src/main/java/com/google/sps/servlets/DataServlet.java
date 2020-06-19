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

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
    private List<String> quotes = new ArrayList<>();
    /*@Override
    public void init() {
        quotes = 
        quotes.add("2014 Forest Hill Drive - J.Cole");
        quotes.add("ASTROWORLD - Travis Scott");
        quotes.add("Blonde - Frank Ocean");
        quotes.add("Currents - Tame Impala");
    }*/
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String json = convertToJsonUsingGson();
        response.setContentType("application/json;");
        response.getWriter().println(json);
    }
     @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // If the user sends another POST request after the game is over, then start a new game.

        // Get the input from the form.
        String text = request.getParameter("player-choice");
        String[] words = text.split("\\s*,\\s*");
        for(int i = 0; i < 4; i++) {
            quotes.add(words[i]);
        }
    // Redirect back to the HTML page.
    response.sendRedirect("/music.html");
    }

    private String convertToJsonUsingGson() {
        String json = "[";
        json += "\"" + quotes.get(0) +"\", \"" + quotes.get(1) + "\", \"" + quotes.get(2) + "\", \"" + quotes.get(3) +"\"";
        json += "]";
        System.out.println(json);
        return json;
        
    }
}
