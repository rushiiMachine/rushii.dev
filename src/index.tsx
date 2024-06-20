/* @refresh reload */

import 'solid-devtools';
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';

// `overflow: overlay` got deprecated & removed, so it's now impossible to get native scroll bars to overlay content!!!
// I sure love using giant JS libraries to fix what the browser should already fucking do!
OverlayScrollbars(document.querySelector('body')!, {
    overflow: {
        x: 'hidden',
        y: 'scroll',
    },
});

render(() => <App/>, document.getElementById('root')!);

// Fuck Dark Reader, it ignores the meta tag
setTimeout(() => {
    document.querySelector("style.darkreader")?.remove()
}, 50);
