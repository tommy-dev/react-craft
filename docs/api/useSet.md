# `useList`

React hook to manipulate a list of unique values, similar to a Set data structure.

Currently does not support objects. 

CodeSandbox Demo (ReactDOM) https://codesandbox.io/s/l46p5x27qq

## Usage

```jsx
import React from "react";
import { useSet } from "react-craft";

const initialList = [
  <div>
    <strong>Morpheus: </strong> You take the blue pill—the story ends, you wake
    up in your bed and believe whatever you want to believe.
  </div>,
  <div>
    <strong>Neo: </strong> You take the red pill—you stay in Wonderland, and I
    show you how deep the rabbit hole goes.
  </div>
];

export const Demo = () => {
  const [list, { add, set, removeAt, sort, filter }] = useSet(initialList);

  const List = () => {
    return (
      <div>
        {list.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    );
  };

  const tookRedPill = () => {
    const MSG = (
      <div>
        <strong>Morpheus: </strong> Have you ever had a dream, Neo, that you
        were so sure was real? What if you were unable to wake from that dream?
        How would you know the difference between the dream world and the real
        world?
      </div>
    );
    set(MSG);
  };

  const tookBluePill = () => {
    set(["***You woke up from your dream***"]);
  };

  return (
    <div style={{ padding: "100px" }}>
      <List />
      {list.length >= 2 && (
        <div>
          <button onClick={() => tookRedPill()}>
            Take the <span style={{ color: "red" }}>red</span> pill
          </button>
          <button onClick={() => tookBluePill()}>
            Take the <span style={{ color: "blue" }}>blue</span> pill
          </button>
        </div>
      )}
    </div>
  );
};

```
