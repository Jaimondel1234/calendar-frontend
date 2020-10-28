import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages";
import { CalendarEvent } from "./CalendarEvent";
import { CalendaModal } from "./CalendaModal";

import "moment/locale/es";
import { uiOpenModal } from "../../actions/ui";
import {
  eventSetActive,
  eventClearActiveEvent,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { useEffect } from "react";

moment.locale("es");

const localizer = momentLocalizer(moment);
// const events = [
//   {
//     title: "Cumpleaños del jefe",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     notes: "comprar el pastel",
//     user: {
//       id: "123",
//       name: "Fernando",
//     },
//   },
// ];

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectedEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectedEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendaModal />
    </div>
  );
};
