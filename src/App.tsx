import { JSX, Show } from "solid-js";
import Main from "./screens/Main";
import { VertexBackground } from "./components/VertexBackground";

const useReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function App(): JSX.Element {
    return <div class="flex">
        <Main/>

        <Show when={!useReducedMotion}>
            <div class="-z-1 fixed opacity-15">
                <VertexBackground class="max-w-full max-h-full"/>
            </div>
        </Show>

        {/*FIXME: not scaling properly?*/}
        <div class="fixed -z-2 site-background w-screen h-screen"/>
    </div>;
}

export default App;