/**
 * Loading skeleton component for habit cards
 */
export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl p-6 bg-white border border-neutral-200 shadow-soft animate-pulse">
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-3 flex-1">
              {/* Emoji circle skeleton */}
              <div className="w-12 h-12 rounded-full bg-neutral-200" />

              {/* Text skeletons */}
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-neutral-200 rounded-lg w-3/4" />
                <div className="h-4 bg-neutral-100 rounded-lg w-1/2" />
              </div>
            </div>

            {/* Delete button skeleton */}
            <div className="w-10 h-10 rounded-full bg-neutral-200" />
          </div>

          {/* Progress bar skeleton */}
          <div className="mt-4 h-2 bg-neutral-100 rounded-full" />
        </div>
      ))}
    </div>
  );
}
