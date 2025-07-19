import React from "react";

const MicrosoftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="1" y="1" width="10" height="10" fill="#F35325" />
    <rect x="13" y="1" width="10" height="10" fill="#81BC06" />
    <rect x="1" y="13" width="10" height="10" fill="#05A6F0" />
    <rect x="13" y="13" width="10" height="10" fill="#FFBA08" />
  </svg>
);

export default MicrosoftIcon;
