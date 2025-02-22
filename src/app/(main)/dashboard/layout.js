import React, { Suspense } from "react";
import { HashLoader } from "react-spinners";

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-center mb-5">
        <h1 className="font-bold gradient-title text-6xl font-poppins">
          Industry Insights
        </h1>
      </div>
      <Suspense
        fallback={<HashLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
