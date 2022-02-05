import React from "react";
import Image from "next/image";

const LandingLayout: React.FC = ({ children }) => {
  return (
    <div
      style={{ backgroundImage: `url("/bg.png")` }}
      className="min-h-screen w-screen bg-black bg-cover bg-center"
    >
      <div className="min-h-screen w-screen bg-black/50">
        <div className="mx-auto w-[calc(100%-20px)] lg:w-[calc(100%-100px)]">
          <div className="flex justify-center lg:justify-start">
            <div className="pt-6">
              <div className="relative h-16 w-40">
                <Image
                  src="/logo.png"
                  priority={true}
                  layout="fill"
                  alt="Almost Netflix Logo"
                />
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
