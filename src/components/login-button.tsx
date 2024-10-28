'use client';
import type { Provider } from '@supabase/supabase-js';

import { loginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';

/**
 * A button that logs in the user using the specified provider.
 * @param properties The component properties.
 * @param properties.nextUrl The URL to redirect to after logging in.
 * @param properties.provider The provider to use for logging in.
 * @returns The rendered component.
 */
export default function LoginButton({
  nextUrl,
  provider,
}: {
  nextUrl?: string;
  provider: Provider;
}) {
  const [, action, isProcessing] = useActionState(loginAction, null);
  return (
    <form action={action}>
      <input name="provider" type="hidden" value={provider} />
      <input name="next" type="hidden" value={nextUrl} />
      <Button loading={isProcessing} type="submit" variant="default">
        Login with {provider}
      </Button>
    </form>
  );
}
