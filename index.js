if (typeof require === 'function') {
  var React = require('react');
}

var Fragment = React.Fragment || class _Fragment extends React.Component {
  constructor(props) {
    super(props);
    this.refFn = this.refFn.bind(this);
    this.orphans = [];
    this.focusedDescendantElement = null;
    this.parentNode = null;
  }

  refFn(div) {
    this.div = div;
  }

  componentDidMount() {
    this.unwrapChildren();
    this.div.style.display = 'none';
  }

  componentDidUpdate() {
    this.unwrapChildren();
  }

  componentWillUnmount() {
    this.rewrapChildren();
  }

  unwrapChildren() {
    // defer first to style calculation to ensure CSS transitions can happen:
    // https://stackoverflow.com/a/24195559/4956731
    this.unwrapTimeout = setTimeout(() => {
      // plain js rocks!
      // https://plainjs.com/javascript/manipulation/unwrap-a-dom-element-35/
      if (!this.div.parentNode) {
        return;
      }
      this.saveFocusedDescendantElement(this.div);
      this.orphans = [];
      while (this.div.firstChild) {
        this.orphans.push(this.div.firstChild);
        this.div.parentNode.insertBefore(this.div.firstChild, this.div);
      }
      this.parentNode = this.div.parentNode;
      if (this.orphans.length) {
        // it's only safe to remove the wrapper div
        // if the fragment has some child dom elements,
        // since otherwise we have no way to remember
        // our position among the sibling elements.
        this.parentNode.removeChild(this.div);
      }
      this.restoreFocusedDescendantElement();
    });
  }

  rewrapChildren() {
    clearTimeout(this.unwrapTimeout);
    if (!(this.div && this.parentNode && this.parentNode.parentNode)) {
      return;
    }
    if (this.orphans.length) {
      this.parentNode.insertBefore(this.div, this.orphans[0]);
      this.saveFocusedDescendantElement(this.orphans[0].parentNode);
      let orphan;
      while (orphan = this.orphans.shift()) {
        this.div.appendChild(orphan);
      }
    }
  }

  saveFocusedDescendantElement(ancestorElement) {
    if (ancestorElement.contains(document.activeElement)) {
      this.focusedDescendantElement = document.activeElement;
    }
  }

  restoreFocusedDescendantElement() {
    if (this.focusedDescendantElement) {
      this.focusedDescendantElement.focus();
      this.focusedDescendantElement = null;
    }
  }

  render() {
    // sorry for the side effects! 😭
    this.rewrapChildren();

    return React.createElement('div', { ref: this.refFn }, this.props.children);
  }
};

if (typeof module !== 'undefined' && module) {
  module.exports = Fragment;
}
