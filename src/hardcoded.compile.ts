import { PROJECT_REPOS } from "./constants";
import { fetchBlogPosts, fetchRepositories } from "./api";

export const hardcodedBlogData = await fetchBlogPosts();
export const hardcodedRepositoriesData = await fetchRepositories(PROJECT_REPOS);
