export default function HomeStats({
  counts,
}: Readonly<{
  counts: {
    movie_count: number | null;
    person_count: number | null;
    studio_count: number | null;
    series_count: number | null;
    label_count: number | null;
    tag_count: number | null;
  } | null;
}>) {
  return (
    <div className="container flex flex-row items-center justify-center gap-8 px-4 text-center">
      <div className="grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex flex-col items-center justify-center before:absolute before:bg-pink-300 before:content-[''] before:bs-screen before:is-px before:-inset-block-4 before:-inset-inline-4 after:absolute after:z-10 after:bg-pink-300 after:content-[''] after:bs-px after:is-screen after:-block-start-4 after:inline-start-0 before:dark:bg-pink-500 after:dark:bg-pink-500">
          <h2 className="text-2xl font-bold">Movies</h2>
          <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-6xl font-black leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
            {counts?.movie_count}
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center before:absolute before:bg-pink-300 before:content-[''] before:bs-screen before:is-px before:-inset-block-4 before:-inset-inline-4 after:absolute after:z-10 after:bg-pink-300 after:content-[''] after:bs-px after:is-screen after:-block-start-4 after:inline-start-0 before:dark:bg-pink-500 after:dark:bg-pink-500">
          <h2 className="text-2xl font-bold">People</h2>
          <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-6xl font-black leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
            {counts?.person_count}
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center before:absolute before:bg-pink-300 before:content-[''] before:bs-screen before:is-px before:-inset-block-4 before:-inset-inline-4 after:absolute after:z-10 after:bg-pink-300 after:content-[''] after:bs-px after:is-screen after:-block-start-4 after:inline-start-0 before:dark:bg-pink-500 after:dark:bg-pink-500">
          <h2 className="text-2xl font-bold">Studios</h2>
          <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-6xl font-black leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
            {counts?.studio_count}
          </p>
        </div>
      </div>
    </div>
  );
}
