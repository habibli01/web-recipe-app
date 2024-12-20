import React from 'react';

const SortOptions = ({ sortBy, sortOrder, setSortBy, setSortOrder }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sort By
      </label>
      <select
        value={`${sortBy}-${sortOrder}`}
        onChange={(e) => {
          const [newSortBy, newSortOrder] = e.target.value.split('-');
          setSortBy(newSortBy);
          setSortOrder(newSortOrder);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="updatedAt-desc">Latest Updated</option>
        <option value="updatedAt-asc">Oldest Updated</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="difficultyLevel-asc">Difficulty (Easy-Hard)</option>
        <option value="difficultyLevel-desc">Difficulty (Hard-Easy)</option>
      </select>
    </div>
  );
};

export default SortOptions; 