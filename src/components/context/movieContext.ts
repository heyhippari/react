import type { MovieWithAll } from '@/queries/types';
import { createContext } from 'react';

export const MovieContext = createContext<MovieWithAll | null>(null);
