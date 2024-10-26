'use client';
import type { Provider } from '@supabase/supabase-js';

import { loginAction } from '@/app/actions/auth';

import { Button } from './ui/button';

export default function LoginButton(props: {
  nextUrl?: string;
  provider: Provider;
}) {
  return (
    <form action={loginAction}>
      <input name="provider" type="hidden" value={props.provider} />
      <input name="next" type="hidden" value={props.nextUrl} />
      <Button type="submit" variant="default">
        Login with {props.provider}
      </Button>
    </form>
  );
}
