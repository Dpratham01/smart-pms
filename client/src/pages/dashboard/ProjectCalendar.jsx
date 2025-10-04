import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { fetchEventsApi } from "../../api/userApi";

export default function ProjectCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => setEvents(await fetchEventsApi());
    loadEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Project Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map(e => ({ title: e.title, start: e.start, end: e.end }))}
      />
    </div>
  );
}
