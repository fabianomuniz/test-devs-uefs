import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import UsuarioLista from "./pages/usuario";
import PostLista from "./pages/post";
import Tag from "./pages/tag";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mt-4">Painel CRUD API</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/usuario">Usuário</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/post">Post</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tag">Tag</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/usuario" element={<UsuarioLista />} />
        <Route path="/post" element={<PostLista />} />
        <Route path="/tag" element={<Tag />} />
      </Routes>
    </div>
  );
}

export default App;