package com.google.sps.data;

import java.util.ArrayList;
import java.util.List;

public class Comment {
  private String name;
  private String text;

  public Comment(String n, String t) {
    this.name = n;
    this.text = t;
  }

  public String getName() {
    return this.name;
  }

  public String getText() {
    return this.text;
  }
}