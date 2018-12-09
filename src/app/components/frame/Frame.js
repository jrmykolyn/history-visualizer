const React = require('react');

export const Frame = ({ frame, isActive, onClick }) => (<pre className={isActive ? 'is-active' : '' } onClick={ onClick }>{ JSON.stringify(frame) }</pre>);

export default Frame;
