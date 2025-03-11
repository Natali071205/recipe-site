

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Context';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false); 

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => console.error(err));

    axios.get('http://localhost:3000/recipes/popular')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

 
    const timer = setTimeout(() => {
      if (!user && showDialog == false) {
        setOpenSignupDialog(true);
        setShowDialog(true)
      }

    }, 10000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <div>טוען...</div>;
  }

  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId);
    setOpenDialog(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      axios.delete(`http://localhost:3000/categories/${categoryToDelete}`)
        .then(response => {
          setCategories(categories.filter(category => category._id !== categoryToDelete));
          console.log("Category deleted", response);
        })
        .catch(err => console.error("Error deleting category:", err));
    }
    setOpenDialog(false);
  };

  const cancelDeleteCategory = () => {
    setOpenDialog(false);
  };

  const handleSignupRedirect = () => {
    navigate('/singup'); 
    setOpenSignupDialog(false);
  };

  const handleCloseSignupDialog = () => {
    setOpenSignupDialog(false);
  };

  return (
    <Container sx={{ paddingTop: '86px', zIndex: -1 }}>
      <Typography variant="h3" gutterBottom align="center">
        <Card style={{ position: 'relative', margin: '20px' }}>
          <CardMedia
            component="img"
            height="270"
            image={process.env.PUBLIC_URL + "888-10.jpg"}
            style={{ width: '100%' }}
          />
          <Box
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '50px',
              fontWeight: 'bold',
              padding: '10px',
              zIndex: 1
            }}
          >
            מתכונים שמחממים את הלב
          </Box>
        </Card>
      </Typography>

      <Typography variant="h4" gutterBottom style={{ textAlign: "center", position: "relative" }}>
        <div
          style={{
            backgroundColor: "black", height: "1px",
            width: "100%", position: 'absolute', top: '23px',
            zIndex: '-1',
            backgroundColor: 'black',
            height: '1px',
          }}></div>
        <p style={{
          paddingRight: "18px",
          paddingLeft: "18px",
          margin: "auto",
          width: "fit-content",
          backgroundColor: "white"
        }}>קטגוריות</p>
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {categories.map(category => (
          <Grid item xs={12} sm={6} md={6} key={category._id}>
            <Card
              sx={{ boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
              onClick={() => navigate('/category-recipe', {
                state: {
                  categoryId: category._id,
                  categoryName: category.name
                }
              })}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'auto',
                position: 'relative',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000${category.image}`}
                alt={category.name}
              />
              <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                  {category.name}
                </Typography>
              </CardContent>

              {user && user.isAdmin && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category._id);
                  }}
                  sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    color: 'black'
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ textAlign: "center", position: "relative" }}>
        <div
          style={{
            backgroundColor: "black", height: "1px",
            width: "100%", position: 'absolute', top: '48px',
            zIndex: '-1',
            backgroundColor: 'black',
            height: '1px',
          }}></div>
        <p style={{
          position: 'relative',
          top: '24px',
          paddingRight: "18px",
          paddingLeft: "18px",
          margin: "auto",
          width: "fit-content",
          backgroundColor: "white"
        }}>מתכונים פופולרים</p>
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={6} key={recipe._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000${recipe.image}`}
                alt={recipe.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {recipe.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* דיאלוג ההרשמה */}
      <BootstrapDialog
        onClose={handleCloseSignupDialog}
        aria-labelledby="customized-dialog-title"
        open={openSignupDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {"רוצה לקבל עדכונים?"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseSignupDialog}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            אם אתה רוצה לקבל עדכונים על מתכונים חדשים והנחות, לחץ על כפתור ההרשמה.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSignupRedirect}>
            הרשמה
          </Button>
          <Button onClick={handleCloseSignupDialog}>
            סגור
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* דיאלוג מחיקת קטגוריה */}
      <Dialog
        open={openDialog}
        onClose={cancelDeleteCategory}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: 'rtl' }}
      >
        <DialogTitle id="alert-dialog-title">
          {"האם אתה בטוח שברצונך למחוק את הקטגוריה?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            פעולה זו תסיר את הקטגוריה לצמיתות. האם אתה בטוח שברצונך להמשיך?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCategory}>לא למחוק</Button>
          <Button onClick={confirmDeleteCategory} autoFocus>
            למחוק
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;

