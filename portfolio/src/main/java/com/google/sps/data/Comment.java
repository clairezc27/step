package com.google.sps.data;

public class Comment {
  private String name;
  private String text;

  public Comment(String requestName, String requestText) {
    this.name = requestName;
    this.text = requestText;
  }

  public String getName() {
    return this.name;
  }

  public String getText() {
    return this.text;
  }
}