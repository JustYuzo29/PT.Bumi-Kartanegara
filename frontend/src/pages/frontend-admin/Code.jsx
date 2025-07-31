// src/pages/Code.jsx
import React from "react";
import CodeCard from "../../components/frontend-admin/code/CodeCard";
const Code = () => {
  const codeSections = [
    { title: "ADMIN SITE", buttonText: "CODE ADMIN", fileKey: "admin" },
    { title: "STAFF SITE", buttonText: "CODE STAFF", fileKey: "staff" },
    { title: "BLOG SITE", buttonText: "CODE BLOG SITE", fileKey: "blog" },
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
