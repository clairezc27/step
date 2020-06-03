package com.google.sps.data;

public final class Task {

  private final long id;
  private final String name;
  private final String text;

  public Task(long idInput, String nameInput, String textInput) {
    this.id = idInput;
    this.name = nameInput;
    this.text = textInput;
  }
}