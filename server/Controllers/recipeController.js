const Recipes = require("../models/recipeModel");
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// הגדרת תיקיית יעד להעלאת קבצים
const uploadDir = './uploads';

// אם התיקיה לא קיימת, ניצור אותה
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// הגדרת Multer לאחסון הקובץ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // התמונה תישמר בתיקיית uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// מקבל את כל המתכונים
const getAllRecipes = (req, res) => {
  Recipes.find()
    .populate("categoryCode") // מחבר את הקטגוריה
    .then(result => res.send(result))
    .catch(err => res.status(400).send({ "Error": err }));
};

// מקבל מתכון לפי ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id).populate("categoryCode");
    if (!recipe) {
      return res.status(400).send("Recipe not found");
    }
    res.send(recipe);
  } catch (err) {
    res.status(500).send({ "Error": err });
  }
};

const getRecipeByCategoryId = async (req, res) => {
  try {
    const recipes = await Recipes.find({ categoryCode: req.params.categoryId }).populate("categoryCode");
    if (!recipes || recipes.length === 0) {
      return res.status(400).send("No recipes found for this category");
    }
    res.send(recipes);
  } catch (err) {
    res.status(500).send({ "Error": err });
  }
};


const addRecipe = async (req, res) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) {
      return res.status(400).send({ error: "Image is required" });
    }

    // חילוץ השדות מהגוף
    const { name, publishDate, categoryCode, preparationTime, ingredients, preparationSteps, finalYield, likes } = req.body;
    console.log('name', name);
    console.log("Received data:", req.body);

    // שמירת נתיב התמונה
    const imagePath = `/uploads/${req.file.filename}`;
    // יצירת מתכון חדש עם הנתונים שהתקבלו
    const newRecipe = new Recipes({
      image: imagePath,
      publishDate: publishDate || Date.now(),
      categoryCode,
      preparationTime: parseInt(preparationTime), // המרה למספר
      ingredients: JSON.parse(ingredients),  // המרת JSON למערך
      preparationSteps: JSON.parse(preparationSteps),
      name: name,
      finalYield,
      likes: parseInt(likes) || 0
    });
    console.log('new-recipe', newRecipe);

    await newRecipe.save();
    res.status(201).send({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


// מוחק מתכון לפי ID
const deleteRecipe = (req, res) => {
  Recipes.findByIdAndDelete(req.params.id)
    .then(recipe => {
      if (recipe) {
        res.send({ "Recipe deleted": recipe });
      } else {
        res.status(400).send("Recipe not found");
      }
    })
    .catch(err => res.status(500).send({ "Error": err }));
};

// מעדכן מתכון
const updateRecipe = async (req, res) => {
  try {
    const selectedRecipe = await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!selectedRecipe) {
      return res.status(400).send("Recipe not found");
    }
    res.send(selectedRecipe);
  } catch (err) {
    res.status(500).send({ "Error": err });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipeByCategoryId,
  upload
};
