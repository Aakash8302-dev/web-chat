import { BrowserRouter as Router, HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeScreen />} exact />
        <Route path='/auth' element={<AuthScreen />} exact />
      </Routes>
    </Router>
  );
}

export default App;
