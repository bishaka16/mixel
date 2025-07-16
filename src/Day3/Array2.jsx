import React from 'react';

export default function Ocean() {
  const oceans = [
    {
      name: "Pacific Ocean",
      description:
        "The largest and deepest ocean on Earth, covering more than 30% of the planet's surface. It lies between Asia and the Americas."
    },
    {
      name: "Atlantic Ocean",
      description:
        "The second-largest ocean, separating the Americas from Europe and Africa. Known for the Gulf Stream and historical trade routes."
    },
    {
      name: "Indian Ocean",
      description:
        "The third-largest ocean, bordered by Africa, Asia, and Australia. Important for trade and monsoon systems."
    },
    {
      name: "Southern Ocean",
      description:
        "Encircles Antarctica and is the newest recognized ocean. Known for strong currents and icy conditions."
    },
    {
      name: "Arctic Ocean",
      description:
        "The smallest and shallowest ocean, located around the North Pole. Covered in sea ice much of the year."
    }
  ];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>🌊 Oceans of the World</h2>
      <ul style={listStyle}>
        {oceans.map((ocean, index) => (
          <li key={index} style={itemStyle}>
            <strong>{ocean.name}</strong>
            <br />
            <span>{ocean.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Styles
const containerStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
  maxWidth: '700px',
  width: '100%',
  margin: '30px auto',
  fontFamily: 'Segoe UI, sans-serif',
  color: '#333',
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#0077be',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const itemStyle = {
  padding: '12px 0',
  borderBottom: '1px solid #e0e0e0',
  lineHeight: '1.6',
};
