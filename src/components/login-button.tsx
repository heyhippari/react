'use client';
import type { Provider } from '@supabase/supabase-js';

import { loginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { redirect } from 'next/navigation';
import { useActionState, useEffect } from 'react';

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
  const [state, action, isProcessing] = useActionState(loginAction, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.redirect) {
      redirect(state.redirect);
    }

    if (state?.message) {
      toast({
        description: state.message,
        title: 'Error',
        variant: 'destructive',
      });
    }
  }, [state, toast]);

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
