export const StatusSelect = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none p-2 pr-10 border rounded-md"
      >
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}; 