import React from 'react';
import './index.css';
import { State } from '../../../state';

export const Frame = ({
  frame, isActive, onClick, onEntryClick,
}: Frame.Props) => (
  <div className={ isActive ? 'frame is-active' : 'frame' }>
    <div className="frame__meta">
      <p><a href="#" onClick={ onClick }>{ frame.url }</a></p>
    </div>
    <pre className="frame__payload" onClick={ onEntryClick }>{ JSON.stringify(frame.state).substring(0, 100).concat('...') }</pre>
  </div>
);

export namespace Frame {
  export interface Props {
    frame: State.Frame;
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    onEntryClick: () => void;
  }
};

export default Frame;
