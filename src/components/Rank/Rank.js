import React from "react";

const Rank = ({ name, entries, entriesSession }) => {
  return (
    <div>
      <div className="white f3"><span className="gold b f2">{`${name}`}</span>{`, your count of pictures with detected faces is...`}</div>
      <div className="white f3">{`total: `}<span className="gold b f2">{`${entries}`}</span>{`     session: `}<span className="gold b f2">{`${entriesSession}`}</span></div>
    </div>
  );
};

export default Rank;
