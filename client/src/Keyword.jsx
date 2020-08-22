import React from 'react';
import axios from 'axios';

export default function Keyword ({ keyword, handleTagClick, userId }) {
  const handleClick = (tag) => {
    const tagObject = {
      keyword: tag,
      userId,
    };
    handleTagClick(tagObject);
  };

  return (
    <div id={keyword}
      tabIndex="0"
      onClick={(e) => {handleClick(e.target.id)}}
      onKeyDown={(e) => { if (e.keyCode === 13 || e.keyCode === 32) {handleClick(e.target.id)}; }}
      style={{ width: 'max-content', cursor: 'pointer' }}>
      {keyword}
    </div>
  )
};
