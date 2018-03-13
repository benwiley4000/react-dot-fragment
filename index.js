if (typeof require === 'function') {
  var React = require('React');
}

var Fragment = React.Fragment || class _Fragment extends React.Component {
  constructor(props) {
    super(props);
    this.refFn = this.refFn.bind(this);
  }

  refFn(div) {
    this.div = div;
  }

  componentDidMount() {
    this.unwrapChildren();
  }

  componentDidUpdate() {
    this.unwrapChildren();
  }

  unwrapChildren() {
    // plain js rocks!
    // https://plainjs.com/javascript/manipulation/unwrap-a-dom-element-35/
    if (!this.div.parentNode) {
      return;
    }
    while (this.div.firstChild) {
      this.div.parentNode.insertBefore(this.div.firstChild, this.div);
    }
    this.div.parentNode.removeChild(this.div);
  }

  render() {
    return React.createElement('div', { ref: this.refFn }, this.props.children);
  }
};

if (typeof module !== 'undefined' && module) {
  module.exports = Fragment;
}
