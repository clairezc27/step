package com.google.sps.servlets;


import com.google.sps.data.LoginStatus;
import com.google.gson.Gson;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/login-status")
public class LoginStatusServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");

    UserService userService = UserServiceFactory.getUserService();
    Gson gson = new Gson();
    if (userService.isUserLoggedIn()) {
      response.getWriter().println(gson.toJson(new LoginStatus(true)));
    } else {
      response.getWriter().println(gson.toJson(new LoginStatus(false)));
    }
  }

}
