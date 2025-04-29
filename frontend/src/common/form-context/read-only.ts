import { createContext } from 'react';

interface IReadOnly {
  readOnly?: boolean | undefined;
}

export interface ICustomFormContext extends IReadOnly {}

export const CustomFormContext = createContext<ICustomFormContext>({});
