import { createContext } from 'react';

import { UserInterface } from './interfaces';

export const UserContext = createContext<UserInterface | null>(null);
