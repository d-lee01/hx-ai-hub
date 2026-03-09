import { getUserImageByName } from "@/lib/db/queries";

const INITIAL_COLORS = [
  "bg-hx-purple",
  "bg-blue-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

function getColorForName(name: string) {
  let hash = 0;
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  return INITIAL_COLORS[Math.abs(hash) % INITIAL_COLORS.length];
}

export async function AuthorByline({ author }: { author: string }) {
  const imageUrl = await getUserImageByName(author);

  return (
    <div className="flex items-center gap-2.5 mb-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={author}
          className="w-8 h-8 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${getColorForName(author)}`}
        >
          {author[0].toUpperCase()}
        </div>
      )}
      <span className="text-sm text-text-secondary">{author}</span>
    </div>
  );
}
