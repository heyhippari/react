/**
 * Service to handle movie related operations.
 */
import { toUserDto, UserDto } from "@/data/user.dto";
import {
  exchangeCodeForSession,
  getUserById,
  getUserByUsername,
  loginWithProvider,
  logoutUser,
  refreshUser,
} from "@/infrastructure/database/repositories/user.repository";
import { OAuthResponse, Provider, User } from "@supabase/supabase-js";

export const userService = {
  async exchangeCodeForSession(code: string): Promise<void> {
    return await exchangeCodeForSession(code);
  },
  async getCurrentUser(): Promise<null | UserDto> {
    const user = await refreshUser();

    if (!user) {
      return null;
    }

    const userProfile = await getUserById(user.id);

    return toUserDto(userProfile);
  },
  async getUser(user_id?: string): Promise<null | UserDto> {
    if (!user_id) {
      return null;
    }

    const user = await getUserById(user_id);

    return toUserDto(user);
  },
  async getUserByUsername(username: string): Promise<null | UserDto> {
    const user = await getUserByUsername(username);

    return toUserDto(user);
  },
  async loginWithProvider(provider: Provider): Promise<OAuthResponse> {
    return await loginWithProvider(provider);
  },
  async logout(): Promise<void> {
    return await logoutUser();
  },
  async refreshUser(): Promise<null | User> {
    return await refreshUser();
  },
};
