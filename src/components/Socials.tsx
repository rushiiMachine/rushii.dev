import { For, JSX } from "solid-js";
import { Link } from "./Link";
import { URLS } from "../constants";
import { ImBlog } from "solid-icons/im";
import { OcMarkgithub2 } from "solid-icons/oc";

const SOCIALS = [
    {
        name: "GitHub",
        url: URLS.GithubProfile,
        icon: OcMarkgithub2,
    },
    {
        name: "Blog",
        url: URLS.Blog,
        icon: ImBlog,
    }
]

function SocialsItem(props: (typeof SOCIALS)[0]): JSX.Element {
    return <>
        <Link url={props.url}>
            <div class="group flex space-x-3 text-lg hover-offset">
                <props.icon size={28} color="#FFFFFF"/>
                <p class="text-pink-100 no-underline group-hover:underline group-hover:text-pink-300">{props.name}</p>
            </div>
        </Link>
    </>;
}

export function Socials(): JSX.Element {
    return <>
        <div class="flex flex-col justify-center space-y-5 items-start
                    border-l-[0.5px] border-white border-opacity-30 pl-10">
            <For each={SOCIALS}>
                {(item) => SocialsItem(item)}
            </For>
        </div>
    </>;
}