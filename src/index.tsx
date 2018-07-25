import { render } from 'inferno';
import { initDevTools } from 'inferno-devtools';

import { App } from 'app';

if ((process.env.NODE_ENV as string) !== 'production') {
  initDevTools();
}

render(<App />, document.getElementById('root'));
