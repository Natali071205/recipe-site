import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const AddCategoryManager = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryData.name || !image) {
      alert("נא למלא את כל השדות הנדרשים!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", categoryData.name);

    try {
      const response = await axios.post("http://localhost:3000/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("הקטגוריה נוספה בהצלחה!");
        setCategoryData({ name: "" });
        setImage(null);
        navigate("/categories"); // מפנה לעמוד של הקטגוריות לאחר הוספה
      } else {
        alert("הוספת הקטגוריה נכשלה.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("אירעה שגיאה במהלך הוספת הקטגוריה.");
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
        הוספת קטגוריה חדשה
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="שם קטגוריה"
          name="name"
          value={categoryData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="תמונה של הקטגוריה"
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={handleImageChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          הוסף קטגוריה
        </Button>
      </form>
    </Box>
  );
};

export default AddCategoryManager;
