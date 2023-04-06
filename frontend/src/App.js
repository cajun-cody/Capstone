// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import MyRecipesPage from "./pages/MyRecipes/MyRecipesPage";
import NewRecipePage from "./pages/NewRecipePage/NewRecipePage";
import AddIngredientsPage from "./pages/AddIngredientsPage/AddIngredientsPage";
import EditRecipePage from "./pages/EditRecipePage/EditRecipePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import RecipePage from "./pages/RecipePage/RecipePage";



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path='/editRecipe' element={<EditRecipePage />} />
        <Route path='/addIngredients/:recipeId' element={<AddIngredientsPage />} />
        <Route path='/newrecipe' element={<NewRecipePage/>} />
        <Route path='/myrecipes' element={<MyRecipesPage/>} />
        <Route path='/search' element={<SearchPage/>} />
        <Route path= "/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
