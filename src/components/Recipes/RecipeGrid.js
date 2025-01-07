import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import RecipeCard from './RecipeCard';
import axios from 'axios';

const RecipeGrid = ({ 
  recipes, 
  loading, 
  error, 
  onRecipeUpdate,
  selectedRecipes,
  onRecipeSelect
}) => {
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const reorderedRecipes = Array.from(recipes);
    const [removed] = reorderedRecipes.splice(source.index, 1);
    reorderedRecipes.splice(destination.index, 0, removed);

    // Calculate new orders based on position
    const startOrder = Math.min(source.index, destination.index);
    const endOrder = Math.max(source.index, destination.index);
    
    // Only update recipes that were affected by the drag
    const affectedRecipes = reorderedRecipes
      .slice(startOrder, endOrder + 1)
      .map((recipe, index) => ({
        ...recipe,
        order: startOrder + index
      }));

    try {
      // Update only the affected recipes
      await Promise.all(
        affectedRecipes.map(recipe =>
          axios.put(`http://localhost:3001/recipes/${recipe.id}`, {
            ...recipe,
            updatedAt: new Date().toISOString()
          })
        )
      );
      onRecipeUpdate();
    } catch (error) {
      console.error('Error updating recipe order:', error);
      alert('Failed to update recipe order');
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        Failed to load recipes
      </div>
    );
  }

  if (!recipes?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No recipes found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="recipes" direction="vertical">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {recipes.map((recipe, index) => (
              <Draggable 
                key={recipe.id} 
                draggableId={recipe.id.toString()} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${snapshot.isDragging ? 'z-50' : ''}`}
                  >
                    <RecipeCard 
                      recipe={recipe}
                      onRecipeUpdate={onRecipeUpdate}
                      selected={selectedRecipes.includes(recipe.id)}
                      onSelect={onRecipeSelect}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RecipeGrid; 