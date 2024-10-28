import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import NavBar from "./components/nav/NavBar";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Forbiden from "./pages/Forbiden";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/">
        
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute />}></Route>

          {/* Authorized routes */}
          <Route></Route>

          {/* Error routes */}
          <Route path="forbiden" element={<Forbiden />} />
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
