// SearchFilter.jsx
const SearchFilter = ({ search, setSearch, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
      {/* Search Input */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                   placeholder:text-gray-400 transition-colors duration-200"
        />
      </div>

      {/* Status Filter */}
      <div className="relative w-full sm:w-40">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full appearance-none pl-4 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                   cursor-pointer transition-colors duration-200"
        >
          <option value="all">All Items</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="returned">Returned</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
