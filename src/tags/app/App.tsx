import React from 'react';
import { connect } from 'react-redux';
import { Historyish } from '../../core';
import { Modal, Stack } from '../components';

export const CSS_NAMESPACE = 'hv';

export class App extends React.Component<App.Props> {
  render() {
    return (
      <div className={ CSS_NAMESPACE }>
        <Stack api={ this.props.api } />
        <Modal />
      </div>
    );
  }
}

export namespace App {
  export interface Props {
    api: Historyish;
  }
}

export default connect()(App);
