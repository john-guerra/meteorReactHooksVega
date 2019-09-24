import React from "react";
import PropTypes from "prop-types";

const ScoreBoard = props => {
  return (
    <div className="ScoreBoard">
      {props.players.map(p => (
        <div key={p.name}>
          {p.name} : {p.votes}{" "}
        </div>
      ))}
    </div>
  );
};

ScoreBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default ScoreBoard;
