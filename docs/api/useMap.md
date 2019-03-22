# `useList`

React hook for key-value structures.

CodeSandbox Demo (ReactDOM) https://codesandbox.io/s/jzrvn0zzm9

## Usage

```jsx

import React from "react";
import { useMap } from "react-craft";

export const MapDemo = () => {
  const [mars, { clear, get, hasKey, remove, reset, set }] = useMap({
    Mass: "6.42 x 1023",
    ["Escape Velocity"]: 5000,
    Obliquity: 25,
    ["Orbit Eccentricity"]: 0.093,
    ["Surface Materials"]: "basaltic rock and altered materials"
  });

  const Remove = props => {
    return (
      <button
        onClick={() => {
          remove(props.mapKey);
        }}
      >
        X
      </button>
    );
  };

  const Map = () =>
    Object.keys(mars).map((key, i) => {
      return <p key={i}>
        <strong>{key}</strong>: {`${mars[key]}`} &nbsp;
        <Remove mapKey={key} />
      </p>;
    });

  return (
    <div>
      <div>
        <button onClick={() => clear([])}>Delete all</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
      <br />

      <h3>Mars</h3>
      <Map />
    </div>
  );
};

export default MapDemo;

```
