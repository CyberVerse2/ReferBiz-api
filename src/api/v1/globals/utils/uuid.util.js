import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

function createId() {
  const id = uuidv4();
  return id;
}

function shortId() {
  return nanoid();
}

export { createId, shortId };
