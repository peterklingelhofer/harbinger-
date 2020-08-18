import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onSelect = x => x }) => (
  <FaStar color={selected ? 'yellow' : 'grey'} onClick={onSelect} />
);

export default function Rating() {
  const [starsSelected, setStarsSelected] = useState(0);
  return (
    <>
      {[...Array(5)].map((n, i) => (
        <Star
          key={i}
          selected={starsSelected > i}
          onSelect={() => setStarsSelected(i + 1)}
        />
      ))}
      {starsSelected}
      of 5 stars
    </>
  );
}
