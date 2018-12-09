const React = require('react');

export const Frame = ({ frame, isActive }) => (<pre className={isActive ? 'is-active' : ''}>{ JSON.stringify(frame) }</pre>);

export default Frame;
