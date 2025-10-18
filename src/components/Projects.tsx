import { ClassProps } from "./ClassProps";
import { createResource, For, JSX, Show } from "solid-js";
import { Endpoints } from "@octokit/types";
import { OcLaw2, OcLinkexternal2, OcStarfill2 } from "solid-icons/oc";
import { Link } from "./Link";
import { makeCache } from "@solid-primitives/resource";
import { LANGUAGE_COLORS } from "../constants";
import { humanize } from "../utils";
import { Section } from "./Section";

type GetUserRepoType = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type GetUserReposType = Endpoints["GET /users/{username}/repos"]["response"]["data"];

export type RepositoryName = `${string}/${string}`;

export interface Repository {
    owner: string;
    name: string;
    description: string;
    url: string;
    license?: string;
    language?: string;
    stars: number;
}

export async function fetchRepositories(repositoryNames: RepositoryName[]): Promise<Repository[]> {
    // Group all the repository names by owner to group API calls.
    const resourceOwners: Record<string, string[]> = repositoryNames.reduce((all, current) => {
        const [owner, repo] = current.split("/");
        return {
            ...all,
            [owner]: (all[owner] ?? []).concat([repo]),
        };
    }, {});

    const promises: Promise<Repository[]>[] = [];

    for (const [owner, repos] of Object.entries(resourceOwners)) {
        const url: string = repos.length === 1
            ? `https://api.github.com/repos/${owner}/${repos[0]}?per_page=100&sort=created&direction=asc`
            : `https://api.github.com/users/${owner}/repos?per_page=100&sort=created&direction=asc`;

        const resp = fetch(url, {
            headers: {
                "Content-Type": "application/vnd.github+json",
                "User-Agent": "rushii.dev",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });

        const data: Promise<GetUserRepoType | GetUserReposType> = resp.then(r => r.json());

        const parsed: Promise<Repository[]> = data.then(data => {
            const wrapped = Array.isArray(data) ? data : [data];

            return wrapped
                .filter(repo => repositoryNames.includes(repo.full_name as RepositoryName))
                .map(repo => ({
                    owner: repo.owner.login,
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url,
                    license: repo.license?.spdx_id,
                    language: repo.language,
                    stars: repo.stargazers_count ?? 0,
                }));
        })

        promises.push(parsed);
    }

    // Flatten and sort by stars descending
    return Promise.all(promises)
        .then(repos => repos.flat().sort((a, b) => b.stars - a.stars));
}

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
                         style={`background-color: ${LANGUAGE_COLORS[props.repo.language]}`}/>
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

export function ProjectsSection(props: { repos: RepositoryName[] } & ClassProps): JSX.Element {
    const [cachingFetcher] = makeCache(() => fetchRepositories(props.repos), {
        expires: 8.64e+7, // 1 Day
        storage: window.localStorage,
        sourceHash: () => "projects",
    });
    const [repos] = createResource(cachingFetcher);

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
