export default function AuthError() {
  return (
    <div className="container mx-auto flex h-screen flex-wrap items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Auth Error</h1>
        <p className="mt-4">There was an error with your authentication.</p>
      </div>
    </div>
  );
}
