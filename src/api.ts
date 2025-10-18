import { URLS } from "./constants";
import { Endpoints } from "@octokit/types";

////// Personal Blog API //////

export interface BlogPostData {
    title: string;
    summary: string;
    tags: string[];
    published: string;
    url: string;
}

export async function fetchBlogPosts(): Promise<BlogPostData[]> {
    const json = await fetch(URLS.BlogPosts)
        .then(res => res.json() as Promise<any>);

    const posts: BlogPostData[] = json.map((post: any) => ({
        title: post.title,
        summary: post.description,
        published: post.published,
        tags: post.tags,
        url: URLS.Blog + post.link,
    }));

    // Sort descending by time published
    posts.sort(({ published: a }, { published: b }) =>
        new Date(b).getTime() - new Date(a).getTime());

    return posts;
}

////// Github API //////

type GetUserRepoType = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type GetUserReposType = Endpoints["GET /users/{username}/repos"]["response"]["data"];

export type RepositoryName = `${string}/${string}`;

export interface Repository {
    owner: string;
    name: string;
    description: string | null;
    url: string;
    license: string | null;
    language: string | null;
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
    }, {} as Record<string, string[]>);

    const promises: Promise<Repository[]>[] = [];

    for (const [owner, repos] of Object.entries(resourceOwners)) {
        const url: string = repos.length === 1
            ? `https://api.github.com/repos/${owner}/${repos[0]}?per_page=100&sort=created&direction=asc`
            : `https://api.github.com/users/${owner}/repos?per_page=100&sort=created&direction=asc`;

        const token = import.meta.env.VITE_GITHUB_API_TOKEN;
        const resp = fetch(url, {
            headers: {
                "Content-Type": "application/vnd.github+json",
                "User-Agent": "rushii.dev",
                "X-GitHub-Api-Version": "2022-11-28",
                ...(token && {
                    "Authorization": `Bearer ${token}`,
                }),
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
                    description: repo.description ?? null,
                    url: repo.html_url,
                    license: repo.license?.spdx_id ?? null,
                    language: repo.language ?? null,
                    stars: repo.stargazers_count ?? 0,
                }));
        })

        promises.push(parsed);
    }

    // Flatten and sort by stars descending
    return Promise.all(promises)
        .then(repos => repos.flat().sort((a, b) => b.stars - a.stars));
}
