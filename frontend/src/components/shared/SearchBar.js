import React from 'react';

const SearchBar = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="mb-6">
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search cars by title, description, or tags..."
        className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-150 ease-in-out shadow-sm"
      >
        Search
      </button>
    </div>
  </form>
);

export default SearchBar;