import React, { useState } from "react";
import "../css/landing-page.css";
import Header from "../components/Header";
import Home from "../components/Home";
import Features from "../components/Features";
import TipsHemat from "../components/TipsHemat";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginOverlay from "../components/LoginOverlay";
import SignUpOverlay from "../components/SignUpOverlay";

const LandingPage = () => {
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showSignUpOverlay, setShowSignUpOverlay] = useState(false);

  const handleLoginClick = () => {
    setShowLoginOverlay(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowLoginOverlay(false);
    setShowSignUpOverlay(false);
  };

  const handleShowSignUp = () => {
    setShowLoginOverlay(false);
    setShowSignUpOverlay(true);
  };

  const handleShowLogin = () => {
    setShowSignUpOverlay(false);
    setShowLoginOverlay(true);
  };

  return (
    <React.StrictMode>
      <Header
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
      />
      <Home />
      <Features />
      <TipsHemat />
      <FAQ />
      <Footer />
      <LoginOverlay
        show={showLoginOverlay}
        onClose={handleCloseOverlay}
        onRegister={handleShowSignUp}
      />
      <SignUpOverlay
        show={showSignUpOverlay}
        onClose={handleCloseOverlay}
        onLogin={handleShowLogin}
      />
    </React.StrictMode>
  );
};

export default LandingPage;
