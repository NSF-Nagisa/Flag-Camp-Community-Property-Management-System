import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Button from "react-bootstrap/Button";
import { ScheduleEvents } from "../constants/ScheduleEvents";

function Schedule({ user }) {
  const calendarRef = useRef(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState("");
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  console.log(user);

  useEffect(() => {
    if (isLoggedIn) {
      ScheduleEvents.map((item) => {
        const event = getCalInstance().getEvent(item.id, "");
        const changes = { isReadOnly: user.id != item.user };
        onBeforeUpdateEvent({ changes, event });
      });
    }
  }, [isLoggedIn]);

  const getCalInstance = useCallback(
    () => calendarRef.current?.getInstance?.(),
    []
  );

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText("");
    }

    const rangeStart = calInstance?.getDateRangeStart();
    const rangeEnd = calInstance?.getDateRangeEnd();

    let year = rangeStart?.getFullYear();
    let month = rangeStart?.getMonth() + 1;
    let date = rangeStart?.getDate();
    let dateRangeText;

    const endMonth = rangeEnd?.getMonth() + 1;
    const endDate = rangeEnd?.getDate();

    const start = `${year}-${month < 10 ? "0" : ""}${month}-${
      date < 10 ? "0" : ""
    }${date}`;
    const end = `${year}-${endMonth < 10 ? "0" : ""}${endMonth}-${
      endDate < 10 ? "0" : ""
    }${endDate}`;
    dateRangeText = `${start} ~ ${end}`;
    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);

  useEffect(() => {
    updateRenderRangeText();
  }, [updateRenderRangeText]);

  const onAfterRenderEvent = (res) => {
    console.group("onAfterRenderEvent");
    console.log("Event Info : ", res.title, res.user);
    console.groupEnd();
  };

  const onBeforeDeleteEvent = (res) => {
    console.group("onBeforeDeleteEvent");
    console.log("Event Info : ", res.title);
    console.groupEnd();

    const { id, calendarId } = res;
    const indexToDelete = ScheduleEvents.findIndex((event) => event.id === id);
    if (indexToDelete !== -1) {
      ScheduleEvents.splice(indexToDelete, 1);
      console.log(ScheduleEvents);
      getCalInstance().deleteEvent(id, calendarId);
    } else {
      console.log("Event with ID not found.");
    }
  };

  const onClickDayName = (res) => {
    console.group("onClickDayName");
    console.log("Date : ", res.date);
    console.groupEnd();
  };

  const onClickNavi = (ev) => {
    if (ev.target.tagName === "BUTTON") {
      const button = ev.target;
      const actionName = (
        button.getAttribute("data-action") ?? "month"
      ).replace("move-", "");
      getCalInstance()[actionName]();
      updateRenderRangeText();
    }
  };

  const onClickEvent = (res) => {
    console.group("onClickEvent");
    console.log("MouseEvent : ", res.nativeEvent);
    console.log("Event Info : ", res.event);
    console.groupEnd();
  };

  const onBeforeUpdateEvent = (updateData) => {
    console.group("onBeforeUpdateEvent");
    console.log(updateData);
    console.groupEnd();

    const targetEvent = updateData.event;
    const changes = { ...updateData.changes };
    const eventToUpdate = ScheduleEvents.find(
      (event) => event.id === targetEvent.id
    );
    Object.keys(changes).map((k) => {
      eventToUpdate[k] = changes[k];
    });
    console.log(Object.keys(changes));
    getCalInstance().updateEvent(
      targetEvent.id,
      targetEvent.calendarId,
      changes
    );
  };

  const onBeforeCreateEvent = (eventData) => {
    const event = {
      calendarId: "",
      id: String(Math.random()),
      attendees: [user.name],
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? "allday" : "time",
      dueDateClass: "",
      location: eventData.location,
      state: eventData.state,
    };
    console.log(user);
    getCalInstance().createEvents([event]);
    event.user = user.id;
    ScheduleEvents.push(event);
    console.log(ScheduleEvents);
  };

  return (
    <React.Fragment>
      <div>
        <span>
          <Button
            type="button"
            className="btn btn-default btn-sm move-today"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </Button>
          <Button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            Prev
          </Button>
          <Button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-next"
            onClick={onClickNavi}
          >
            Next
          </Button>
        </span>
        <span className="render-range">{selectedDateRangeText}</span>
      </div>
      {isLoggedIn && (
        <Calendar
          usageStatistics={false}
          height="900px"
          calendars={[]}
          events={ScheduleEvents}
          template={{
            allday(event) {
              return `[All day] ${event.title}`;
            },
          }}
          timezone={{
            zones: [],
          }}
          useDetailPopup={true}
          useFormPopup={true}
          view="week"
          week={{
            timezonesCollapsed: false,
            eventView: true,
            taskView: false,
          }}
          ref={calendarRef}
          onAfterRenderEvent={onAfterRenderEvent}
          onBeforeDeleteEvent={onBeforeDeleteEvent}
          onClickDayname={onClickDayName}
          onClickEvent={onClickEvent}
          onBeforeUpdateEvent={onBeforeUpdateEvent}
          onBeforeCreateEvent={onBeforeCreateEvent}
        />
      )}
    </React.Fragment>
  );
}
export default Schedule;
