'use client';

import useSupabaseBrowser from '@/lib/supabase/client';
import type { Provider } from '@supabase/supabase-js';
import { Button } from './ui/button';

export default function LoginButton(props: {
  nextUrl?: string;
  provider: Provider;
}) {
  const supabase = useSupabaseBrowser();

  const handleLogin = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${props.nextUrl || ''}`,
      },
    });
  };

  return (
    <Button variant="default" onClick={() => handleLogin(props.provider)}>
      Login with {props.provider}
    </Button>
  );
}
