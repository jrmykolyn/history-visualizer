import React from 'react';
import { connect } from 'react-redux';
import Stack from './components/stack/Stack';

export class App extends React.Component {
  render() {
    return (<Stack api={ this.props.api } />);
  }
}

export default connect()(App);
