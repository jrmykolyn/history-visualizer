import React from 'react';

export const Frame = ({
  frame, isActive, onClick, onEntryClick,
}) => (
  <div className={ isActive ? 'frame is-active' : 'frame' }>
    <div className="frame__meta">
      <p><a href="#" onClick={ onClick }>{ frame.url }</a></p>
    </div>
    <pre className="frame__payload" onClick={ onEntryClick }>{ JSON.stringify(frame.state).substring(0, 100).concat('...') }</pre>
  </div>
);

export default Frame;
