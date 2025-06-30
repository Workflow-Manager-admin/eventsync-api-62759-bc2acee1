const eventService = require('../services/event');
const { validateEvent } = require('../middleware/validators');

class EventController {
  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create a new event (protected) */
    const { title, description, date, location } = req.body;
    const error = validateEvent({ title, date, location });
    if (error) return res.status(400).json({ message: error });

    const ownerId = req.user.id;
    const event = eventService.createEvent({ title, description, date, location, ownerId });
    return res.status(201).json(event);
  }

  // PUBLIC_INTERFACE
  list(req, res) {
    /** List all events (public) */
    const events = eventService.getAllEvents();
    return res.status(200).json(events);
  }

  // PUBLIC_INTERFACE
  detail(req, res) {
    /** Get detail of an event (public) */
    const event = eventService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json(event);
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update an existing event (protected) */
    const { title, description, date, location } = req.body;
    const error = validateEvent({ title, date, location });
    if (error) return res.status(400).json({ message: error });

    const ownerId = req.user.id;
    const result = eventService.updateEvent(req.params.id, { title, description, date, location }, ownerId);
    if (result === null) 
      return res.status(404).json({ message: 'Event not found' });
    if (result === 'forbidden')
      return res.status(403).json({ message: 'You can only update your own events.' });
    return res.status(200).json(result);
  }

  // PUBLIC_INTERFACE
  delete(req, res) {
    /** Delete an event (protected) */
    const ownerId = req.user.id;
    const result = eventService.deleteEvent(req.params.id, ownerId);
    if (result === null) 
      return res.status(404).json({ message: 'Event not found' });
    if (result === 'forbidden')
      return res.status(403).json({ message: 'You can only delete your own events.' });
    return res.status(204).send();
  }
}

module.exports = new EventController();
