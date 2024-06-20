/* @refresh reload */

import 'solid-devtools';
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

render(() => <App/>, document.getElementById('root')!);

// Fuck Dark Reader, it ignores the meta tag
setTimeout(() => {
    document.querySelector("style.darkreader")?.remove()
}, 50);
