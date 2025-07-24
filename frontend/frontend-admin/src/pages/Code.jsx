// src/pages/Code.jsx
import React from "react";
import CodeCard from "../components/code/CodeCard";

const Code = () => {
  const codeSections = [
    { title: "ADMIN SITE", buttonText: "CODE ADMIN" },
    { title: "STAFF SITE", buttonText: "CODE STAFF" },
    { title: "BLOG SITE", buttonText: "CODE BLOG SITE" },
  ];

  return (
    <div className="space-y-10">
      {codeSections.map((section, i) => (
        <CodeCard key={i} {...section} />
      ))}
    </div>
  );
};

export default Code;
