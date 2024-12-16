import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const FeaturedRecipe = () => {
  const navigate = useNavigate();
  
  // Memoize the params object
  const params = useMemo(() => ({
    _sort: 'updatedAt',
    _order: 'desc',
    _limit: 1
  }), []);

  const { data: recipes, loading, error } = useFetch('/recipes', params);

  if (loading) return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <p className="text-red-600">Failed to load featured recipe</p>
    </div>
  );

  if (!recipes || recipes.length === 0) return null;

  const recipe = recipes[0];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Recipe</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-indigo-600">{recipe.title}</h3>
        <p className="text-gray-600">{recipe.description}</p>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          Difficulty: {recipe.difficultyLevel}
        </div>
        <button
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default FeaturedRecipe; 