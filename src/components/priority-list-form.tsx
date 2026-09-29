import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEventTitle, getPriorityListEvents } from "@/data/events";
import { toast } from "sonner";

const priorityListEvents = getPriorityListEvents();

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

interface PriorityListFormProps {
  defaultEventSlug?: string;
}

export function PriorityListForm({ defaultEventSlug }: PriorityListFormProps) {
  const initialEventSlug =
    defaultEventSlug && priorityListEvents.some((event) => event.slug === defaultEventSlug)
      ? defaultEventSlug
      : (priorityListEvents[0]?.slug ?? "");

  const [form, setForm] = useState({
    eventSlug: initialEventSlug,
    fullName: "",
    email: "",
    mobile: "",
    stayInformed: false,
  });

  const resetForm = () => {
    setForm({
      eventSlug: initialEventSlug,
      fullName: "",
      email: "",
      mobile: "",
      stayInformed: false,
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.eventSlug || !form.fullName || !form.email || !form.mobile) return;

    const selectedEvent = priorityListEvents.find((event) => event.slug === form.eventSlug);
    const eventLabel = selectedEvent ? getEventTitle(selectedEvent) : "the selected event";

    toast.success(`Thank you for joining the priority list for ${eventLabel}. We'll be in touch soon.`);
    resetForm();
  };

  return (
    <div className="rounded-2xl bg-card p-8 text-foreground shadow-xl md:p-10">
      <h2 className="text-2xl font-bold text-primary">Register Interest</h2>

      <form onSubmit={submit} className="mt-6 space-y-5">
        <p className="text-sm text-muted-foreground">
          Required fields are marked with an asterisk.
        </p>

        <div className="space-y-2">
          <Label htmlFor="priority-event" className="text-foreground">
            Event of Interest
            <RequiredMark />
          </Label>
          <Select
            value={form.eventSlug}
            onValueChange={(value) => setForm({ ...form, eventSlug: value })}
            required
          >
            <SelectTrigger id="priority-event" aria-required="true">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {priorityListEvents.map((event) => (
                <SelectItem key={event.slug} value={event.slug}>
                  {getEventTitle(event)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority-full-name" className="text-foreground">
            Full Name
            <RequiredMark />
          </Label>
          <Input
            id="priority-full-name"
            required
            autoComplete="name"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority-email" className="text-foreground">
            Email Address
            <RequiredMark />
          </Label>
          <Input
            id="priority-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority-mobile" className="text-foreground">
            Mobile Number
            <RequiredMark />
          </Label>
          <Input
            id="priority-mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Enter your mobile number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <Checkbox
            id="priority-stay-informed"
            checked={form.stayInformed}
            onCheckedChange={(checked) =>
              setForm({ ...form, stayInformed: checked === true })
            }
          />
          <Label
            htmlFor="priority-stay-informed"
            className="cursor-pointer text-sm font-normal leading-relaxed text-muted-foreground"
          >
            I am interested in staying informed through the IMPMS newsletter, event updates,
            and related emails.
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gold py-6 text-base text-gold-foreground hover:bg-gold/90"
        >
          Join the Priority List
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          IMPMS will use this information only for event updates and related communications.
        </p>
      </form>
    </div>
  );
}
