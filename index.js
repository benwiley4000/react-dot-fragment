if (typeof require === 'function') {
  var React = require('react');
}

var Fragment = React.Fragment || class _Fragment extends React.Component {
  constructor(props) {
    super(props);
    this.refFn = this.refFn.bind(this);
    this.orphans = [];
    this.focusedDescendantElement = null;
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
    setTimeout(() => {
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
      this.restoreFocusedDescendantElement();
    });
  }

  rewrapChildren() {
    if (!(this.div && this.div.parentNode)) {
      return;
    }
    if (this.orphans.length) {
      this.saveFocusedDescendantElement(this.orphans[0].parentNode);
      for (const orphan of this.orphans) {
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
