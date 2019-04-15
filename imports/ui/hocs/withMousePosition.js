import React, { Component } from 'react';

const withMousePosition = (mapProps) => (Comp) => {
  return class WithMouthPosition extends Component {
    state = {
      x: null,
      y: null,
    }

    componentDidMount() {
      document.addEventListener('mousemove', this.setMousePosition);
    }

    setMousePosition = (e) => {
      this.setState({
        x: e.pageX,
        y: e.pageY,
      });
    }

    componentWillMount() {
      document.removeEventListener('mousemove', this.setMousePosition);
    }

    render() {
      const { x, y } = this.state;
      const injectProps = mapProps({ x, y });
      return <Comp {...this.props} {...injectProps} />
    }
  }
};

export default withMousePosition;
