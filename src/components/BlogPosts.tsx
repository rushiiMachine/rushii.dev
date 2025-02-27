import { createResource, For, JSX, Show } from "solid-js";
import { Link } from "./Link";
import { URLS } from "../constants";

export interface BlogPostData {
    title: string;
    summary: string;
    tags: { name: string, url: string }[];
    published: Date;
    url: string;
}

export const fetchBlogPosts: () => Promise<BlogPostData[]> = async () => {
    const response = await fetch(URLS.BlogRSS);
    const text = await response.text();
    const xml = new window.DOMParser().parseFromString(text, "text/xml");
    const posts: BlogPostData[] = [];

    for (const entry of xml.querySelectorAll("entry")) {
        const tags = [];

        for (const tag of entry.querySelectorAll("category")) {
            tags.push({
                name: tag.getAttribute("term"),
                url: tag.getAttribute("scheme"),
            });
        }

        posts.push({
            title: entry.querySelector("title").textContent,
            summary: entry.querySelector("summary").textContent,
            tags,
            published: new Date(entry.querySelector("published").textContent),
            url: entry.querySelector("link").getAttribute("href"),
        });
    }

    // Sort descending by time published
    posts.sort(({ published: a }, { published: b }) =>
        b.getTime() - a.getTime());

    return posts;
};

function BlogPost(post: BlogPostData): JSX.Element {
    return <a href={post.url} aria-label="A blog post" class="!no-underline">
        <div class="group flex flex-col gap-3 p-8 rounded-xl hover-offset
                    bg-white/10 border-l-4 border-white/30">
            <time class="text-sm font-semibold opacity-50 mb-2"
                  dateTime={post.published.toJSON()}>
                {post.published.toLocaleString(undefined, {
                    year: 'numeric',
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                })}
            </time>
            <p class="text-2xl font-light group-hover:text-pink-200">{post.title}</p>
            <p class="text-sm font-normal opacity-60">{post.summary}</p>

            <Show when={post.tags.length > 0}>
                <div class="flex flex-row flex-wrap gap-2 mt-4">
                    <For each={post.tags}>{tag =>
                        <Link url={tag.url}
                              class="px-2 py-1.5 rounded-lg hover-offset !no-underline text-sm bg-white/20">
                            {tag.name}
                        </Link>
                    }</For>
                </div>
            </Show>
        </div>
    </a>;
}

export function BlogSection(): JSX.Element {
    const [posts] = createResource(fetchBlogPosts);

    return <Show when={posts()}>
        <div class="flex flex-col justify-start gap-y-4 basis-180">
            <p class="text-3xl font-extralight">Blog</p>
            <For each={posts()}>
                {(post, idx) =>
                    <Show when={idx() < 8}>
                        <BlogPost {...post}/>
                    </Show>
                }
            </For>
            <Show when={(posts()?.length ?? 0) > 8}>
                <Link url={URLS.Blog}
                      class="self-center py-2 px-3 mt-4 max-w-max rounded-md hover-offset
                         !no-underline bg-white/20 text-white/80">
                    See More
                </Link>
            </Show>
        </div>
    </Show>;
}
