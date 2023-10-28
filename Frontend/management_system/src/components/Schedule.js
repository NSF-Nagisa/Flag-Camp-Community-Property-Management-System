import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const ScheduleEvents = [
  {
    id: "1",
    user: "2",
    attendees: ["Henry"],
    title: "Community Yard Sale",
    category: "time",
    start: "2023-10-30T03:00:00+09:00",
    end: "2023-10-30T05:00:00+09:00",
  },
  {
    id: "2",
    user: "2",
    attendees: ["Henry"],
    title: "Monthly Maintenance Meeting",
    category: "time",
    start: "2023-10-30T23:00:00+09:00",
    end: "2023-10-31T01:00:00+09:00",
  },
  {
    id: "3",
    user: "1",
    attendees: ["Rubby"],
    title: "New Family Move in",
    category: "time",
    start: "2023-10-31T02:00:00+09:00",
    end: "2023-10-31T07:00:00+09:00",
  },
  {
    id: "4",
    user: "3",
    attendees: ["Taylor"],
    title: "Family Movie Night",
    category: "time",
    start: "2023-10-31T08:00:00+09:00",
    end: "2023-10-31T10:30:00+09:00",
  },
];
function Schedule({ user }) {
  const calendarRef = useRef(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState("");
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

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


  const onBeforeDeleteEvent = (res) => {

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


  const onBeforeUpdateEvent = (updateData) => {
    const targetEvent = updateData.event;
    const changes = { ...updateData.changes };
    const eventToUpdate = ScheduleEvents.find(
      (event) => event.id === targetEvent.id
    );
    Object.keys(changes).map((k) => {
      eventToUpdate[k] = changes[k];
    });
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
    getCalInstance().createEvents([event]);
    event.user = user.id;
    ScheduleEvents.push(event);
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center mt-1 mb-1">
        <div className="col-2 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-dark move-today"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-outline-dark move-day"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            PREV
          </button>
          <button
            type="button"
            className="btn btn-outline-dark move-day"
            data-action="move-next"
            onClick={onClickNavi}
          >
            NEXT
          </button>
        </div>
        <p className="col-2 h5 mt-2">{selectedDateRangeText}</p>
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
          onBeforeDeleteEvent={onBeforeDeleteEvent}
          onBeforeUpdateEvent={onBeforeUpdateEvent}
          onBeforeCreateEvent={onBeforeCreateEvent}
        />
      )}
    </React.Fragment>
  );
}
export default Schedule;
