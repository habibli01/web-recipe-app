import React, { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import useFetch from '../hooks/useFetch';
import SearchBar from '../components/Recipes/SearchBar';
import DifficultyFilter from '../components/Recipes/DifficultyFilter';
import SortOptions from '../components/Recipes/SortOptions';
import TagsFilter from '../components/Recipes/TagsFilter';
import RecipeGrid from '../components/Recipes/RecipeGrid';
import ShareModal from '../components/Recipes/ShareModal';
import Pagination from '../components/Recipes/Pagination';
import { IoShareSocial } from 'react-icons/io5';

const ITEMS_PER_PAGE = 4;

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const params = useMemo(() => {
    const queryParams = {
      _page: currentPage,
      _limit: ITEMS_PER_PAGE,
      _sort: 'order,updatedAt',
      _order: 'asc,desc'
    };

    if (debouncedSearchTerm) {
      queryParams.q = debouncedSearchTerm;
    }

    if (difficulty) {
      queryParams.difficultyLevel = difficulty;
    }

    if (selectedTags.length > 0) {
      queryParams.tags_like = selectedTags.join('|');
    }

    return queryParams;
  }, [debouncedSearchTerm, difficulty, selectedTags, currentPage]);

  const { 
    data: recipes, 
    loading, 
    error, 
    metadata, 
    refetch 
  } = useFetch('/recipes', params);

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
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecipeSelect = (recipeId) => {
    setSelectedRecipes(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const selectedRecipeData = recipes?.filter(recipe => 
    selectedRecipes.includes(recipe.id)
  ) || [];

  return (
    <div className="container mx-auto px-4 py-6 relative">
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
          <RecipeGrid 
            recipes={recipes} 
            loading={loading} 
            error={error}
            onRecipeUpdate={refetch}
            selectedRecipes={selectedRecipes}
            onRecipeSelect={handleRecipeSelect}
          />

          {!loading && !error && recipes?.length > 0 && (
            <Pagination
              currentPage={metadata.currentPage}
              totalPages={metadata.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {/* Floating Share Button */}
      {selectedRecipes.length > 0 && (
        <div className="fixed bottom-6 right-6 z-10">
          <button
            onClick={() => setShowShareModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <IoShareSocial size={20} />
            Share ({selectedRecipes.length})
          </button>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          recipes={selectedRecipeData}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default Recipes; 