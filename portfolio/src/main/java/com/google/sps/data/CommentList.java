package com.google.sps.data;

import java.util.ArrayList;
import java.util.List;

public class CommentList {

  private final List<String> comments = new ArrayList<>();

  public void add(String toAdd) {
    comments.add(toAdd);
  }

  public List<String> getComments() {
    return this.comments;
  }
}