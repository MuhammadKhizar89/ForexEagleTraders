import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import Portfolio from './Components/Portfolio';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Banner from './Components/Banner';
import Work from './Components/Work';
import Admin from './Components/Admin';
import CourseDetails from './Components/CourseDetails';
import MentorInfo from './Components/MentorInfo';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route path="/courses" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} /> 
        <Route exact path="/banner" element={<Banner />} /> 
        <Route exact path="/myinfo" element={<Work />} /> 
        <Route exact path="/admin" element={<Admin />} /> 
        <Route exact path="/coursedetails" element={<CourseDetails/>} /> 
        <Route exact path="/mentor-info" element={<MentorInfo/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
