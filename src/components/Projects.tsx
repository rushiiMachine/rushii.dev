import { ClassProps } from "./ClassProps";
import { createResource, For, JSX, Show } from "solid-js";
import { OcLaw2, OcLinkexternal2, OcStarfill2 } from "solid-icons/oc";
import { Link } from "./Link";
import { makeCache } from "@solid-primitives/resource";
import { LANGUAGE_COLORS, PROJECT_REPOS } from "../constants";
import { humanize } from "../utils";
import { Section } from "./Section";
import { hardcodedRepositoriesData } from "../hardcoded.compile";
import { fetchRepositories, Repository } from "../api";

export function ProjectRepo(props: { repo: Repository } & ClassProps): JSX.Element {
    return <a
        href={props.repo.url}
        target="_blank"
        referrerpolicy="strict-origin"
        class={`group flex flex-col gap-2 p-6 rounded-lg hover-offset
                bg-white/20 border-l-4 border-white/50 hover:border-pink-200 shadow-xl !no-underline
                ${props.class || ""}`}>
        <div class="flex flex-row gap-2 w-full text-white/80 group-hover:text-pink-200
                    text-sm lg:text-base">
            <p>{props.repo.owner} / <span class="font-semibold">{props.repo.name}</span></p>
            <div class="grow"/>
            <OcLinkexternal2 size={20} color="#FFFFFF" class="opacity-60 hidden md:block"/>
        </div>
        <p class="text-xs lg:text-sm font-normal opacity-70">{props.repo.description}</p>

        <div class="grow"/>
        <div class="flex flex-row flex-wrap items-center gap-x-4 gap-y-2
                    opacity-60 font-normal text-center text-nowrap
                    text-xs md:text-sm">
            <Show when={props.repo.language && LANGUAGE_COLORS[props.repo.language]}>
                <div class="flex flex-row gap-2 items-center">
                    <div class="rounded-full brightness-125 size-3.5 md:size-4"
                         style={`background-color: ${LANGUAGE_COLORS[props.repo.language!!]}`}/>
                    <p>{props.repo.language}</p>
                </div>
            </Show>

            <Link url={props.repo.url + "/stargazers"} class="!text-white !no-underline">
                <div class="flex flex-row gap-2 items-center hover-offset">
                    <OcStarfill2
                        size={20}
                        color="#E3B341"
                        class="align-middle size-4 md:size-auto"
                        style={{ "filter": "drop-shadow(0px 0px 4px #E3B34188)" }}/>
                    <p class="!text-white !no-underline">{humanize(props.repo.stars)}</p>
                </div>
            </Link>

            <Show when={props.repo.license}>
                <Link noReferrer newSite
                      url={`https://spdx.org/licenses/preview/${props.repo.license}`}
                      class="!text-white !no-underline">
                    <div class="flex flex-row gap-2 items-center">
                        <OcLaw2
                            size={20}
                            color="#FFFFFF"
                            class="size-4 md:size-auto"/>
                        <p>{props.repo.license}</p>
                    </div>
                </Link>
            </Show>
        </div>
    </a>
}

export function ProjectsSection(props: ClassProps): JSX.Element {
    const [cachingFetcher] = makeCache(() => fetchRepositories(PROJECT_REPOS), {
        expires: 2.16e7, // 6 hours
        storage: window.localStorage,
        sourceHash: () => "projects",
    });
    const [repos] = createResource(cachingFetcher, {
        initialValue: hardcodedRepositoriesData,
    });

    return <Show when={repos()?.length}>
        <Section title="Projects" class={props.class}>
            <div class="flex flex-row flex-wrap justify-center gap-1 lg:gap-4">
                <For each={repos()}>{repo =>
                    <ProjectRepo
                        repo={repo}
                        class="grow max-w-150 md:min-w-100 xl:min-w-120 onload-animation"/>
                }</For>
            </div>
        </Section>
    </Show>;
}
