import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected = false, onSelect = (x) => x }) => (
  <FaStar color={selected ? 'yellow' : 'grey'} onClick={onSelect} />
);

export default function Rating({ checkRating, defaultStars, alreadyRated }) {
  const currentStars = defaultStars || 0;
  const [starsSelected, setStarsSelected] = useState(currentStars);
  useEffect(() => {
    if (checkRating) {
      checkRating(starsSelected);
    }
  }, [starsSelected]);
  return (
    <>
      {[...Array(5)].map((n, i) => (
        <Star
          key={i}
          selected={starsSelected > i}
          onSelect={() => { if (!alreadyRated) { setStarsSelected(i + 1); } }}
        />
      ))}
      &nbsp;
      {starsSelected}
      &nbsp;of 5 stars
    </>
  );
}
