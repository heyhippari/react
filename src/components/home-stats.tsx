export default function HomeStats({
  movieCount,
  personCount,
}: {
  movieCount: number;
  personCount: number;
}) {
  return (
    <div className="container flex h-full flex-row items-center justify-center gap-6 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">Movies</h2>
        <p>{movieCount}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">Persons</h2>
        <p>{personCount}</p>
      </div>
    </div>
  );
}
