# `useList`

React hook to store and manipulate a list structure.
CodeSandbox Demo (ReactDOM) https://codesandbox.io/s/6z2330q1pr

## Usage

```jsx
import { useToggle, useList } from "react-craft";

import React from "react";

const SwitchDemo = (props: any) => {
  const [on, toggle] = useToggle(true);
  return (
    <div>
      <strong>{props.index}</strong> Title: {props.title}
      <div>
        Switch is:{" "}
        {on ? (
          <strong style={{ color: "green" }}>on</strong>
        ) : (
          <strong style={{ color: "red" }}>off</strong>
        )}
      </div>
      <button onClick={() => toggle()}>Toggle switch on or off</button>
      <button onClick={() => toggle(true)}>Set switch on</button>
      <button onClick={() => toggle(false)}>Set switch off</button>
      <br />
      <br />
    </div>
  );
};

const SwitchList = (props: any) => {
  const items = props.list.map((item: any, i: number) => {
    return <SwitchDemo key={i} index={i} title={item.title} />;
  });

  return items;
};

export const Demo = () => {
  const initialList = [
    { title: "blue" },
    { title: "red" },
    { title: "light blue" },
    { title: "green" }
  ];

  const [list, { set, add, addAt, updateAt, removeAt, filter, sort }] = useList(
    initialList
  );

  const filterFn = (item: any) => {
    return item.title.includes("blue");
  };

  const addFn = () => {
    add({ title: genString() });
  };

  const addManyFn = () => {
    add([{ title: genString() }, { title: genString() }]);
  };

  const sortAlphabet = () => {
    sort((a: any, b: any) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  };

  const genString = () => {
    return new Date().getTime().toString();
  };

  return (
    <>
      <div>
        <button onClick={() => set([])}>Delete all</button>
        <button onClick={() => set(initialList)}>Reset</button>
        <button onClick={() => filter(filterFn)}>
          Filter (e.g. get all titles with word 'blue')
        </button>
        <button onClick={() => addFn()}>Add</button>
        <button onClick={() => addManyFn()}>Add multiple</button>
        <button onClick={() => addAt(1, { title: genString() })}>
          Add at (e.g. insert at index 1)
        </button>
        <button onClick={() => removeAt(1)}>
          Remove (e.g. remove at index 1)
        </button>
        <button onClick={() => updateAt(2, { title: "purple" })}>
          Update (e.g. replace index 2 with title 'purple')
        </button>
        <button onClick={() => sortAlphabet()}>
          Sort title alphabetically
        </button>
      </div>
      <div>
        <br />
        <SwitchList list={list} />
      </div>
    </>
  );
};

```
