import { fireEvent, render } from 'react-testing-library';
import * as React from 'react';
import useToggle from '../src/useToggle';
import * as useNamed from '../src/useToggle';

const Test = props => {
  const [on, toggle] = useToggle(props.on);
  const [on2, toggle2] = useToggle(props.on2);

  return (
    <>
      <div onClick={() => toggle()}>{on ? 'true' : 'false'}</div>
      <button onClick={() => toggle()}>{on ? 'true' : 'false'}</button>
      <p onClick={() => toggle(false)}>{on ? 'true' : 'false'}</p>
      <h1 onClick={() => toggle(true)}>{on ? 'true' : 'false'}</h1>

      <span onClick={() => toggle2()}>{on2 ? 'true' : 'false'}</span>
    </>
  );
};

test('should not affect other toggle instances', () => {
  const { container } = render(<Test />);
  const div = container.querySelector('div');
  const span = container.querySelector('span');

  expect(div.textContent).toBe('false');
  expect(span.textContent).toBe('false');

  fireEvent.click(div);
  expect(div.textContent).toBe('true');
  expect(span.textContent).toBe('false');
});

test('should return specified initial value per toggle instance', () => {
  const { container } = render(<Test on={true} on2={false} />);
  const div = container.querySelector('div');
  const button = container.querySelector('button');
  const span = container.querySelector('span');

  expect(div.textContent).toBe('true');
  expect(button.textContent).toBe('true');
  expect(span.textContent).toBe('false');
});

test('should not toggle values when toggle has specified value', () => {
  const { container } = render(<Test />);
  const h1 = container.querySelector('h1');
  const p = container.querySelector('p');

  fireEvent.click(p);
  expect(p.textContent).toBe('false');
  fireEvent.click(p);
  expect(p.textContent).toBe('false');
  fireEvent.click(p);
  expect(p.textContent).toBe('false');

  expect(h1.textContent).toBe('false');
  fireEvent.click(h1);
  expect(h1.textContent).toBe('true');
  fireEvent.click(h1);
  expect(h1.textContent).toBe('true');
});

test('should return false for no initial value', () => {
  const { container } = render(<Test />);
  expect(container.querySelector('div').textContent).toBe('false');
  expect(container.querySelector('span').textContent).toBe('false');
  expect(container.querySelector('button').textContent).toBe('false');
});

test('should update the value if toggle is called by click', () => {
  const { container } = render(<Test />);
  const div = container.querySelector('div');
  const button = container.querySelector('button');
  const span = container.querySelector('span');

  expect(div.textContent).toBe('false');
  expect(button.textContent).toBe('false');
  expect(span.textContent).toBe('false');

  fireEvent.click(div);
  expect(div.textContent).toBe('true');
  expect(button.textContent).toBe('true');
  expect(span.textContent).toBe('false');

  fireEvent.click(div);
  expect(div.textContent).toBe('false');
  expect(button.textContent).toBe('false');
  expect(span.textContent).toBe('false');

  fireEvent.click(div);
  expect(div.textContent).toBe('true');
  expect(button.textContent).toBe('true');
  expect(span.textContent).toBe('false');
});

test('should update the value if toggle is called', () => {
  const Test = props => {
    const [on, toggle] = useToggle();

    React.useEffect(() => {
      toggle();
    }, []);

    return <div>{on ? 'true' : 'false'}</div>;
  };

  const { container } = render(<Test />);
  expect(container.querySelector('div').textContent).toBe('true');
});

test('should work with named exports as object', () => {
  const Test = props => {
    const [on, toggle] = useNamed.useToggle(props.on);
    return <div onClick={() => toggle()}>{on ? 'true' : 'false'}</div>;
  };

  const { container } = render(<Test on={true} />);
  const div = container.querySelector('div');
  expect(div.textContent).toBe('true');
});
