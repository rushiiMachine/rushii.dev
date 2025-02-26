import { For, JSX } from "solid-js";
import { ClassProps } from "./ClassProps";
import { DEVELOPER_BADGES } from "../constants";

export interface BadgeData {
    name: string;
    badgeUrl: string;
    linkUrl: string;
}

function Badge(props: ClassProps & BadgeData): JSX.Element {
    return <a
        href={props.linkUrl}
        rel="noopener"
        target="_blank"
        referrerpolicy="strict-origin-when-cross-origin"
        class={`hover-offset hover-expand ` + props.class}>
        <img width={88}
             height={31}
             referrerpolicy="strict-origin-when-cross-origin"
             alt={`${props.name}'s website`}
             data-src={props.badgeUrl}
             class="lazyload max-w-none max-h-none"
             style="image-rendering: pixelated;"
        />
    </a>;
}

export function AllBadges(props: ClassProps) {
    return <div class={`flex flex-row flex-wrap justify-center gap-4 ` + props.class}>
        <For each={DEVELOPER_BADGES}>
            {badge => <Badge {...badge}/>}
        </For>
    </div>;
}
