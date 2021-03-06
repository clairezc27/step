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

package com.google.sps;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

public final class FindMeetingQuery {
 
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) {
      return Arrays.asList();
    }

    Collection<String> attendeeList = request.getAttendees();
    if (attendeeList.isEmpty() && !request.getOptionalAttendees().isEmpty()) {
      attendeeList = request.getOptionalAttendees();
    }

    ArrayList<Event> cleanedEvents = removeNonrequiredMeeting(events, attendeeList);
    cleanedEvents = removeOverlap(cleanedEvents);

    ArrayList<TimeRange> toReturn = new ArrayList<TimeRange>();
    int start = TimeRange.START_OF_DAY;
    boolean endDay = true;
    int endTime = 0;
    long meetingLen = request.getDuration();

    Iterator<Event> iter = cleanedEvents.iterator();

    if (events.isEmpty() || cleanedEvents.isEmpty()) {
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }

    while (iter.hasNext()) {
      Event e = iter.next();
      
      int eventStart = e.getWhen().start();
      int eventEnd = eventStart + e.getWhen().duration();

      //account for event at beginning of day
      if (eventStart == start) {
        start = eventStart + e.getWhen().duration(); 
      } else {
        if (eventStart - start >= meetingLen) {
          TimeRange toAdd = TimeRange.fromStartEnd(start, eventStart, false);
          toReturn.add(toAdd);
        }
        start = eventEnd;
        
        //check if there's available meeting time after last event
        if (eventStart + e.getWhen().duration() < TimeRange.END_OF_DAY) {
          endDay = false;
          endTime = eventEnd;
        }
      }
    }

    //add meeting after last event
    if (!endDay) {
      toReturn.add(TimeRange.fromStartEnd(endTime, TimeRange.END_OF_DAY, true));
    }


    return checkOptionalAttendee(toReturn, events, request);  
  }

  private boolean isOverlap(Event e1, Event e2) {
    return e1.getWhen().start() + e1.getWhen().duration() > e2.getWhen().start();
  }

  private ArrayList<Event> removeNonrequiredMeeting(Collection<Event> events, Collection<String> attendees) {
    ArrayList<Event> newEventList = new ArrayList<>();
    for (Event e : events) {
      boolean required = false;
      for(String attendee : e.getAttendees()) {
        if (attendees.contains(attendee)) {
          required = true;
        }
      }
      if (required) {
        newEventList.add(e);
      }
    }

    return newEventList;
  }

  private ArrayList<Event> removeOverlap(Collection<Event> events) {
    if (events.isEmpty()) {
      return new ArrayList<>();
    }

    ArrayList<Event> newEventList = new ArrayList<>();
    Iterator<Event> iter = events.iterator();
    Event prev = iter.next();
    boolean isStart = true;
    while (iter.hasNext()) {
      Event e = iter.next();
      if(!isOverlap(prev, e)) {
        if (isStart) {
        newEventList.add(prev);
        }
        newEventList.add(e);
      } else if (isOverlap(prev, e)) {
        int start = prev.getWhen().start();
        int end = Math.max(e.getWhen().start() + e.getWhen().duration(), start + prev.getWhen().duration());
        newEventList.add(new Event("", TimeRange.fromStartDuration(start, end-start), e.getAttendees()));
      }
      isStart = false;
    }

    if (isStart) {
      newEventList.add(prev);
    }

    return newEventList;
  }

  private Collection<TimeRange> checkOptionalAttendee(ArrayList<TimeRange> meetingTimes, Collection<Event> events, MeetingRequest request) {
    Collection<String> optionalAttendees = request.getOptionalAttendees();
    boolean optionalAvailable = true;
    ArrayList<TimeRange> toReturn = new ArrayList<>();
    for (TimeRange time : meetingTimes) {
      for (String attendee : optionalAttendees) {
        for (Event e : events) {
          if (e.getAttendees().contains(attendee) && time.overlaps(e.getWhen())) {
            optionalAvailable = false;
          }
        }
      }
      if (optionalAvailable) {
        toReturn.add(time);
      }
      optionalAvailable = true;
    }

    if (toReturn.isEmpty()) {
      return meetingTimes;
    }
    return toReturn;
  }

}
