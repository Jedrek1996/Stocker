"use client";
import React from "react";
import Lottie from "lottie-react";
import LandingAnimation from "@/public/animations/LandingAnimation.json";

const LottieAnimations = () => {
  return (
    <div>
      {" "}
      <Lottie
        animationData={LandingAnimation}
        loop={true}
        className="w-full h-full max-w-md"
      />
    </div>
  );
};

export default LottieAnimations;
