"use client";
import { useEffect, useState } from 'react'
const TODAY = new Date()
const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const EVENTS = [
  {
    name: "Gym",
    start: 9,
    end: 10,
  },
  {
    name: "Work",
    start: 11,
    end: 17,
  },
  {
    name: "Dinner",
    start: 18,
    end: 19,
  },
]

export default function Home() {
  const [events, setEvents] = useState(EVENTS);
  const [currentEvent, setCurrentEvent] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  function handleEventClick(hour) {
    const event = events.find(event => event.start <= hour && event.end > hour);
    if (event) {
      setCurrentEvent(event);
      setSelectedEvent(event);
    }
  }

  function handleNameChange(e) {
    setCurrentEvent({ ...currentEvent, name: e.target.value })
  }

  function handleStartChange(e) {
    setCurrentEvent({ ...currentEvent, start: parseInt(e.target.value) })
  }

  function handleEndChange(e) {
    setCurrentEvent({ ...currentEvent, end: parseInt(e.target.value) })
  }

  function handleSaveEvent() {
    const updatedEvents = events.map(e => e.name === selectedEvent.name ? { ...currentEvent } : e);
    setEvents(updatedEvents);
  }

  function isHourInEvent(hour, events) {
    return events.some(event => event.start <= hour && event.end > hour);
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <div className="fixed justify-between space-x-3 items-center left-0 top-0 flex w-full justify-left bg-bootslight40 from-zinc-200 py-6 px-8 backdrop-blur-2xl dark:bg-zinc-800/30 dark:from-inherit  lg:dark:bg-zinc-800/30">
          <p className='text-lg font-bold'>
            {TODAY.getMonth().toString()}/{TODAY.getDate().toString()}/{TODAY.getFullYear().toString()}
          </p>
          <div className='flex flex-row space-x-4 items-center justify-center'>
            <div className='flex flex-row space-x-2'>
              <label for="name">Event name:</label>
              <input type="text" id="name" name="name" value={currentEvent.name || ''} onChange={handleNameChange} />
            </div>
            <div className='flex flex-row space-x-2'>
              <label for="start">Start time:</label>
              <input type="text" id="start" name="start" value={currentEvent.start || ''} onChange={handleStartChange} />
            </div>
            <div className='flex flex-row space-x-2'>
              <label for="end">End time: </label>
              <input type="text" id="end" name="end" value={currentEvent.end || ''} onChange={handleEndChange} />
            </div>
            <button className='bg-bolt text-white px-3 py-1 rounded-md' onClick={() => handleSaveEvent()}>
              Save
            </button>
          </div>
        </div>
        {HOURS.map(hour => {
          const inEvent = hasMounted && isHourInEvent(hour, events);
          const hourStyle = inEvent
            ? "h-[80px] border-b border-gray-400 bg-bolt cursor-pointer" // Style for hours with events
            : "h-[80px] border-b border-gray-400 cursor-pointer"; // Style for empty hours

          return (
            <div key={hour} className={hourStyle} onClick={() => handleEventClick(hour)}>
              {hour} {inEvent && events.find(event => event.start === hour)?.name}
            </div>
          )
        })}
      </div>
    </main>
  )
}
