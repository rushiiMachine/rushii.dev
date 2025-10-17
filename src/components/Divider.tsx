import { ClassProps } from "./ClassProps";
import { JSX } from "solid-js";

export function Divider(props: ClassProps): JSX.Element {
    return <div class={`border-b-[1px] border-white/20 ${props.class || ""}`}/>;
}
