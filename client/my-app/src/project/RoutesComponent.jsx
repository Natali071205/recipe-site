import React from "react";
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import LogIn from './user/LogIn';
import SingUp from './user/SingUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddRecipeMeneger from "./manager/AddRecipeMeneger";
import CategoryRecipe from "./CategoryRecipe";
import AddCategoryManager from "./manager/AddCategoryManager";
import OneCategory from "./OneCategory";

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/AddRecipeMeneger" element={<AddRecipeMeneger />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/category-recipe" element={<CategoryRecipe />} />
        <Route path="/AddCategoryManager" element={<AddCategoryManager />} />
        <Route path="/recipe/:id" element={<OneCategory />} /> {/* הוספנו את הנתיב המתכון */}
      </Routes>
    </BrowserRouter>
  );
}
