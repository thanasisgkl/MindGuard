import React from 'react';

/// <reference types="react" />

declare module "*.tsx" {
  const content: React.FC;
  export default content;
}

const DefaultComponent: React.FC = () => null;
export default DefaultComponent; 