'use client';

import {
  HoverCardContentProps,
  HoverCardProps,
  HoverCardTriggerProps,
} from '@radix-ui/react-hover-card';
import {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from '@radix-ui/react-popover';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const TouchContext = createContext<boolean | undefined>(undefined);
const useTouch = () => useContext(TouchContext);

export const HoverMenuProvider = ({ children }: PropsWithChildren<object>) => {
  const [isTouch, setIsTouch] = useState<boolean | undefined>();

  useEffect(() => {
    setIsTouch(globalThis.matchMedia('(pointer: coarse)').matches);
  }, []);

  return (
    <TouchContext.Provider value={isTouch}>{children}</TouchContext.Provider>
  );
};

export const HoverMenu = (properties: HoverCardProps & PopoverProps) => {
  const isTouch = useTouch();

  return isTouch ? <Popover {...properties} /> : <HoverCard {...properties} />;
};

export const HoverMenuTrigger = (
  properties: HoverCardTriggerProps & PopoverTriggerProps,
) => {
  const isTouch = useTouch();

  return isTouch ? (
    <PopoverTrigger {...properties} />
  ) : (
    <HoverCardTrigger {...properties} />
  );
};

export const HoverMenuContent = (
  properties: HoverCardContentProps & PopoverContentProps,
) => {
  const isTouch = useTouch();

  return isTouch ? (
    <PopoverContent {...properties} />
  ) : (
    <HoverCardContent {...properties} />
  );
};
