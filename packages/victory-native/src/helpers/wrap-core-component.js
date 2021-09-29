import React from "react";

/**
 * Wrap a core component, pass props through.
 * @param {any} Component Core Component
 * @param {object} defaultProps Default props for component
 * @param {string} name Name of the component
 * @returns {React.FC} WrappedComponent Wrapped component (passes props through)
 */
export const wrapCoreComponent = ({ Component, defaultProps, name }) => {
  const WrappedComponent = (props) => <Component {...props} />;
  WrappedComponent.defaultProps = defaultProps;
  WrappedComponent.name = name;

  return WrappedComponent;
};
