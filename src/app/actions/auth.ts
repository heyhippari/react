"use server";
import { userService } from "@/services/user.service";
import * as Sentry from "@sentry/nextjs";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface LoginActionState {
  message: null | string;
  redirect?: string;
}

/**
 * Logs out the current user.
 */
export async function logoutAction() {
  await userService.logout();

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Logs in the user using the specified provider.
 * @param currentState The current state of the form.
 * @param formData The form data containing the provider.
 * @returns The result of the login action if it failed. Otherwise, the user is redirected.
 */
export async function loginAction(
  currentState: LoginActionState | null,
  formData: FormData,
): Promise<LoginActionState> {
  const provider = formData.get("provider") as Provider;

  // For safety, we only allow supported providers.
  if (!["discord"].includes(provider)) {
    Sentry.captureException(
      new Error(`Unsupported login provider: ${provider}`),
    );

    return { message: "Unsupported login provider." };
  }

  const { data, error } = await userService.loginWithProvider(provider);

  if (error) {
    Sentry.captureException(error);

    return { message: "An error occurred while logging in." };
  }

  revalidatePath("/", "layout");

  if (data.url) {
    revalidatePath(data.url, "layout");
  }

  return { message: null, redirect: data.url ?? "/" };
}
