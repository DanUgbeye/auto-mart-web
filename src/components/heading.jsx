import React from "react";

const Heading = ({ heading, supportText, extraStyle, headingStyle, supportTextStyle, children }) => {
  return (
    <div className={` w-full ${extraStyle} `}>
      <h2 className={` mb-4 ${headingStyle}`}>{heading}</h2>
      <p className={` text-lg ${supportTextStyle} `}>{supportText}</p>
      {children}
    </div>
  );
};

export default Heading;
