import React from 'react';

const TagsFilter = ({ allTags, selectedTags, setSelectedTags }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tags
      </label>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {allTags.map(tag => (
          <label key={tag} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={(e) => {
                setSelectedTags(prev =>
                  e.target.checked
                    ? [...prev, tag]
                    : prev.filter(t => t !== tag)
                );
              }}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">{tag}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagsFilter; 