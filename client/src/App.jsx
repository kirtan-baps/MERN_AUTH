/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/Auth/SignIn';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';


function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster />

        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
