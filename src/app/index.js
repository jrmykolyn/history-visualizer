import React from 'react';
import { connect } from 'react-redux';
import Modal from './components/modal/Modal';
import Stack from './components/stack/Stack';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Stack api={ this.props.api } />
        <Modal />
      </div>
    );
  }
}

export default connect()(App);
