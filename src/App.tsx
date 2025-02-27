import { JSX, Show } from "solid-js";
import Main from "./screens/Main";
import { VertexBackground } from "./components/VertexBackground";

const useReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = "ontouchstart" in window;

function App(): JSX.Element {
    return <div class="flex">
        <Main class="z-2"/>

        <Show when={!useReducedMotion}>
            <div class="z-1 fixed opacity-15">
                <VertexBackground
                    particleCount={55}
                    enableMouse={!isTouchDevice}
                    class="max-w-full max-h-full"/>
            </div>
        </Show>

        <div class="fixed z-0 site-background w-screen h-screen"/>
    </div>;
}

export default App;