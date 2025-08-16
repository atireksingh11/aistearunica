export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-md ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-48 mb-4" />
      <div className="space-y-2">
        <div className="bg-gray-200 rounded h-4 w-3/4" />
        <div className="bg-gray-200 rounded h-4 w-1/2" />
        <div className="bg-gray-200 rounded h-4 w-2/3" />
      </div>
    </div>
  )
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`bg-gray-200 rounded h-4 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  )
}
