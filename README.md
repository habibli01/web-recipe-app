# Recipe Management Application

A modern recipe management application built with React, featuring drag-and-drop organization, recipe sharing, and advanced filtering capabilities.


## Features

- 📱 Responsive design
- 🔍 Advanced search and filtering
- 🏷️ Tag-based organization
- 📋 Drag and drop recipe reordering
- 📤 Recipe sharing functionality
- ✏️ CRUD operations for recipes
- 📄 Pagination
- 🎯 Difficulty level filtering

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:

## API Endpoints (JSON Server)

Base URL: `http://localhost:3001`

### Recipes
- `GET /recipes`: List recipes (supports pagination)
- `GET /recipes/:id`: Get single recipe
- `POST /recipes`: Create recipe
- `PUT /recipes/:id`: Update recipe
- `DELETE /recipes/:id`: Delete recipe

### Query Parameters
- `_page` & `_limit`: Pagination
- `q`: Search term
- `_sort` & `_order`: Sorting
- `difficultyLevel`: Filter by difficulty
- `tags_like`: Filter by tags

## Common Issues & Solutions

1. **JSON Server Port Conflict**
   - Error: "Port 3001 is already in use"
   - Solution: Kill the process using port 3001 or use a different port
   ```bash
   # On Windows
   netstat -ano | findstr :3001
   taskkill /PID <PID> /F

   # On Mac/Linux
   lsof -i :3001
   kill -9 <PID>
   ```

2. **Recipe Order Not Saving**
   - Ensure JSON Server has write permissions to recipe-db.json
   - Check network tab for failed PUT requests
   - Verify recipe-db.json is not read-only

## Development Notes

- The application uses `@hello-pangea/dnd` for drag and drop functionality
- Recipe order is persisted in the `order` field of each recipe
- Sharing functionality uses `mailto:` links for email sharing
- All data is persisted in recipe-db.json

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

The application will be available at:
- React App: `http://localhost:3000` use npm run start 
- JSON Server: `http://localhost:3001` use json-server --watch recipe-db.json -p 3001

## Using the Application

### Basic Navigation
1. Browse recipes on the main page
2. Use the search bar to find specific recipes
3. Filter recipes using the sidebar options:
   - Difficulty level
   - Tags
   - Sort options

### Recipe Management
1. **View Recipe**
   - Click the eye icon on any recipe card
   - View full details including ingredients and steps

2. **Edit Recipe**
   - Click the edit (pencil) icon
   - Modify recipe details in the modal
   - Click "Save Changes"

3. **Delete Recipe**
   - Click the delete (trash) icon
   - Confirm deletion in the popup

4. **Reorder Recipes**
   - Hover over a recipe to see the drag handle
   - Click and drag to reorder
   - Changes are automatically saved

5. **Share Recipes**
   - Select multiple recipes using checkboxes
   - Click the floating share button
   - Enter recipient's email
   - Click "Share via Email"

### Pagination and Filtering
- Use pagination controls at the bottom
- Combine multiple filters:
  - Search text
  - Difficulty
  - Tags
- Clear all filters using the "Clear All Filters" button
