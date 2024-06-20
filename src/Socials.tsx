import { For, JSX } from "solid-js";
import { Link } from "./Link";
import { BLOG_URL, GITHUB_PROFILE_URL } from "./constants";
import { ImBlog } from "solid-icons/im";
import { OcMarkgithub2 } from "solid-icons/oc";

const SOCIALS = [
    {
        name: "GitHub",
        url: GITHUB_PROFILE_URL,
        icon: () => <OcMarkgithub2 size={32} color="#FFFFFF"/>,
    },
    {
        name: "Blog",
        url: BLOG_URL,
        icon: () => <ImBlog size={32} color="#FFFFFF"/>,
    }
]

function SocialsItem(props: (typeof SOCIALS)[0]): JSX.Element {
    return <>
        <Link secure url={props.url}>
            <div class="group flex space-x-3 text-lg hover-offset">
                {props.icon()}
                <p class="pt-1 text-pink-100 no-underline group-hover:underline group-hover:text-pink-300">{props.name}</p>
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