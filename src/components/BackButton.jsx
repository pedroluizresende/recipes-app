import React from 'react';
import { useHistory } from 'react-router-dom';

function BackButton() {
  const history = useHistory();
  return (
    <button
      className="back-btn"
      type="button"
      onClick={ () => history.goBack() }
    >
      <i className="fa-solid fa-chevron-left" />

    </button>
  );
}

export default BackButton;
