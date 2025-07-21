import './App.css'
import { BrowserRouter, Routes, Route, useLocation, matchPath } from "react-router-dom"
import Homepage from './Components/Homepage/index.jsx'
import Navbar from './Components/Navbar/index.jsx'
import Footer from './Components/Footer/index.jsx'
import AboutUs from './Components/AboutUs/index.jsx'
import Support from './Components/Support/index.jsx'
import NotFound from './Components/NotFound.jsx'

function AppRoutes() {

  const location = useLocation();
  const validPaths = ['/', '/aboutus', '/support'];
  const isValidPath = validPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );



  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/support' element={<Support />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    {isValidPath && <Footer />}

    </>
  );
}


function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
