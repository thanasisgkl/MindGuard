/// <reference types="react" />

declare global {
  const React: typeof import('react');
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module "*.tsx" {
  const content: React.FC;
  export default content;
}

export {}; 