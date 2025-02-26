import { JSX, ParentProps } from "solid-js";
import { ClassProps } from "./ClassProps";

interface LinkProps extends ParentProps, ClassProps {
    url: string,
    style?: string;
    noReferrer?: boolean,
    onClick?: () => void,
}

export function Link(props: LinkProps): JSX.Element {
    return <>
        <a href={props.url}
           rel={props.noReferrer ? "noopener noreferrer" : "noopener"}
           referrerpolicy={props.noReferrer ? "no-referrer" : "strict-origin-when-cross-origin"}
           style={props.style}
           onClick={props.onClick}
           class={`transition-colors text-pink-100 hover:text-pink-200
                   underline underline-offset-2 hover:underline hover:decoration-pink-300 ${props.class || ""}`}>
            {props.children}
        </a>
    </>;
}
