import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import Terms from "./components/Terms";
import Home from "./components/Home";

function App() {
  return (
    <ParallaxProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/terms' element={<Terms />} />
        </Routes>
      </Router>
    </ParallaxProvider>
  )
}

export default App
