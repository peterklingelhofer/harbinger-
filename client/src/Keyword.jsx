import React from 'react';
import axios from 'axios';

export default function Keyword ({ keyword, handleTagClick }) {

const handleClick = (tag) => {
  handleTagClick(tag);
};

  return (
    <div id={keyword} onClick={(e) => {handleClick(e.target.id)}} onKeyDown={(e) => {e.keyCode === 13 || 32 ? handleTagClick(e.target.id) : '' }}>
      {keyword}
    </div>
  )
};
