"use client";

import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogCloseButton } from "@/components/ui/dialog";
import { EventForm } from "@/components/calendar/event-form";
import type { CalendarEvent } from "@/types";
import type { EventFormInput } from "@/schemas";

interface EventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
  defaultDate?: string;
  onCreate: (input: EventFormInput) => Promise<unknown>;
  onUpdate: (id: string, input: EventFormInput) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
}

export function EventModal({ open, onOpenChange, event, defaultDate, onCreate, onUpdate, onDelete }: EventModalProps) {
  const isEditing = !!event;

  async function handleSubmit(data: EventFormInput) {
    try {
      if (isEditing && event) {
        await onUpdate(event.id, data);
        toast.success("Event updated");
      } else {
        await onCreate(data);
        toast.success("Event created");
      }
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  async function handleDelete() {
    if (!event) return;
    if (!window.confirm(`Delete "${event.title}"? This can't be undone.`)) return;
    try {
      await onDelete(event.id);
      toast.success("Event deleted");
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete event");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit event" : "New event"}</DialogTitle>
          <DialogCloseButton onClose={() => onOpenChange(false)} />
        </DialogHeader>
        <EventForm
          key={event?.id ?? "new"}
          defaultValues={
            event
              ? {
                  title: event.title,
                  description: event.description ?? "",
                  category: event.category,
                  event_date: event.event_date,
                }
              : { event_date: defaultDate }
          }
          submitLabel={isEditing ? "Save changes" : "Create event"}
          onSubmit={handleSubmit}
          onDelete={isEditing ? handleDelete : undefined}
        />
      </DialogContent>
    </Dialog>
  );
}
