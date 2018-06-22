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

ReactDOM.render(
  <Fragment>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </Fragment>,
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

## how does it work?

1. In the render method of our `Fragment` component, wrap the the `children` prop with a `<div>`
2. After the component mounts, attach the child DOM nodes to our `<div>`'s parent DOM node
3. Hide the `<div>` from the DOM so it doesn't affect any layout
3. On update:

    a. Move the elevated child nodes back inside the `<div>`

    b. Let React re-render

    c. Move the new child nodes back up to the `<div>`'s parent node

## rationale

You might want to use this for one of a couple of *good* reasons:
* You have some code that needs to be tested in React 15, but it relies on `React.Fragment`.
* You maintain a React library which supports React 16 features, but you want backward compatibility.

Generally, if you want to use `React.Fragment`, it's probably best to just upgrade to React 16.

## compatibility

This module works with React 15 or later. It works in Node or in the browser.

Since the current solution relies on the DOM, this module is *not* compatible with React Native or other React platforms without access to the DOM API. If you would like to help us fix that, [please open a PR](https://github.com/benwiley4000/react-dot-fragment/issues/3)!

## contributing

Please feel free to open a pull request with test cases, bug fixes, or the like.
