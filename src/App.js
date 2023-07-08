import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewList from "./Components/Pages/NewList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
