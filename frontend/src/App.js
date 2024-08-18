
import './App.css';

import Navbar from './Component/Navbar';
import ProtectedRoute from './Component/ProtectedRoute';
import SingInOutContainer from './container';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/login' element = {
                      <ProtectedRoute>
                        <SingInOutContainer/>
                      </ProtectedRoute>
        } />
        <Route path='/signup' element={
                      <ProtectedRoute>
                        <SingInOutContainer/>
                      </ProtectedRoute>
        } />
        <Route path='/*' element ={ 
                <ProtectedRoute> <Navbar/> </ProtectedRoute>
              }/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
