package com.google.sps.data;
import java.util.Date;

public final class Task {

  private final long id;
  private final String name;
  private final String text;
  private final long timestamp;
  private final Date date;

  public Task(long idInput, String nameInput, String textInput, long timestampInput, Date dayInput) {
    this.id = idInput;
    this.name = nameInput;
    this.text = textInput;
    this.timestamp = timestampInput;
    this.date = dayInput;
  }

}