import React from 'react'

function Logo({width = 280}) {
  return (
      <svg width={width} height="60" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 5)">
      <path
        d="M20 0 C28 10, 32 20, 34 35 L20 50 L6 35 C8 20, 12 10, 20 0 Z"
        fill="#00FFC6"
      />
      <circle cx="20" cy="30" r="3" fill="#0D1117" />
      <line x1="20" y1="15" x2="20" y2="50" stroke="#0D1117" strokeWidth="1.5" />
    </g>
    <text x="70" y="38" fontFamily="JetBrains Mono, monospace" fontSize="32" fill="#FFFFFF">
      Bit<tspan fill="#00FFC6">Scribe</tspan>
    </text>
  </svg>
);

}

export default Logo
