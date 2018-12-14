import React from 'react';
import { connect } from 'react-redux';
import styles from './index.css';
import { Modal, Stack } from '../components';

export const CSS_NAMESPACE = 'hv';

export class App extends React.Component {
  render() {
    return (
      <div className={ CSS_NAMESPACE }>
        <Stack api={ this.props.api } />
        <Modal />
      </div>
    );
  }
}

export default connect()(App);
