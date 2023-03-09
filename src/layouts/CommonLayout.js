import React from "react";
import MyNavBar from "../components/common/MyNavBar";

const CommonLayout = ({ children }) => {
  return (
    <div>
      <MyNavBar />
      {children}
    </div>
  );
};

export default CommonLayout;
