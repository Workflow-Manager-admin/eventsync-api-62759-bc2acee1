const { v4: uuidv4 } = require('uuid');

// In-memory event store
const events = [];

// PUBLIC_INTERFACE
function createEvent({ title, description, date, location, ownerId }) {
  /** Create a new event. */
  const event = {
    id: uuidv4(),
    title,
    description,
    date,
    location,
    ownerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  events.push(event);
  return event;
}

// PUBLIC_INTERFACE
function getAllEvents() {
  /** Retrieve all events */
  return events;
}

// PUBLIC_INTERFACE
function getEventById(id) {
  /** Retrieve event by id */
  return events.find(e => e.id === id);
}

// PUBLIC_INTERFACE
function updateEvent(id, newData, ownerId) {
  /** Update event if it exists and is owned by user */
  const event = getEventById(id);
  if (!event) return null;
  if (event.ownerId !== ownerId) return 'forbidden';
  Object.assign(event, {
    title: newData.title,
    description: newData.description,
    date: newData.date,
    location: newData.location,
    updatedAt: new Date().toISOString(),
  });
  return event;
}

// PUBLIC_INTERFACE
function deleteEvent(id, ownerId) {
  /** Delete event if owned by user */
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return null;
  if (events[index].ownerId !== ownerId) return 'forbidden';
  const [deleted] = events.splice(index, 1);
  return deleted;
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
