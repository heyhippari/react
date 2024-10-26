'use client';
import type { Provider } from '@supabase/supabase-js';

import { loginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';

/**
 * A button that logs in the user using the specified provider.
 * @param props The component props.
 * @param props.nextUrl The URL to redirect to after logging in.
 * @param props.provider The provider to use for logging in.
 * @returns The rendered component.
 */
export default function LoginButton(props: {
  nextUrl?: string;
  provider: Provider;
}) {
  const [, action, isProcessing] = useActionState(loginAction, null);
  return (
    <form action={action}>
      <input name="provider" type="hidden" value={props.provider} />
      <input name="next" type="hidden" value={props.nextUrl} />
      <Button loading={isProcessing} type="submit" variant="default">
        Login with {props.provider}
      </Button>
    </form>
  );
}
