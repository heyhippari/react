import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';
import useSupabaseBrowser from './supabase/client';

type AuthJwtPayload = { user_role: string } & JwtPayload;

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    height: number | undefined;
    width: number | undefined;
  }>({
    height: undefined,
    width: undefined,
  });

  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowSize;
}

const fullConfig = resolveConfig(tailwindConfig);

export type BreakpointKey = keyof typeof fullConfig.theme.screens;

export function useBreakpoint<K extends BreakpointKey>(breakpoint: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${fullConfig.theme.screens[breakpoint]})`,
  });
  const capitalizedKey = breakpoint[0].toUpperCase() + breakpoint.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}

export function useUserRole() {
  const [userRole, setUserRole] = useState<null | string>(null);
  const supabase = useSupabaseBrowser();

  useEffect(() => {
    async function fetchUserRole() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const jwt = jwtDecode<AuthJwtPayload>(session?.access_token);

        setUserRole(jwt.user_role);
      }
    }

    void fetchUserRole();
  }, [supabase]);

  return userRole;
}
