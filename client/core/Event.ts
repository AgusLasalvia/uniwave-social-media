export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
  organizerId: string;
  organizer: {
    name: string;
    avatar: string;
    university: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
}

export interface EventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl?: string;
  pickedImage?: string;
}

export interface EventAttendance {
  id: string;
  eventId: string;
  userId: string;
  status: "attending" | "maybe" | "not_attending";
  createdAt: string;
}

export interface EventCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}
