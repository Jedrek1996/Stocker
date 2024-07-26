import React from "react";
import Link from "next/link";
import LottieAnimations from "@/components/lottie/LottieAnimations";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      <div className="hero flex-1 flex items-center justify-center">
        <div className="text-center md:text-left max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-4">Stocker</h1>
          <p className="py-6 text-lg leading-loose text-gray-700">
            Stocker: Stalk your stocks! 💹
          </p>
          <Link href="/stocks" className="btn btn-secondary btn-lg">
            Get Started!
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <LottieAnimations />
      </div>
    </div>
  );
};

export default HomePage;
