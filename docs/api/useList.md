# `useList`

React hook for list structures.

A list is a very fundamental structure used for many things. For example, calculator logic with a list of mathematical entries: https://github.com/tommy-dev/react-calculator. 

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
