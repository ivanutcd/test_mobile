import React from 'react';

export const Row = ({ children }: any) => {
  const childElements = React.Children.toArray(children).filter(
    React.isValidElement,
  );
  const md = childElements.length === 2 ? 6 : 12;

  return (
    <>
      {childElements.map((child: any) =>
        React.cloneElement(child, { md: child.props.md || md } as any),
      )}
    </>
  );
};
