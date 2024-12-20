import React, { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import useFetch from '../hooks/useFetch';
import SearchBar from '../components/Recipes/SearchBar';
import DifficultyFilter from '../components/Recipes/DifficultyFilter';
import SortOptions from '../components/Recipes/SortOptions';
import TagsFilter from '../components/Recipes/TagsFilter';
import RecipeGrid from '../components/Recipes/RecipeGrid';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const params = useMemo(() => {
    const queryParams = {};

    if (debouncedSearchTerm) {
      queryParams.q = debouncedSearchTerm;
    }

    if (difficulty) {
      queryParams.difficultyLevel = difficulty;
    }

    if (selectedTags.length > 0) {
      queryParams.tags_like = selectedTags.join('|');
    }

    queryParams._sort = sortBy;
    queryParams._order = sortOrder;

    return queryParams;
  }, [debouncedSearchTerm, difficulty, selectedTags, sortBy, sortOrder]);

  const { data: recipes, loading, error } = useFetch('/recipes', params);

  const allTags = useMemo(() => {
    if (!recipes) return [];
    const tagSet = new Set();
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [recipes]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setDifficulty('');
    setSortBy('updatedAt');
    setSortOrder('desc');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <DifficultyFilter difficulty={difficulty} setDifficulty={setDifficulty} />
            <SortOptions 
              sortBy={sortBy}
              sortOrder={sortOrder}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
            />
            <TagsFilter 
              allTags={allTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />

            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <RecipeGrid recipes={recipes} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Recipes; 