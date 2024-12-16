import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, loading, error } = useFetch(`/recipes/${id}`);

  if (loading) return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );

  if (error || !recipe) return (
    <div className="container mx-auto px-4 py-6 max-w-4xl text-center">
      <h2 className="text-2xl font-bold text-gray-700">Recipe not found</h2>
      <button 
        onClick={() => navigate('/')}
        className="mt-4 text-indigo-600 hover:text-indigo-800"
      >
        Return to Home
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>

        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {recipe.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mb-8">{recipe.description}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Preparation Steps</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.preparationSteps.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Difficulty: {recipe.difficultyLevel}</span>
            <span>Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail; 