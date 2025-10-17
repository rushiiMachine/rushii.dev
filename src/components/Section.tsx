import { JSX, ParentProps } from "solid-js";
import { ClassProps } from "./ClassProps";

interface SectionProps extends ParentProps, ClassProps {
    title: string;
}

export function Section(props: SectionProps): JSX.Element {
    return <div class={`flex flex-col grow items-center gap-y-6 ${props.class || ""}`}>
        <p class="text-3xl font-extralight">{props.title}</p>
        {props.children}
    </div>;
}
