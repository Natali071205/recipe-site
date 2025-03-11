import logo from './logo.svg';
import './App.css';
import { dividerClasses } from '@mui/material';
import NavBar from './project/NavBar';
import Home from './project/Home';
import About from './project/About';
import LogIn from './project/user/LogIn';
import SingUp from './project/user/SingUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddRecipeForm from './project/manager/AddRecipeForm';
import AddRecipeMeneger from './project/manager/AddRecipeMeneger';
import RoutesComponent from './project/RoutesComponent';
import { UserProvider } from './project/Context';


// .gitignore

function App() {
  return (

    <UserProvider>
      <RoutesComponent />
    </UserProvider>


  );
}

export default App;
