"use server";
import { userService } from "@/services/user.service";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
 */
export async function loginAction(
  currentState: null | void,
  formData: FormData,
) {
  const provider = formData.get("provider") as Provider;

  // For safety, we only allow supported providers.
  if (!["discord"].includes(provider)) {
    console.error(`Unsupported provider: ${provider}`);
    redirect("/error");
  }

  try {
    const data = await userService.loginWithProvider(provider);

    revalidatePath("/", "layout");
    if (data.url) {
      revalidatePath(data.url, "layout");
      redirect(data.url);
    }
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}
