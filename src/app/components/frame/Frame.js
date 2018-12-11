const React = require('react');

export const Frame = ({ frame, isActive, onClick }) => (
  <div className={ isActive ? 'frame is-active' : 'frame' }>
    <div className="frame__meta">
      <p><a href="#" onClick={ onClick }>{ frame.url }</a></p>
    </div>
    <pre className="frame__payload">{ JSON.stringify(frame.state).substring(0, 100).concat('...') }</pre>
  </div>
);

export default Frame;
