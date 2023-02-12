import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './views/LandingPage'
import ClimateProfile from './views/ClimateProfile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />}></Route>
          <Route exact path='/companyprofile' element={<ClimateProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
