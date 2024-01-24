import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import SignUpPage from './Pages/SignUpPage';
import PrivateRoute from './Pages/PrivateRoute';
import ChangePassword from './Pages/ChangePassword';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import CheckOtp from './Pages/CheckOtp';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/register' element={<SignUpPage/>} />
      <Route path='/forgotPassword' element={<ForgotPassword/>} />
      <Route path='/checkOtp' element={<CheckOtp/>} />
      <Route path='/resetPassword' element={<ResetPassword/>} />
      
      <Route path='/user' element={<PrivateRoute/>}>
         <Route path='dashboard' element={<Dashboard/>} />
         <Route path='changePassword' element={<ChangePassword/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
