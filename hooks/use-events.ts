"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { CalendarEvent } from "@/types";
import type { EventFormInput } from "@/schemas";

// Fetches the user's events and exposes create/update/delete against /api/events
export function useEvents(initialEvents: CalendarEvent[] = []) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [loading, setLoading] = useState(initialEvents.length === 0);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setEvents(json.events as CalendarEvent[]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialEvents.length === 0) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createEvent(input: EventFormInput) {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error);
    setEvents((prev) => [...prev, json.event as CalendarEvent]);
    return json.event as CalendarEvent;
  }

  async function updateEvent(id: string, input: Partial<EventFormInput>) {
    const res = await fetch(`/api/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error);
    setEvents((prev) => prev.map((e) => (e.id === id ? (json.event as CalendarEvent) : e)));
    return json.event as CalendarEvent;
  }

  async function deleteEvent(id: string) {
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return { events, loading, refresh, createEvent, updateEvent, deleteEvent, setEvents };
}
