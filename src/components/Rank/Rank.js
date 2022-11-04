import React from "react";

const Rank = ({ name, entry }) => {
  return (
    <div>
      <div className="white f3">{name} Your Current Rank Is</div>
      <div className="white f3">#{entry}</div>
    </div>
  );
};

export default Rank;
