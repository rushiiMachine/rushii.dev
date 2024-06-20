import { JSX, ParentProps } from "solid-js";
import { ClassProps } from "./Utils";

interface LinkProps extends ParentProps, ClassProps {
    url: string,
    secure?: boolean,
    noReferrer?: boolean,
}

export function Link(props: LinkProps): JSX.Element {
    let rel = props.secure
        ? "noopener noreferrer"
        : "noopener";
    let referrer: JSX.HTMLReferrerPolicy = props.noReferrer
        ? "no-referrer"
        : "strict-origin"

    return <>
        <a href={props.url}
           rel={rel}
           referrerpolicy={referrer}
           class={`transition-colors text-pink-100 hover:text-pink-200
                   underline underline-offset-2 hover:underline hover:decoration-pink-300 ${props.class || ""}`}>
            {props.children}
        </a>
    </>;
}
