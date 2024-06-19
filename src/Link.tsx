import { Component, JSX } from "solid-js";

type LinkProps<P = {}> = P & { children?: JSX.Element, url: string, secure?: boolean };
type LinkComponent<P = {}> = Component<LinkProps<P>>;

export const Link: LinkComponent = (props: LinkProps) => {
    let rel = props.secure ? "noopener noreferrer" : "noopener";
    return <a href={props.url} rel={rel} class="transition-colors text-pink-100 hover:text-pink-200">{props.children}</a>;
}