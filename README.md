
# Recipe App

## Deployment Link
https://recipe-app-nine-wheat.vercel.app/

## Project Overview
The Recipe App is a web-based platform that allows users to search, view, and save recipes. Built with modern web technologies, the app provides a user-friendly experience with features like recipe search, detailed instructions, and a personalized login system.

## Table of Contents
1. [Abstract](#abstract)
2. [Technologies Implemented](#technologies-implemented)
3. [Outputs](#outputs)
4. [Conclusion](#conclusion)

## Abstract
The Recipe App enables users to discover, save, and view a variety of recipes, catering to different cuisines, dietary preferences, and ingredients. With a seamless interface, users can easily explore, search, and interact with recipes for a better culinary experience.

## Technologies Implemented
### Frontend:
- **React**: Used for creating the dynamic and interactive UI.
- **React Router**: Manages navigation across the app.
- **CSS**: Styles the application for a visually appealing experience.

### Backend:
- **Node.js & Express.js**: Powers the backend for handling HTTP requests.
- **MongoDB**: Stores recipe data.
- **Mongoose**: ODM for MongoDB for easy data modeling.
- **Redis**: Used for caching frequently accessed recipe data to improve performance and reduce database load.

### Version Control:
- **Git**: For source code management.
- **GitHub**: For hosting the project and collaboration.

## Outputs
### Features:
- **Recipe Search**: Quickly search recipes by ingredients or cuisine type.
- **Recipe Details**: View detailed recipe information including ingredients, instructions, and nutritional data.
- **Login/Sign-Up**: Users can create accounts to save favorite recipes.


## Conclusion
This project demonstrates the power of full-stack development with a focus on efficient data management and user experience. Future enhancements include adding user authentication, personalized recommendations, and API integrations.

## Project Structure

```bash
recipe-app/
├── frontend/
│   └── src/
│       ├── assets/
│       │   └── ...
│       ├── components/
│       │   ├── SearchBar.js
│       │   ├── SignIn.js 
│       │   ├── SignUp.js 
│       │   └── Widget.js
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── Recipe.css
│       │   ├── RecipeFilter.js
│       │   ├── SearchPage.js
│       │   ├── SignInPage.js 
│       │   └── SignUpPage.js 
│       ├── App.js
│       └── ...
├── backend/  # (Optional)
│   ├── models/
│   │   ├── Recipe.js 
│   │   └── User.js    
│   ├── routes/
│   │   ├── auth.js     
│   │   └── recipe.js   
│   ├── uploads/      
│   └── server.js    
└── ...
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Recipe_App.git
   ```

2. Navigate to the project directory and install dependencies:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. Start the backend and frontend servers:
   - Backend:
     ```bash
     cd backend
     npm start
     ```

   - Frontend:
     ```bash
     cd frontend
     npm start
     ```



## License
This project is licensed under the MIT License.
