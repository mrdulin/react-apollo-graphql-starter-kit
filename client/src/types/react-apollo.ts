import React from 'react';

export type Enhancer = (WrappedComponent: React.ComponentType<any>) => React.ComponentClass<any, React.ComponentState>;
