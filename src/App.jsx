import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash"; 
import Home from "./pages/Home";
import Result from "./pages/Result";

export default function App() {
  const [showSplash, setShowSplash] = useState(true); 
  const [fadeSplash, setFadeSplash] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeSplash(true);
    }, 2000);
    const unmountTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            showSplash ? (
              <Splash fadeOut={fadeSplash} />
            ) : (
              <Home fadeIn={true} />
            )
          }
        />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
