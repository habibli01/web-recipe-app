import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdContentCopy } from 'react-icons/md';

const ShareModal = ({ recipes, onClose }) => {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const recipeData = recipes.map(({ id, title, description, ingredients, preparationSteps, tags, difficultyLevel }) => ({
    id,
    title,
    description,
    ingredients,
    preparationSteps,
    tags,
    difficultyLevel
  }));

  const handleShare = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${email}?subject=Shared Recipes&body=${encodeURIComponent(JSON.stringify(recipeData, null, 2))}`;
    window.location.href = mailtoLink;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(recipeData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Share {recipes.length} Recipes</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Selected Recipes:</h4>
          <ul className="bg-gray-50 p-3 rounded-md">
            {recipes.map(recipe => (
              <li key={recipe.id} className="text-gray-700">{recipe.title}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleShare} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter recipient's email"
              required
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Recipe Data</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <MdContentCopy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-auto max-h-40">
              {JSON.stringify(recipeData, null, 2)}
            </pre>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Share via Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareModal; 