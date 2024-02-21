import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignupComponent from './components/SignupComponent';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          {/* localhost:3000 */}
          <Route path='/signup' element={<SignupComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
//    <signupComponent/>
