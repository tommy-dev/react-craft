# `useToggle`

React hook to toggle or set a boolean state. 
Some potential use cases: custom checkbox, radio button, popup, navigation bar, etc.

CodeSandbox Demo (ReactDOM) https://codesandbox.io/s/q8yk1ymk5j

## Usage

```jsx
import { useToggle } from 'react-craft';

export const SwitchDemo = () => {
  const [on, toggle] = useToggle(true);

  return (
    <div>
      <div>Switch is: {on ? 'on' : 'off'}</div>
      <button onClick={() => toggle()}>Toggle switch on or off</button>
      <button onClick={() => toggle(true)}>Set switch on</button>
      <button onClick={() => toggle(false)}>Set switch off</button>
    </div>
  );
};
```
