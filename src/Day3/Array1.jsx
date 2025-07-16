import React from 'react';

export default function Array() {
  const continents = [
    { name: "Asia", description: "The largest continent by both area and population. Home to diverse cultures, languages, and economies." },
    { name: "Africa", description: "Known for its rich natural resources and diverse wildlife. Second-largest continent by land area." },
    { name: "North America", description: "Includes Canada, the United States, Mexico, and Central American countries." },
    { name: "South America", description: "Famous for the Amazon rainforest and Andes mountains. Rich in culture and biodiversity." },
    { name: "Antarctica", description: "A polar continent covered in ice. The coldest place on Earth and mostly uninhabited." },
    { name: "Europe", description: "A continent rich in history and modern development. Includes countries like France, Germany, and Italy." },
    { name: "Australia", description: "The smallest continent and a country. Known for its unique wildlife and landscapes." }
  ];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>🌍 Continents of the World</h2>
      <ul style={listStyle}>
        {continents.map((continent, index) => (
          <li key={index} style={itemStyle}>
            <strong>{continent.name}</strong><br />
            <span>{continent.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✨ Inline Styles
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
  color: '#00bcd4',
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
