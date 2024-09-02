import ThemeToggle from './theme-toggle';

export default function SiteFooter() {
  return (
    <footer className="w-full bg-pink-300 shadow dark:bg-pink-700">
      <div className="container mx-auto w-full p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-pink-800 dark:text-pink-200 sm:text-center">
          &copy; 2024 Kanojo. All rights reserved.
        </span>
        <div className="flex flex-row">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
