/**
 * TODO:
 * use inferno native `createVNode` rather than `createElement`
 * see: https://github.com/emotion-js/emotion/issues/300
 */

import * as emotion from 'emotion';
import createEmotionStyled from 'create-emotion-styled';

import { customReact } from './custom-react-provider';

const styled = createEmotionStyled(emotion, customReact);

export default styled;
