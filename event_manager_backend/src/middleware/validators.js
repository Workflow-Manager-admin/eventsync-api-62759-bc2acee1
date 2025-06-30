/**
 * PUBLIC_INTERFACE
 * Validate registration input ({ username, password }).
 */
function validateRegister({ username, password }) {
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    typeof password !== 'string' ||
    password.length < 6
  ) {
    return 'Invalid username or password. Username min 3 chars, password min 6 chars.';
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Validate event input for creation/updating.
 */
function validateEvent({ title, date, location }) {
  if (
    typeof title !== 'string' ||
    !title.trim() ||
    typeof date !== 'string' ||
    isNaN(Date.parse(date)) ||
    typeof location !== 'string' ||
    !location.trim()
  ) {
    return 'Invalid event data. Title, date, and location required.';
  }
  return null;
}

module.exports = { validateRegister, validateEvent };
