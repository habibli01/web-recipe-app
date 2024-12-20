import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <h3 className="text-xl font-semibold text-indigo-600 mb-2">
        {recipe.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {recipe.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Difficulty: {recipe.difficultyLevel}</span>
        <span>{new Date(recipe.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default RecipeCard; 