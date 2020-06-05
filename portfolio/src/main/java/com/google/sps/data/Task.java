package com.google.sps.data;

public final class Task {

  private final long id;
  private final String name;
  private final String text;
  private final long timestamp;

  public Task(long idInput, String nameInput, String textInput, long timestampInput) {
    this.id = idInput;
    this.name = nameInput;
    this.text = textInput;
    this.timestamp = timestampInput;
  }

}