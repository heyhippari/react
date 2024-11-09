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

  let data: {
    provider: Provider;
    url: string;
  } | null = null;

  try {
    data = await userService.loginWithProvider(provider);

    revalidatePath("/", "layout");
    if (data.url) {
      revalidatePath(data.url, "layout");
    }
  } catch (error) {
    console.error(`loginWithProvider error`, error);
    redirect("/error");
  } finally {
    if (!data) {
      redirect("/");
    }

    redirect(data.url);
  }
}
