import { StatelessComponent } from 'inferno';
import { css } from 'emotion';

const baseCss = css`
  width: 300px;
  height: 240px;
  padding: 12px;
  font-size: 24px;
  border: 4px dashed orangered;
`;

const RedBox: StatelessComponent = props => (
  <div
    className={baseCss}
  >
    { props.children }
  </div>
);

export const App = () => <RedBox>hello, world</RedBox>;
