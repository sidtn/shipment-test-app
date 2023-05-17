import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRourer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
