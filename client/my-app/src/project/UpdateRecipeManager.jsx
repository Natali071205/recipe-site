import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const UpdateRecipeManager = ({ recipeId }) => {
  const [recipeData, setRecipeData] = useState({});
  const [image, setImage] = useState(null);
  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState("");

 
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.put(`http://localhost:3000/recipes/${recipeId}`);
        if (response.status === 200) {
          setRecipeData(response.data);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        alert("שגיאה בטעינת המתכון.");
      }
    };

    fetchRecipe();
  }, [recipeId]);

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
      setRecipeData((prev) => ({
        ...prev,
        ingredients: [...(prev.ingredients || []), ingredientInput.trim()],
      }));
      setIngredientInput("");
    }
  };

  const removeIngredient = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const addStep = () => {
    if (stepInput.trim()) {
      setRecipeData((prev) => ({
        ...prev,
        preparationSteps: [...(prev.preparationSteps || []), stepInput.trim()],
      }));
      setStepInput("");
    }
  };

  const removeStep = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      preparationSteps: prev.preparationSteps.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("image", image);

 
    Object.keys(recipeData).forEach((key) => {
      if (recipeData[key] !== null && recipeData[key] !== undefined) {
        formData.append(key, Array.isArray(recipeData[key]) ? JSON.stringify(recipeData[key]) : recipeData[key]);
      }
    });

    try {
      const response = await axios.put(`http://localhost:3000/recipes/${recipeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("המתכון עודכן בהצלחה!");
      } else {
        alert("עדכון המתכון נכשל.");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("אירעה שגיאה במהלך עדכון המתכון.");
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
        mt: 5, 
      }}
    >
      <Typography variant="h4" gutterBottom>
        עדכון מתכון
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="תאריך פרסום"
          type="date"
          name="publishDate"
          value={recipeData.publishDate || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="קוד קטגוריה"
          name="categoryCode"
          value={recipeData.categoryCode || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="זמן הכנה (בדקות)"
          type="number"
          name="preparationTime"
          value={recipeData.preparationTime || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="תפוקה סופית"
          name="finalYield"
          value={recipeData.finalYield || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="לייקים"
          type="number"
          name="likes"
          value={recipeData.likes || ""}
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
          {(recipeData.ingredients || []).map((ing, index) => (
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
          {(recipeData.preparationSteps || []).map((step, index) => (
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
          עדכן מתכון
        </Button>
      </form>
    </Box>
  );
};

export default UpdateRecipeManager;
