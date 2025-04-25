// SearchFilter.jsx
const SearchFilter = ({ search, setSearch, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md"
      />

      {/* Custom Dropdown Filter */}
      <div className="relative w-40">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full appearance-none p-2 pr-10 border border-gray-300 rounded-md"
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="returned">Returned</option> {/* New filter option */}
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
    </div>
  );
};

export default SearchFilter;
