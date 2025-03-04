import { ClassProps } from "./ClassProps";
import { createResource, For, JSX, Show } from "solid-js";
import { Endpoints } from "@octokit/types";
import { OcLaw2, OcLinkexternal2, OcStarfill2 } from "solid-icons/oc";
import { Link } from "./Link";
import { makeCache } from "@solid-primitives/resource";
import { LANGUAGE_COLORS } from "../constants";
import { humanize } from "../utils";

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
        const url: string = repos.length == 1
            ? `https://api.github.com/repos/${owner}/${repos[0]}`
            : `https://api.github.com/users/${owner}/repos`;

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
    return <a href={props.repo.url} aria-label="A GitHub repository" class="!no-underline">
        <div class={`group flex flex-col gap-2 p-6 rounded-lg hover-offset
                     bg-white/20 border-l-4 border-white/30
                     ${props.class || ""}`}>
            <div class="flex flex-row gap-2 w-full text-white/80 group-hover:text-pink-200">
                <p>{props.repo.owner} / <span class="font-semibold">{props.repo.name}</span></p>
                <div class="grow"/>
                <OcLinkexternal2 size={24} color="#FFFFFF" class="opacity-60"/>
            </div>
            <p class="text-sm font-normal opacity-80">{props.repo.description}</p>

            <div class="flex flex-row gap-5 opacity-60 text-md font-normal mt-4 text-center">
                <Show when={props.repo.language && LANGUAGE_COLORS[props.repo.language]}>
                    <div class="flex flex-row gap-2 items-center">
                        <div class="rounded-full size-4"
                             style={`background-color: ${LANGUAGE_COLORS[props.repo.language]}`}/>
                        <p>{props.repo.language}</p>
                    </div>
                </Show>

                <Link url={props.repo.url + "/stargazers"} class="!text-white !no-underline">
                    <div class="flex flex-row gap-1 items-center">
                        <OcStarfill2 size={20} color="#E3B341" class="align-middle"/>
                        <p class="!text-white !no-underline">{humanize(props.repo.stars)}</p>
                    </div>
                </Link>

                <Show when={props.repo.license}>
                    <Link noReferrer newSite
                          url={`https://spdx.org/licenses/preview/${props.repo.license}`}
                          class="!text-white !no-underline">
                        <div class="flex flex-row gap-2 items-center">
                            <OcLaw2 size={20} color="#FFFFFF"/>
                            <p>{props.repo.license}</p>
                        </div>
                    </Link>
                </Show>
            </div>
        </div>
    </a>
}

export function ProjectsSection(props: { repos: RepositoryName[] } & ClassProps): JSX.Element {
    const [cachingFetcher] = makeCache(() => fetchRepositories(props.repos), {
        expires: 8.64e+7, // 1 Day
        storage: window.localStorage,
        storageKey: "CACHE_PROJECT_REPOS",
    });
    const [repos] = createResource(cachingFetcher);

    return <Show when={repos()?.length}>
        <div class="flex flex-col justify-start gap-y-4">
            <p class="text-3xl font-extralight">Projects</p>
            <div class="grid grid-cols-2 gap-6 min-w-max">
                <For each={repos()}>
                    {repo => <ProjectRepo repo={repo} class="basis-120 min-w-120"/>}
                </For>
            </div>
        </div>
    </Show>;
}
