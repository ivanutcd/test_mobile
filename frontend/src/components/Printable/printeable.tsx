import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
interface Props {
  children: React.ReactNode;
  className?: string;
}

export interface PrinteableRef {
  print: () => void;
}
export const Printeable = forwardRef(
  ({ children: children, className }: Props, ref) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    useImperativeHandle(ref, () => ({
      print: () => {
        handlePrint();
      },
    }));

    return (
      <div ref={componentRef} className={className ?? 'printable-content'}>
        {children}
      </div>
    );
  },
);
