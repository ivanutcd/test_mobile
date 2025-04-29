import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => {
  const uuidValue = uuidv4();
  return uuidValue;
};
