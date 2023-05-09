// components/Calendar.tsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Link from 'next/link';
import Footer from '@/components/Footer';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Define the CalendarEvent interface
interface CalendarEvent {
  title: string;
  description: string;
  date: Date;
  location: string;
  start: Date;
  end: Date;
  link: string;
}

const MyCalendar: React.FC = () => {
  const events: CalendarEvent[] = [
    {
      title: 'Sample Event',
      description: 'This is a sample event description.',
      date: new Date(),
      location: 'San Francisco',
      start: new Date(),
      end: new Date(),
      link: 'https://example.com/sample-event',
    },
    // More events...
  ];

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleEventClick = (eventInfo: CalendarEvent) => {
    setSelectedEvent(eventInfo);
  };

  const EventModal: React.FC = () => {
    if (!selectedEvent) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg text-black">
          <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
          <p>Description: {selectedEvent.description}</p>
          <p>Location: {selectedEvent.location}</p>
          <p>Start: {selectedEvent.start.toString()}</p>
          <p>End: {selectedEvent.end.toString()}</p>
          <p>
            Link:{' '}
            <Link href={selectedEvent.link} className="text-violet-500 hover:text-violet-400">
              {selectedEvent.link}
            </Link>
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setSelectedEvent(null)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-layout min-h-screen">
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventClick}
        />
        <EventModal />
      </div>
    </div>
  );
};


export default MyCalendar;
