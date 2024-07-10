export default function HomeStats({
  movieCount,
  personCount,
}: {
  movieCount: number;
  personCount: number;
}) {
  return (
    <div className="container flex h-full flex-row items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Movies</h2>
        <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-6xl font-black leading-tight text-transparent">
          {movieCount}
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Persons</h2>
        <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-6xl font-black leading-tight text-transparent">
          {personCount}
        </p>
      </div>
    </div>
  );
}
