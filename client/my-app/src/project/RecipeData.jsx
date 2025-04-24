// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container, Typography, Box, CardMedia, Paper,
//   List, ListItem, ListItemText, TextField, IconButton,
//   Grid, Divider, Card, CardContent, CardActionArea, Button
// } from '@mui/material';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import PrintIcon from '@mui/icons-material/Print';
// import { UserContext } from './Context';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const RecipeData = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [rsponse, setRsponse] = useState(null);
//   const [newResponse, setNewResponse] = useState('');
//   const [showInput, setShowInput] = useState(false);
//   const [relatedRecipes, setRelatedRecipes] = useState([]);
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     axios.get(`http://localhost:3000/recipes/${id}`)
//       .then(response => {
//         setRecipe(response.data);
//         document.title = response.data.name;
//         return axios.get(`http://localhost:3000/recipes/category/${response.data.categoryCode}`);
//       })
//       .then(res => {
//         setRelatedRecipes(res.data.filter(r => r._id !== id));
//       })
//       .catch(err => console.error(err));

//     axios.get(`http://localhost:3000/response/${id}`)
//       .then(response => setRsponse(response.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   const addResponse = () => {
//     const responseData = {
//       userCode: user._id,
//       content: newResponse,
//       recipeId: id,
//       publishDate: new Date()
//     };

//     axios.post(`http://localhost:3000/response`, responseData)
//       .then(response => {
//         setRsponse(prev => [...prev, response.data]);
//         setNewResponse('');
//         setShowInput(false);
//       })
//       .catch(err => console.error(err));
//   };

//   const handlePrint = () => {
//     const input = document.getElementById('recipe-section');
//     html2canvas(input).then(canvas => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${recipe.name}.pdf`);
//     });
//   };

//   if (!recipe || !rsponse) return <div>טוען...</div>;

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4 }}>
//       <Grid container spacing={4}>
//         {/* Right Side - Recipe Details */}
//         <Grid item xs={12} md={8}>
//           <Box id="recipe-section">
//             <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image={`http://localhost:3000${recipe.image}`}
//                 alt={recipe.name}
//                 sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, objectFit: 'cover' }}
//               />
//               <CardContent>
//                 <Typography variant="h4" fontWeight="bold" gutterBottom>{recipe.name}</Typography>

//                 <Divider sx={{ my: 2 }} />

//                 <Typography variant="h6" fontWeight="bold">מצרכים</Typography>
//                 <List>
//                   {recipe.ingredients.map((ingredient, index) => (
//                     <ListItem key={index} disablePadding>
//                       <ListItemText primary={ingredient} />
//                     </ListItem>
//                   ))}
//                 </List>

//                 <Divider sx={{ my: 2 }} />

//                 <Typography variant="h6" fontWeight="bold">אופן ההכנה</Typography>
//                 <List>
//                   {recipe.preparationSteps.map((step, index) => (
//                     <ListItem key={index}>
//                       <ListItemText primary={`${index + 1}. ${step}`} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </CardContent>
//             </Card>
//           </Box>
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//             <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
//               הדפס מתכון
//             </Button>
//           </Box>
//         </Grid>

//         {/* Left Side - Comments and Related */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 3 }}>
//             <Typography variant="h6" gutterBottom>תגובות על המתכון</Typography>
//             <List>
//               {rsponse.map((response, index) => (
//                 <ListItem key={index}>
//                   <ListItemText
//                     primary={response.content}
//                     secondary={`מאת: ${response?.userCode?.username || 'אנונימי'} | ${new Date(response.publishDate).toLocaleDateString('he-IL')}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>

//             {user && (
//               <Box sx={{ mt: 2 }}>
//                 {showInput && (
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     label="הוסף תגובה"
//                     value={newResponse}
//                     onChange={(e) => setNewResponse(e.target.value)}
//                     sx={{ mb: 1 }}
//                   />
//                 )}
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <IconButton onClick={() => setShowInput(!showInput)}>
//                     <BorderColorIcon />
//                   </IconButton>
//                   {showInput && (
//                     <IconButton onClick={addResponse}>
//                       <Typography>שלח</Typography>
//                     </IconButton>
//                   )}
//                 </Box>
//               </Box>
//             )}
//           </Paper>

//           <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//             <Typography variant="h6" gutterBottom>עוד מתכונים דומים</Typography>
//             <Grid container spacing={2}>
//               {relatedRecipes.slice(0, 3).map((item) => (
//                 <Grid item xs={12} key={item._id}>
//                   <Card sx={{ display: 'flex' }}>
//                     <CardActionArea href={`/recipe/${item._id}`} sx={{ display: 'flex' }}>
//                       <CardMedia
//                         component="img"
//                         image={`http://localhost:3000${item.image}`}
//                         alt={item.name}
//                         sx={{ width: 100, objectFit: 'cover' }}
//                       />
//                       <CardContent>
//                         <Typography>{item.name}</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default RecipeData;



// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container, Typography, Box, CardMedia, Paper,
//   List, ListItem, ListItemText, TextField, IconButton,
//   Grid, Divider, Card, CardContent, CardActionArea
// } from '@mui/material';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { UserContext } from './Context';

// const RecipeData = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [rsponse, setRsponse] = useState(null);
//   const [newResponse, setNewResponse] = useState('');
//   const [showInput, setShowInput] = useState(false);
//   const [relatedRecipes, setRelatedRecipes] = useState([]);
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     axios.get(`http://localhost:3000/recipes/${id}`)
//       .then(response => {
//         setRecipe(response.data);
//         return axios.get(`http://localhost:3000/recipes/category/${response.data.categoryCode}`);
//       })
//       .then(res => {
//         setRelatedRecipes(res.data.filter(r => r._id !== id));
//       })
//       .catch(err => console.error(err));

//     axios.get(`http://localhost:3000/response/${id}`)
//       .then(response => setRsponse(response.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   const addResponse = () => {
//     const responseData = {
//       userCode: user._id,
//       content: newResponse,
//       recipeId: id,
//       publishDate: new Date()
//     };

//     axios.post(`http://localhost:3000/response`, responseData)
//       .then(response => {
//         setRsponse(prev => [...prev, response.data]);
//         setNewResponse('');
//         setShowInput(false);
//       })
//       .catch(err => console.error(err));
//   };

//   if (!recipe || !rsponse) return <div>טוען...</div>;

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4 }}>
//       <Grid container spacing={4}>
//         {/* Right Side - Recipe Details */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
//             <CardMedia
//               component="img"
//               height="300"
//               image={`http://localhost:3000${recipe.image}`}
//               alt={recipe.name}
//               sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, objectFit: 'cover' }}
//             />
//             <CardContent>
//               <Typography variant="h4" fontWeight="bold" gutterBottom>{recipe.name}</Typography>

//               <Divider sx={{ my: 2 }} />

//               <Typography variant="h6" fontWeight="bold">מצרכים</Typography>
//               <List>
//                 {recipe.ingredients.map((ingredient, index) => (
//                   <ListItem key={index} disablePadding>
//                     <ListItemText primary={ingredient} />
//                   </ListItem>
//                 ))}
//               </List>

//               <Divider sx={{ my: 2 }} />

//               <Typography variant="h6" fontWeight="bold">אופן ההכנה</Typography>
//               <List>
//                 {recipe.preparationSteps.map((step, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={`${index + 1}. ${step}`} />
//                   </ListItem>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Left Side - Comments and Related */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 3 }}>
//             <Typography variant="h6" gutterBottom>תגובות על המתכון</Typography>
//             <List>
//               {rsponse.map((response, index) => (
//                 <ListItem key={index}>
//                   <ListItemText
//                     primary={response.content}
//                     secondary={`מאת: ${response?.userCode?.username || 'אנונימי'} | ${new Date(response.publishDate).toLocaleDateString('he-IL')}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>

//             {user && (
//               <Box sx={{ mt: 2 }}>
//                 {showInput && (
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     label="הוסף תגובה"
//                     value={newResponse}
//                     onChange={(e) => setNewResponse(e.target.value)}
//                     sx={{ mb: 1 }}
//                   />
//                 )}
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <IconButton onClick={() => setShowInput(!showInput)}>
//                     <BorderColorIcon />
//                   </IconButton>
//                   {showInput && (
//                     <IconButton onClick={addResponse}>
//                       <Typography>שלח</Typography>
//                     </IconButton>
//                   )}
//                 </Box>
//               </Box>
//             )}
//           </Paper>

//           <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//             <Typography variant="h6" gutterBottom>עוד מתכונים דומים</Typography>
//             <Grid container spacing={2}>
//               {relatedRecipes.slice(0, 3).map((item) => (
//                 <Grid item xs={12} key={item._id}>
//                   <Card sx={{ display: 'flex' }}>
//                     <CardActionArea href={`/recipe/${item._id}`} sx={{ display: 'flex' }}>
//                       <CardMedia
//                         component="img"
//                         image={`http://localhost:3000${item.image}`}
//                         alt={item.name}
//                         sx={{ width: 100, objectFit: 'cover' }}
//                       />
//                       <CardContent>
//                         <Typography>{item.name}</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default RecipeData;



import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, CardMedia, Paper, List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserContext } from './Context';

const RecipeData = () => {
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
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: '"Varela Round", sans-serif',
                          direction: "rtl",
                          fontWeight: 'bold',
                          display: 'inline-block',
                          marginBottom: 1,
                        }}
                      >
                        {response.content}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#555' }}>
                        <Typography sx={{ fontFamily: '"Varela Round", sans-serif' }}>
                          {response?.userCode?.username}
                        </Typography>
                        <Typography sx={{ fontFamily: '"Varela Round", sans-serif' }}>
                          {new Date(response.publishDate).toLocaleDateString('he-IL')}
                        </Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
            ))}

            {user && (
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
              </Box>
            )}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default RecipeData;
