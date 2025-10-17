import { For, JSX } from "solid-js";
import { Link } from "./Link";
import { URLS } from "../constants";
import { OcLinkexternal2, OcMarkgithub2 } from "solid-icons/oc";
import { BiSolidPencil } from "solid-icons/bi";
import { AiOutlineHeart } from "solid-icons/ai";
import { ClassProps } from "./ClassProps";

const SOCIALS = [
    {
        name: "GitHub",
        url: URLS.GithubProfile,
        icon: OcMarkgithub2,
    },
    {
        name: "Blog",
        url: URLS.Blog,
        icon: BiSolidPencil,
    },
    {
        name: "Sponsor",
        url: URLS.GithubSponsor,
        icon: AiOutlineHeart,
        color: "#DB61A2",
        style: { "filter": "drop-shadow(0px 0px 6px #DB61A2)" },
    },
]

function SocialsItem(props: (typeof SOCIALS)[0]): JSX.Element {
    return <>
        <Link url={props.url} newSite class="!no-underline">
            <div class="group flex flex-row items-center
            			space-x-3 px-5 py-3 min-w-50 hover-offset bg-white/30 rounded-xl">
                <props.icon color={props.color} style={props.style}
                            size={24} class="text-white group-hover:text-pink-200"/>
                <p class="text-md text-pink-100 group-hover:text-pink-200">{props.name}</p>
                <OcLinkexternal2 size={20} color="#FFFFFF" class="opacity-60 ml-auto"/>
            </div>
        </Link>
    </>;
}

export function Socials(props: ClassProps): JSX.Element {
    return <>
        <div class={`flex flex-col justify-center space-y-2 items-stretch ${props.class || ""}`}>
            <For each={SOCIALS}>
                {(item) => SocialsItem(item)}
            </For>
        </div>
    </>;
}