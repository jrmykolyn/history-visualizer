import React from 'react';
import { connect } from 'react-redux';
import styles from './index.css';
import { Modal, Stack } from '../components';

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
