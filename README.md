# react-dot-fragment

This is a very simple ponyfill for React 16's [`<React.Fragment>`](https://reactjs.org/docs/fragments.html) (a.k.a. `<>`) component which allows a component to return a set of children without a wrapper DOM element.

```bash
npm install react-dot-fragment
```

## example

([see a working example here](https://benwiley4000.github.io/react-dot-fragment/))

```html
<html>
<body>
  <ul></ul>
</body>
</html>
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from 'react-dot-fragment';

React.Fragment = React.Fragment || Fragment;

ReactDOM.render(
  <React.Fragment>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </React.Fragment>,
  document.querySelector('ul')
);
```

The DOM becomes:
```html
<html>
<body>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
</body>
</html>
```

## rationale

You might want to use this for one of a couple of *good* reasons:
* You have some code that needs to be tested in React 15 or earlier, but it relies on `React.Fragment`.
* You maintain a React library which supports React 16 features, but you want backward compatibility.

Generally, if you want to use `React.Fragment`, it's probably best to just upgrade to React 16.

## compatibility

This module works with React 0.14 or later. It works in Node or in any browser which supports ES2015 class syntax.

## contributing

Please feel free to open a pull request with test cases, bug fixes, or the like.
