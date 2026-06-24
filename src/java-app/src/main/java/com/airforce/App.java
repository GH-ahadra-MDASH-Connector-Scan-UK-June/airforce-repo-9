package com.airforce;

import java.io.*;
import java.sql.*;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.servlet.http.*;

public class App extends HttpServlet {
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        
        // SQL Injection
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/db");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE name = '" + username + "'");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        // SSRF vulnerability
        String url = request.getParameter("url");
        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        
        // Deserialization vulnerability
        ObjectInputStream ois = new ObjectInputStream(request.getInputStream());
        Object obj = ois.readObject();
        
        response.getWriter().println("Hello, " + username);
    }
    
    public static void main(String[] args) {
        System.out.println("Airforce Java Application");
    }
}
