"use client";

import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, type View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEvents } from "@/hooks/use-events";
import { CalendarToolbar } from "@/components/calendar/calendar-toolbar";
import { EventModal } from "@/components/calendar/event-modal";
import { CATEGORY_COLORS } from "@/types";
import type { CalendarEvent, EventCategory } from "@/types";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

interface RbcEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: CalendarEvent;
}

export function CalendarView({ initialEvents }: { initialEvents: CalendarEvent[] }) {
  const { events, createEvent, updateEvent, deleteEvent } = useEvents(initialEvents);
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEventDate, setNewEventDate] = useState<string | undefined>(undefined);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || e.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  const rbcEvents: RbcEvent[] = useMemo(
    () =>
      filtered.map((e) => {
        const start = parseISO(e.event_date);
        return { id: e.id, title: e.title, start, end: start, allDay: true, resource: e };
      }),
    [filtered]
  );

  function openCreateModal(slotDate?: Date) {
    setSelectedEvent(null);
    setNewEventDate(slotDate ? format(slotDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"));
    setModalOpen(true);
  }

  function openEditModal(event: CalendarEvent) {
    setSelectedEvent(event);
    setModalOpen(true);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <CalendarToolbar
        date={date}
        onDateChange={setDate}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        onAddEvent={() => openCreateModal(date)}
      />

      {filtered.length === 0 && events.length === 0 ? (
        <EmptyState onAddEvent={() => openCreateModal(date)} />
      ) : (
        <div className="p-4">
          <Calendar
            localizer={localizer}
            events={rbcEvents}
            date={date}
            onNavigate={setDate}
            view={"month" as View}
            onView={() => {}}
            views={["month"]}
            style={{ height: 640 }}
            components={{ toolbar: () => null }}
            selectable
            onSelectSlot={(slot) => openCreateModal(slot.start)}
            onSelectEvent={(e) => openEditModal((e as RbcEvent).resource)}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: CATEGORY_COLORS[(event as RbcEvent).resource.category],
                borderRadius: "6px",
                border: "none",
                fontSize: "12px",
              },
            })}
          />
        </div>
      )}

      <EventModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        event={selectedEvent}
        defaultDate={newEventDate}
        onCreate={createEvent}
        onUpdate={updateEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
}

function EmptyState({ onAddEvent }: { onAddEvent: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <p className="font-display text-lg font-semibold">No events yet</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Analyze a syllabus from your dashboard, or add your first event by hand.
      </p>
      <button onClick={onAddEvent} className="text-sm font-medium text-primary hover:underline">
        Add an event
      </button>
    </div>
  );
}
