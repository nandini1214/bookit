

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>

        {/* Inner rotating ring */}
        <div className="w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin absolute"></div>
      </div>
    </div>
  );
}
