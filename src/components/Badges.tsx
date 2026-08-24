import { For, JSX } from "solid-js";
import { ClassProps } from "./ClassProps";
import { DEVELOPER_BADGES, DEVELOPER_PROFILES } from "../constants";

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
        data-tooltip-content={props.name}
        class={`hover-expand tooltip ${props.class || ""}`}>
        <img width={88}
             height={31}
             referrerpolicy="strict-origin-when-cross-origin"
             alt={`${props.name}'s site`}
             src={props.badgeUrl}
             loading="lazy"
             class="max-w-none max-h-none shadow-xl"
             style="image-rendering: pixelated;"
             onError={(e) => {
                 console.error(`Failed to load ${props.name}'s badge!`)
                 e.currentTarget.parentElement?.remove();
             }}
        />
    </a>;
}

export function AllBadges(props: ClassProps) {
    return <div class={`flex flex-row flex-wrap justify-center gap-2 ${props.class || ""}`}>
        <For each={DEVELOPER_BADGES}>{badge =>
            <Badge {...badge}/>
        }</For>
    </div>;
}

export function ProfileBadge(props: ClassProps & BadgeData): JSX.Element {
    return <a
        href={props.linkUrl}
        rel="noopener"
        target="_blank"
        referrerpolicy="strict-origin-when-cross-origin"
        data-tooltip-content={props.name}
        class={`hover-expand tooltip ${props.class || ""}`}>
        <img width={48}
             height={48}
             referrerpolicy="strict-origin-when-cross-origin"
             alt={props.name}
             src={props.badgeUrl}
             loading="lazy"
             class="max-w-none max-h-none shadow-xl rounded-md"
             style="image-rendering: smooth;"
             onError={(e) => {
                 console.error(`Failed to load ${props.name}'s GitHub profile image!`);
                 e.currentTarget.parentElement?.remove();
             }}
        />
    </a>
}

export function AllProfileBadges(props: ClassProps): JSX.Element {
    return <div class={`flex flex-row flex-wrap justify-center gap-4 ${props.class || ""}`}>
        <For each={DEVELOPER_PROFILES}>{badge =>
            <ProfileBadge {...badge}/>
        }</For>
    </div>;
}
