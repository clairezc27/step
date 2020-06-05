
package com.google.sps.servlets;

import com.google.sps.data.Task;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/new-comment")
public class NewCommentServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    Date day = new Date();
    String name = request.getParameter("name");
    String comment = request.getParameter("comment");

    Entity taskEntity = new Entity("Task");
    taskEntity.setProperty("name", name);
    taskEntity.setProperty("text", comment);
    taskEntity.setProperty("timestamp", System.currentTimeMillis());
    taskEntity.setProperty("date", day);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(taskEntity);

    response.sendRedirect("/comments.html");
  }

}
