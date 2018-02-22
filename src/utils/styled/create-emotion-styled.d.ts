/* eslint-disable no-unused-vars, import/no-mutable-exports */

declare module 'create-emotion-styled' {
  import * as emotion from 'emotion';

  type Emotion = typeof emotion;

  let createEmotionStyled: (emotion: Emotion, view: any) => any;
  export default createEmotionStyled;
}
