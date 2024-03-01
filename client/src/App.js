import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'
import './App.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Registration from './components/Registration/Registration';

function App() {
  return (
    <>
    <NavBar> </NavBar>
      <BrowserRouter>
        <Routes>
          {/* Define routes */}
          <Route exact path="/" element={<ErrorPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* <Route path="/contact" element={<Contact/>} /> */}
          {/* Not found route - should be at the end */}
          <Route element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
