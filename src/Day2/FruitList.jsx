import React, { useState } from 'react';

export default function FruitList() {
  const defaultFruits = [
    { name: "Apple", emoji: "🍎", description: "Apples are sweet, edible fruits produced by apple trees. Rich in fiber and vitamin C." },
    { name: "Banana", emoji: "🍌", description: "Bananas are elongated, edible fruits that are high in potassium and energy." },
    { name: "Mango", emoji: "🥭", description: "Mangoes are tropical stone fruits, juicy and rich in vitamins A and C." },
    { name: "Grapes", emoji: "🍇", description: "Grapes are small berries used to make wine, juice, and snacks. High in antioxidants." },
    { name: "Orange", emoji: "🍊", description: "Oranges are citrus fruits known for their vitamin C content and refreshing taste." }
  ];

  const [fruits, setFruits] = useState(defaultFruits);
  const [newFruit, setNewFruit] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedFruit, setSelectedFruit] = useState(null);

  const emojiMap = {
    apple: "🍎",
    banana: "🍌",
    mango: "🥭",
    grapes: "🍇",
    orange: "🍊",
    watermelon: "🍉",
    lemon: "🍋",
    strawberry: "🍓",
    kiwi: "🥝",
    peach: "🍑"
  };

  const handleAddFruit = () => {
  const trimmedName = newFruit.trim();
  const trimmedDesc = newDescription.trim();

  if (trimmedName === "") return;

  // 🔒 Duplicate Check
  const alreadyExists = fruits.some(
    fruit => fruit.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (alreadyExists) {
    alert("This fruit already exists in the list!");
    return;
  }

  const lower = trimmedName.toLowerCase();
  const emoji = emojiMap[lower] || "🍍";

  setFruits([
    ...fruits,
    {
      name: trimmedName,
      emoji,
      description: trimmedDesc || "No description provided.",
      userAdded: true
    }
  ]);

  // Clear fields
  setNewFruit("");
  setNewDescription("");
};


  const handleClearUserFruits = () => {
    setFruits(fruits.filter(fruit => !fruit.userAdded));
    setSelectedFruit(null);
  };

  const handleFruitClick = (fruit) => {
    setSelectedFruit(fruit);
  };

  return (
    <div style={{
  textAlign: 'center',
  marginTop: '30px',
  padding: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%'
}}>

      <h2 style={{ marginBottom: '20px', color: '#333' }}>🍓 Fruit List</h2>

     {/* Input Section */}
<div style={{ marginBottom: '30px' }}>
  <input
    type="text"
    value={newFruit}
    onChange={(e) => setNewFruit(e.target.value)}
    placeholder="Fruit name"
    style={{
      padding: "10px",
      width: "220px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginRight: "10px",
      marginBottom: "10px"  // add space below
    }}
  />
  <input
    type="text"
    value={newDescription}
    onChange={(e) => setNewDescription(e.target.value)}
    placeholder="Fruit description"
    style={{
      padding: "10px",
      width: "300px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc"
    }}
  />

  <div style={{ marginTop: "15px" }}>
    <button
      onClick={handleAddFruit}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginRight: "10px"
      }}
    >
      Add Fruit
    </button>
    <button
      onClick={handleClearUserFruits}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Clear User Fruits
    </button>
  </div>
</div>


      {/* Fruit Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        {fruits.map((fruit, index) => (
          <div
            key={index}
            onClick={() => handleFruitClick(fruit)}
            style={{
  backgroundColor: '#f8f9fa',
  width: '250px',
  padding: '15px 25px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  fontSize: '18px',
  fontWeight: '500',
  color: '#222',
  border: '1px solid #e0e0e0',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer'
}}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            }}
          >
            {fruit.emoji} {fruit.name}
          </div>
        ))}
      </div>

      {/* Info Panel */}
      {selectedFruit && (
        <div style={{
          marginTop: '40px',
          backgroundColor: '#f9f9f9',
          padding: '25px',
          borderRadius: '10px',
          width: '60%',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'left'
        }}>
          <h3>{selectedFruit.emoji} {selectedFruit.name}</h3>
          <p style={{ fontSize: '16px', color: '#333' }}>
            {selectedFruit.description}
          </p>
        </div>
      )}
    </div>
  );
}
