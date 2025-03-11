import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, CardMedia, Paper, List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserContext } from './Context';

const OneCategory = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rsponse, setRsponse] = useState(null);
  const [newResponse, setNewResponse] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(err => {
        console.error("Error fetching recipe:", err);
      });

    axios.get(`http://localhost:3000/response/${id}`)
      .then(response => {
        setRsponse(response.data);
      })
      .catch(err => {
        console.error("Error fetching responses:", err);
      });
  }, [id]);

  const addResponse = () => {
    const responseData = {
      userCode: user._id,
      content: newResponse,
      recipeId: id,
      publishDate: new Date()
    };

    axios.post(`http://localhost:3000/response`, responseData)
      .then(response => {
        setRsponse(prevResponses => [...prevResponses, response.data]);
        setNewResponse('');
        setShowInput(false);
      })
      .catch(err => {
        console.error("Error adding response:", err);
      });
  };

  if (!recipe || !rsponse) {
    return <div>טוען...</div>;
  }

  return (
    <Container sx={{ mt: 4, paddingTop: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 2, fontWeight: 'bold', textDecoration: 'underline', fontFamily: '"Lora", serif' }}>
        {recipe.name}
      </Typography>

      <CardMedia
        component="img"
        image={`http://localhost:3000${recipe.image}`}
        alt={recipe.name}
        sx={{
          width: "100%",
          maxWidth: 500,
          height: 300,
          borderRadius: 2,
          boxShadow: 3,
          objectFit: "cover",
          mx: "auto",
          display: "block"
        }}
      />

      <Box sx={{ mt: 4, borderRadius: 2, padding: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            bgcolor: '#f5f5f5',
            py: 1,
            borderRadius: 1,
            fontFamily: '"Lora", serif',
            borderBottom: '2px solid #dc4337',
            color: 'black'
          }}
        >
          מצרכים
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {recipe.ingredients.map((ingredient, index) => {
            const [amount, name] = ingredient.split(' ', 2);
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: 1,
                  padding: 1,
                  width: '80%',
                  boxShadow: 1,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 3
                  }
                }}
              >
                <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: '#555', marginRight: 1 }}>
                  {amount || '-'}
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: '#555' }}>
                  {name || ingredient}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          bgcolor: '#f5f5f5',
          py: 1,
          borderRadius: 1,
          borderBottom: '2px solid #dc4337',
          fontFamily: '"Lora", serif',
        }}>
          שלבי הכנה
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <List>
            {recipe.preparationSteps.map((step, index) => (
              <ListItem sx={{ textAlign: 'start' }} key={index}>
                <ListItemText primary={` ${step}`} sx={{ fontFamily: '"Varela Round", sans-serif', direction: "rtl" }} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          bgcolor: '#f5f5f5',
          py: 1,
          borderBottom: '2px solid #dc4337',
          borderRadius: 1,
          fontFamily: '"Lora", serif',
        }}>
          תגובות על המתכון
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <List>
            {rsponse.map((response, index) => (
              <ListItem sx={{ textAlign: 'start' }} key={index}>
                <ListItemText primary={` ${response.content} (${response?.userCode?.username})`} sx={{ fontFamily: '"Varela Round", sans-serif', direction: "rtl" }} />
              </ListItem>
            ))}

            {user &&
              <Box sx={{ direction: "rtl", display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                {showInput && (
                  <TextField
                    color='black'
                    label="הוסף תגובה"
                    variant="outlined"
                    fullWidth
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    sx={{ marginRight: 2, direction: "rtl" }}
                  />
                )}
                <IconButton onClick={() => setShowInput(!showInput)} color="black">
                  <BorderColorIcon sx={{ fontSize: 40 }} />
                </IconButton>
                {showInput && (
                  <IconButton onClick={addResponse} color="black">
                    שלח
                  </IconButton>
                )}
              </Box>}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default OneCategory;
