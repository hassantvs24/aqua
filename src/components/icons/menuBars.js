import React from "react";

export default function MenuBars(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="21"
      viewBox="0 0 25 21" 
      {...props}
    >
      <g fill="#fff" transform="translate(-65 -38)">
        <rect width="25" height="3" rx="1" transform="translate(65 38)" />
        <rect width="25" height="3" rx="1" transform="translate(65 56)" />
        <rect width="25" height="3" rx="1" transform="translate(65 47)" />
      </g>
    </svg>
  );
}