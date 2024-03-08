import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'
import './App.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Registration from './components/Registration/Registration';
import { AuthProvider } from './util/AuthContext';
import Dashboard from './components/Dashboard/Dashboard';
import Separator from './components/Separator/Separator';

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar> </NavBar>
        <Separator />
        <BrowserRouter>
          <Routes>
            {/* Define routes */}
            <Route exact path="/" element={<ErrorPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            {/* <Route path="/contact" element={<Contact/>} /> */}
            {/* Not found route - should be at the end */}
            <Route element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
