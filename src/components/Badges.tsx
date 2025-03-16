import { For, JSX, Match, ParentProps, Switch } from "solid-js";
import { ClassProps } from "./ClassProps";
import { DEVELOPER_BADGES, URLS } from "../constants";
import Tooltip from "@corvu/tooltip";
import { Link } from "./Link";

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
        class={`hover-offset hover-expand ${props.class || ""}`}>
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
                 e.currentTarget.parentElement.remove();
             }}
        />
    </a>;
}

function MyBadgeTooltip(props: ParentProps) {
    return <Tooltip
        placement="top"
        openDelay={150}
        floatingOptions={{
            offset: 20,
            flip: true,
            shift: true,
        }}>
        <Tooltip.Anchor>
            <Tooltip.Trigger class="hover-offset" {...props}/>
        </Tooltip.Anchor>
        <Tooltip.Portal>
            <Tooltip.Content
                class="px-3 py-1.5 rounded-md
                       bg-neutral-800 font-normal text-white/80
                       border-2 border-white/5">
                <Link newSite
                      url={URLS.BadgesInfo}
                      class="underline-offset-2">
                    Looking to add my badge? Click here!
                </Link>
                <Tooltip.Arrow class="text-neutral-800"/>
            </Tooltip.Content>
        </Tooltip.Portal>
    </Tooltip>
}

export function AllBadges(props: ClassProps) {
    return <div class={`flex flex-row flex-wrap justify-center gap-4 ${props.class || ""}`}>
        <For each={DEVELOPER_BADGES}>{badge =>
            <Switch>
                <Match when={badge.name === "rushii"}>
                    <MyBadgeTooltip>
                        <Badge {...badge}/>
                    </MyBadgeTooltip>
                </Match>

                <Match when={true}>
                    <Badge {...badge}/>
                </Match>
            </Switch>
        }</For>
    </div>;
}
