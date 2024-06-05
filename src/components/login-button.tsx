'use client';
import { loginAction } from '@/app/actions/auth';
import type { Provider } from '@supabase/supabase-js';
import { Button } from './ui/button';

export default function LoginButton(props: {
  nextUrl?: string;
  provider: Provider;
}) {
  return (
    <form>
      <input type="hidden" name="provider" value={props.provider} />
      <input type="hidden" name="next" value={props.nextUrl} />
      <Button variant="default" formAction={loginAction}>
        Login with {props.provider}
      </Button>
    </form>
  );
}
