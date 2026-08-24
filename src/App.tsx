import { JSX, Show } from "solid-js";
import Main from "./screens/Main";
import { VertexBackground } from "./components/VertexBackground";

const useReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isWideScreen = window.matchMedia('(min-width: 1280px)').matches;
const raindropsOnly = (() => {
    // Raindrops always on small screens
    if (!isWideScreen) return true;

    // Raindrops always on Monday/Tuesday
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek == 1 || dayOfWeek == 2) return true;

    // Otherwise 50/50
    return Math.random() < 0.5;
})();

function App(): JSX.Element {
    return <div class="flex">
        <Main/>

        <Show when={!useReducedMotion && !raindropsOnly}>
            <div class="-z-1 fixed opacity-15">
                <VertexBackground class="max-w-full max-h-full"/>
            </div>
        </Show>

        {/*FIXME: not scaling properly?*/}
        <div class="fixed -z-2 site-background w-screen h-screen"/>

        <Show when={!useReducedMotion && raindropsOnly}>
            <div class="fixed -z-2 raindrops-background opacity-10 w-screen h-screen"/>
        </Show>
    </div>;
}

export default App;