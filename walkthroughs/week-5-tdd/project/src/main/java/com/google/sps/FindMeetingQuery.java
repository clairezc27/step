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

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) {
      return Arrays.asList();
    }

    if (events.isEmpty()) {
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }
    ArrayList<TimeRange> timeList = new ArrayList<>();
    Collection<TimeRange> toReturn = new ArrayList<TimeRange>();
    int start = TimeRange.START_OF_DAY;
    boolean endDay = true;
    int endTime = 0;
    for (Event e : events) {
      int eventStart = e.getWhen().start();
      int eventEnd = eventStart + e.getWhen().duration();
      if (eventStart == start) {
        start = eventStart + e.getWhen().duration(); 
      }

      TimeRange toAdd = TimeRange.fromStartEnd(start, eventStart, false);
      toReturn.add(toAdd);
      start = eventEnd;
      
      if (eventStart + e.getWhen().duration() < TimeRange.END_OF_DAY) {
        endDay = false;
        endTime = eventEnd;
      }
    }

    if (!endDay) {
      toReturn.add(TimeRange.fromStartEnd(endTime, TimeRange.END_OF_DAY, true));
    }

    return toReturn;
  }
}
