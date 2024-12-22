import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditRecipeModal from './EditRecipeModal';

const RecipeCard = ({ recipe, onRecipeUpdate }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://localhost:3001/recipes/${recipe.id}`);
        onRecipeUpdate(); 
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSave = async (updatedRecipe) => {
    try {
      await axios.put(`http://localhost:3001/recipes/${recipe.id}`, updatedRecipe);
      setShowEditModal(false);
      onRecipeUpdate(); // Trigger refetch
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe');
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer relative group"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        {/* Edit and Delete buttons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={handleEdit}
            className="text-indigo-600 hover:text-indigo-800 p-1"
            disabled={isDeleting}
          >
            <FiEdit2 size={20} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1"
            disabled={isDeleting}
          >
            <FiTrash2 size={20} />
          </button>
        </div>

        <h3 className="text-xl font-semibold text-indigo-600 mb-2 pr-16">
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

      {showEditModal && (
        <EditRecipeModal
          recipe={recipe}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default RecipeCard; 