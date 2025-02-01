import React from 'react';
import { useNavigate } from 'react-router-dom';

const Widget = ({ dish }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${dish._id}`);
  };

  const imageUrl = `http://localhost:4000/uploads/${dish.image}`;

  return (
    <div
      onClick={handleClick}
      style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '200px', cursor: 'pointer' }}
    >
      <img src={imageUrl} alt={dish.recipeName} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <h3>{dish.recipeName}</h3>
      <p>{dish.description}</p>
    </div>
  );
};

export default Widget;
