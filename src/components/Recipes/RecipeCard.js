import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiEye, FiMove } from 'react-icons/fi';
import EditRecipeModal from './EditRecipeModal';

const RecipeCard = ({ recipe, onRecipeUpdate, selected, onSelect }) => {
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
      onRecipeUpdate();
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe');
    }
  };

  const handleCardClick = () => {
    onSelect(recipe.id);
  };

  return (
    <>
      <div 
        className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow relative group
          ${selected ? 'ring-2 ring-indigo-500' : ''}`}
      >
        {/* Drag Handle */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
          <FiMove size={20} className="text-gray-400" />
        </div>

        {/* Selection Checkbox */}
        <div className="absolute top-4 left-12 opacity-100">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(recipe.id);
            }}
            className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/recipe/${recipe.id}`);
            }}
            className="text-green-600 hover:text-green-800 p-1"
          >
            <FiEye size={20} />
          </button>
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

        <h3 className="text-xl font-semibold text-indigo-600 mb-2 pl-8 pr-24">
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