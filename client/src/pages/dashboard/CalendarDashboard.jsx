import FullCalendar from "@fullCalendar/react";
import dayGridPlugin from "@fullCalendar/daygrid";
import interactionPlugin from "@fullCalendar/interaction";

export default function CalendarDashboard({ events }) {
  const handleDateClick = (info) => {
    alert(`Clicked on: ${info.dateStr}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
}
