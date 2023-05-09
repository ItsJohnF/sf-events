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
interface UpdateEventProps {
  updateEvent: (updatedEvent: CalendarEvent) => void;
}

const MyCalendar: React.FC = () => {
  const initialEvents: CalendarEvent[] = [
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

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleEventClick = (eventInfo: CalendarEvent) => {
    setSelectedEvent(eventInfo);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    if (selectedEvent) {
      setEvents((prevEvents) => {
        return prevEvents.map((event) => {
          if (event.title === selectedEvent.title && event.start.getTime() === selectedEvent.start.getTime()) {
            return updatedEvent;
          }
          return event;
        });
      });
    }
  };   

  const EventModal: React.FC<UpdateEventProps> = ({ updateEvent }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState<CalendarEvent | null>(selectedEvent || null);
  
    if (!selectedEvent) return null;
    
    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      if (editedEvent) {
        // Handle the changes and update the event data
        updateEvent(editedEvent);
    
        // Update the selectedEvent state to reflect the changes in the modal
        setSelectedEvent(editedEvent);
      }
    
      // Toggle edit mode off after saving the changes
      setIsEditing(false);
    };
  
    const getAdjustedDate = (date: Date) => {
      const localDate = new Date(date);
      const offset = localDate.getTimezoneOffset() * 60 * 1000;
      const adjustedDate = new Date(localDate.getTime() - offset);
      return adjustedDate;
    };    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'start' || name === 'end') {
        const adjustedDate = getAdjustedDate(new Date(value));
        setEditedEvent((prevState) => ({ ...prevState as CalendarEvent, [name]: adjustedDate }));
      } else {
        setEditedEvent((prevState) => ({ ...prevState as CalendarEvent, [name]: value }));
      }
    };    
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg text-black">
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              {/* Render editable fields and a save button when in edit mode */}
              <label className="block mb-1">
                Title:
                {editedEvent && (
                  <input
                    type="text"
                    name="title"
                    value={editedEvent?.title || ''}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </label>
              <label className="block mb-1">
                Description:
                {editedEvent && (
                  <input
                    type="text"
                    name="description"
                    value={editedEvent?.description || ''}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </label>
              <label className="block mb-1">
                Location:
                {editedEvent && (
                  <input
                    type="text"
                    name="location"
                    value={editedEvent?.location || ''}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </label>
              <label className="block mb-1">
                Start:
                {editedEvent && (
                  <input
                    type="datetime-local"
                    name="start"
                    value={editedEvent?.start.toISOString().substring(0, 16) || ''}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </label>
              <label className="block mb-1">
                End:
                {editedEvent && (
                  <input
                    type="datetime-local"
                    name="end"
                    value={editedEvent?.end.toISOString().substring(0, 16) || ''}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </label>
              <label className="block mb-1">
                Link:
                {editedEvent && (
                  <input
                    type="text"
                    name="link"
                    value={editedEvent?.link || ''}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </label>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </form>
          ) : (
            <>
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
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={() => {
                  setIsEditing(true);
                  setEditedEvent(selectedEvent);
                }}
              >
                Edit
              </button>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
            </>
          )}
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
        <EventModal updateEvent={updateEvent} />
      </div>
    </div>
  );
};


export default MyCalendar;
