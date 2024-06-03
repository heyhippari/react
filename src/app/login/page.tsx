import LoginButton from '@/components/login-button';

export default function Login() {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Login</h1>
        <div className="mt-4 flex flex-col gap-2">
          <LoginButton provider="discord" />
        </div>
      </div>
    </div>
  );
}
