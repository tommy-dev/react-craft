# `useList`

React hook to store and manipulate a list structure.

CodeSandbox Demo (ReactDOM) https://codesandbox.io/s/6z2330q1pr

## Usage

```jsx
import React from "react";
import { useList } from "react-craft";

export const UsageDemo = () => {
  const initialList = [
    { title: "wake up" },
    { title: "drink coffee" },
    { title: "sleep" }
  ];

  const [list, { set, add, addAt, updateAt, removeAt, filter, sort }] = useList(
    initialList
  );

  return (
    <div>
      THINGS TO DO TODAY
      <br />
      {list.map((item: any, i: number) => {
        return (
          <p>
            {item.title} &nbsp;
            <span style={{ cursor: "pointer" }} onClick={() => removeAt(i)}>
              X
            </span>
          </p>
        );
      })}
    </div>
  );
};

```
