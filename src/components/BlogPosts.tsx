import { createMemo, createResource, For, JSX, Show } from "solid-js";
import { Link } from "./Link";
import { URLS } from "../constants";
import { makeCache } from "@solid-primitives/resource";
import { ClassProps } from "./ClassProps";
import { Section } from "./Section";

export interface BlogPostData {
    title: string;
    summary: string;
    tags: string[];
    published: string;
    url: string;
}

export const fetchBlogPosts: () => Promise<BlogPostData[]> = async () => {
    const json = await fetch(URLS.BlogPosts)
        .then(res => res.json() as Promise<any>);

    const posts: BlogPostData[] = json.map(post => ({
        title: post.title,
        summary: post.description,
        published: post.published,
        tags: post.tags,
        url: URLS.Blog + post.link,
    }));

    // Sort descending by time published
    posts.sort(({ published: a }, { published: b }) =>
        new Date(a).getTime() - new Date(b).getTime());

    return posts;
};

function BlogPost(props: { post: BlogPostData } & ClassProps): JSX.Element {
    const timeFormatted = createMemo(() => {
        return new Date(props.post.published).toLocaleString(undefined, {
            year: 'numeric',
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    });

    return <a href={props.post.url}
              aria-label="A blog post"
              class={`!no-underline
                      group flex flex-col gap-3 p-8 rounded-xl hover-offset
                      bg-white/15 border-l-4 border-white/50 hover:border-pink-200 shadow-xl 
                      ${props.class || ""}`}>
        <time class="text-sm font-semibold opacity-50 mb-2"
              dateTime={props.post.published}>
            {timeFormatted()}
        </time>
        <p class="text-2xl font-light group-hover:text-pink-200">{props.post.title}</p>
        <p class="text-sm font-normal opacity-60">{props.post.summary}</p>

        <Show when={props.post.tags.length > 0}>
            <div class="flex flex-row flex-wrap gap-2 mt-4">
                <For each={props.post.tags}>{tag =>
                    <div class="px-2 py-1.5 rounded-lg hover-offset !no-underline text-sm bg-white/20">
                        {tag}
                    </div>
                }</For>
            </div>
        </Show>
    </a>;
}

export function BlogSection(props: ClassProps): JSX.Element {
    const [cachingFetcher] = makeCache(fetchBlogPosts, {
        expires: 8.64e+7, // 1 Day
        storage: window.localStorage,
        sourceHash: () => "blogs",
    });
    const [posts] = createResource(cachingFetcher);

    return <Show when={posts()?.length}>
        <Section title="Blog" class={props.class}>
            <div class="flex flex-col items-center w-full gap-1 lg:gap-4">
                <For each={posts()}>
                    {(post, idx) =>
                        <Show when={idx() < 8}>
                            <BlogPost post={post} class="w-full max-w-190 md:min-w-100 xl:min-w-120"/>
                        </Show>
                    }
                </For>
            </div>
            <Show when={(posts()?.length ?? 0) > 8}>
                <Link url={URLS.Blog}
                      class="self-center py-2 px-3 mt-4 max-w-max rounded-md hover-offset
                         !no-underline bg-white/20 text-white/80">
                    See More
                </Link>
            </Show>
        </Section>
    </Show>;
}
