import React, { useCallback, useEffect, useRef, useState } from "react";
import { TZDate } from "@toast-ui/calendar";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import Button from "react-bootstrap/Button";

function Schedule() {
  const calendarRef = useRef(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState("");
  const today = new TZDate();
  const initialCalendars = [
    {
      id: "0",
      name: "Public",
      backgroundColor: "#9e5fff",
      borderColor: "#9e5fff",
      dragBackgroundColor: "#9e5fff",
    },
  ];
  const initialEvents = [
    {
      id: "1",
      calendarId: "0",
      title: "TOAST UI Calendar Study",
      category: "time",
      start: today,
      end: addHours(today, 3),
    },
    {
      id: "2",
      calendarId: "0",
      title: "Practice",
      category: "time",
      start: addDate(today, 1),
      end: addDate(today, 1),
      isReadOnly: true,
    },
    {
      id: "3",
      calendarId: "0",
      title: "FE Workshop",
      category: "allday",
      start: subtractDate(today, 2),
      end: subtractDate(today, 1),
      isReadOnly: true,
    },
    {
      id: "4",
      calendarId: "0",
      title: "Report",
      category: "time",
      start: today,
      end: addHours(today, 1),
      isReadOnly: true,
    },
  ];

  const getCalInstance = useCallback(
    () => calendarRef.current?.getInstance?.(),
    []
  );

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText("");
    }

    const rangeStart = calInstance.getDateRangeStart();
    const rangeEnd = calInstance.getDateRangeEnd();

    let year = rangeStart.getFullYear();
    let month = rangeStart.getMonth() + 1;
    let date = rangeStart.getDate();
    let dateRangeText;

    const endMonth = rangeEnd.getMonth() + 1;
    const endDate = rangeEnd.getDate();

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
    console.log("Event Info : ", res.title);
    console.groupEnd();
  };

  const onBeforeDeleteEvent = (res) => {
    console.group("onBeforeDeleteEvent");
    console.log("Event Info : ", res.title);
    console.groupEnd();

    const { id, calendarId } = res;

    getCalInstance().deleteEvent(id, calendarId);
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

  const onClickTimezonesCollapseBtn = (timezoneCollapsed) => {
    console.group("onClickTimezonesCollapseBtn");
    console.log("Is Timezone Collapsed?: ", timezoneCollapsed);
    console.groupEnd();

    const newTheme = {
      "week.daygridLeft.width": "100px",
      "week.timegridLeft.width": "100px",
    };

    getCalInstance().setTheme(newTheme);
  };

  const onBeforeUpdateEvent = (updateData) => {
    console.group("onBeforeUpdateEvent");
    console.log(updateData);
    console.groupEnd();

    const targetEvent = updateData.event;
    const changes = { ...updateData.changes };

    getCalInstance().updateEvent(
      targetEvent.id,
      targetEvent.calendarId,
      changes
    );
  };

  const onBeforeCreateEvent = (eventData) => {
    const event = {
      calendarId: eventData.calendarId || "",
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? "allday" : "time",
      dueDateClass: "",
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate,
    };

    getCalInstance().createEvents([event]);
  };

  return (
    <React.Fragment>
      <h1>Calendar</h1>
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
      <Calendar
        usageStatistics={false}
        height="900px"
        calendars={initialCalendars}
        events={initialEvents}
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
        onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeCreateEvent={onBeforeCreateEvent}
      />
    </React.Fragment>
  );
}
export default Schedule;

function clone(date) {
  return new TZDate(date);
}

function addHours(d, step) {
  const date = clone(d);
  date.setHours(d.getHours() + step);

  return date;
}

function addDate(d, step) {
  const date = clone(d);
  date.setDate(d.getDate() + step);

  return date;
}

function subtractDate(d, steps) {
  const date = clone(d);
  date.setDate(d.getDate() - steps);

  return date;
}
