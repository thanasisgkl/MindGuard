declare module '*.svg' {
  import { FC } from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

type DefaultType = {
  // Add your global types here
};

export default DefaultType; 