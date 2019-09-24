import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import vl from "vega-lite-api";
import embed from "vega-embed";

const ScoreBoard = props => {
  const vegaTarget = useRef();

  const spec = vl
    .markCircle({ size: 100 })
    .data(props.players)
    .encode(
      vl
        .x()
        .fieldQ("votes")
        .scale({ zero: false }),
      vl.color().fieldN("name"),
      vl.y().fieldN("name")
    )
    .toJSON();

  useEffect(() => {
    embed(vegaTarget.current, spec);
  });

  return (
    <div ref={vegaTarget}>
      {/* props.players.map(p => (
        <div key={p.name}>
          {p.name} : {p.votes}{" "}
        </div>
      )) */}
    </div>
  );
};

ScoreBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default ScoreBoard;
