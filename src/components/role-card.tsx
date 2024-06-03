import Link from 'next/link';

export default function RoleCard({ role }) {
  return (
    <Link href={`/person/${role.persons.id}`}>
      <div className="flex flex-row items-center gap-4 rounded-lg px-4 py-2 dark:bg-slate-700">
        <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {role.persons.name[0]}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h2 className="text-lg font-semibold text-white">
              {role.persons.name}
            </h2>
            <p className="text-sm text-gray-300">
              {role.persons.original_name}
            </p>
          </div>
          <p className="text-sm text-gray-300">
            {role.age ? `${role.age} years old` : 'Age not available'}
          </p>
        </div>
      </div>
    </Link>
  );
}
