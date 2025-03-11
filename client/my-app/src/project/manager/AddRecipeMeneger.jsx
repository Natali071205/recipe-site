

import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const AddRecipeManager = () => {
  const [recipeData, setRecipeData] = useState({
    publishDate: "",
    categoryCode: "",
    preparationTime: "",
    ingredients: [],
    preparationSteps: [],
    finalYield: "",
    likes: "",
  });

  const [image, setImage] = useState(null);
  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState("");

  const handleChange = (e) => {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setRecipeData({
        ...recipeData,
        ingredients: [...recipeData.ingredients, ingredientInput.trim()],
      });
      setIngredientInput("");
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = recipeData.ingredients.filter((_, i) => i !== index);
    setRecipeData({ ...recipeData, ingredients: newIngredients });
  };

  const addStep = () => {
    if (stepInput.trim()) {
      setRecipeData({
        ...recipeData,
        preparationSteps: [...recipeData.preparationSteps, stepInput.trim()],
      });
      setStepInput("");
    }
  };

  const removeStep = (index) => {
    const newSteps = recipeData.preparationSteps.filter((_, i) => i !== index);
    setRecipeData({ ...recipeData, preparationSteps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeData.publishDate || !recipeData.categoryCode || !recipeData.preparationTime || !recipeData.finalYield || !recipeData.likes) {
      alert("נא למלא את כל השדות הנדרשים!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("publishDate", recipeData.publishDate);
    formData.append("categoryCode", recipeData.categoryCode);
    formData.append("preparationTime", recipeData.preparationTime);
    formData.append("ingredients", JSON.stringify(recipeData.ingredients));
    formData.append("preparationSteps", JSON.stringify(recipeData.preparationSteps));
    formData.append("finalYield", recipeData.finalYield);
    formData.append("likes", recipeData.likes);

    try {
      const response = await axios.post("http://localhost:3000/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("המתכון נוסף בהצלחה!");
        setRecipeData({
          publishDate: "",
          categoryCode: "",
          preparationTime: "",
          ingredients: [],
          preparationSteps: [],
          finalYield: "",
          likes: "",
        });
        setImage(null);
      } else {
        alert("הוספת המתכון נכשלה.");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("אירעה שגיאה במהלך הוספת המתכון.");
    }
  };

  const handleKeyDown = (e, addFunction) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFunction();
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        mx: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        mt: 5, // מוסיף מרווח עליון
      }}
    >
      <Typography variant="h4" gutterBottom>
        הוספת מתכון חדש
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="תאריך פרסום"
          type="date"
          name="publishDate"
          value={recipeData.publishDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="קוד קטגוריה"
          name="categoryCode"
          value={recipeData.categoryCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="זמן הכנה (בדקות)"
          type="number"
          name="preparationTime"
          value={recipeData.preparationTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="תפוקה סופית"
          name="finalYield"
          value={recipeData.finalYield}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="לייקים"
          type="number"
          name="likes"
          value={recipeData.likes}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="הוסף מרכיב"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, addIngredient)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={addIngredient} sx={{ mb: 2 }}>
          הוסף מרכיב
        </Button>
        <List>
          {recipeData.ingredients.map((ing, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" onClick={() => removeIngredient(index)}>
                <DeleteIcon />
              </IconButton>
            }>
              {ing}
            </ListItem>
          ))}
        </List>
        <TextField
          label="הוסף שלב הכנה"
          value={stepInput}
          onChange={(e) => setStepInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, addStep)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={addStep} sx={{ mb: 2 }}>
          הוסף שלב
        </Button>
        <List>
          {recipeData.preparationSteps.map((step, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" onClick={() => removeStep(index)}>
                <DeleteIcon />
              </IconButton>
            }>
              {step}
            </ListItem>
          ))}
        </List>
        <TextField
          label="תמונה של המתכון"
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={handleImageChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          הוסף מתכון
        </Button>
      </form>
    </Box>
  );
};

export default AddRecipeManager;
