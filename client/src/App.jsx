/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/Auth/SignIn';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';


function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster />

        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/forget-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='/*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
