import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";

import { createClient } from "../../infrastructure/database/client/client";

type AuthJwtPayload = { user_role: string } & JwtPayload;

/**
 * Fetches the user role from the JWT token stored in the session.
 * @returns The user role or null if the user is not authenticated.
 * // TODO: Replace this with Zustand and the user service.
 */
export function useUserRole() {
  const [userRole, setUserRole] = useState<string>("banned");
  const supabase = createClient();

  useEffect(() => {
    /**
     * Fetches the user role from the JWT token stored in the session.
     * @returns The user role or null if the user is not authenticated.
     */
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
