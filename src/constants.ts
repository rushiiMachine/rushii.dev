import { BadgeData } from "./components/Badges";
import { shuffleArray } from "./utils";
import { RepositoryName } from "./components/Projects";

// @ts-ignore
const EMAIL_BASE64 = compileTime(btoa("contact@rushii.dev"));
export const EMAIL = atob(EMAIL_BASE64);

export const NAME_IPA_READING = "/ruːʃi/";

export const URLS = {
    GithubProfile: "https://github.com/rushiiMachine",
    GithubSponsor: "https://github.com/sponsors/rushiiMachine",
    WebsiteRepo: "https://github.com/rushiiMachine/rushii.dev",
    BadgesInfo: "https://github.com/rushiiMachine/rushii.dev/blob/master/assets/BadgesInfo.md",
    Blog: "https://blog.rushii.dev",
    BlogRSS: "https://blog.rushii.dev/atom.xml",
    NameIpaReader: "https://ipa-reader.com/?text=ru%CB%90%CA%83i&voice=Joey",

    Compose: "https://developer.android.com/develop/ui/compose",
    Kotlin: "https://kotlinlang.org",
    Rust: "https://www.rust-lang.org",
}

export const PROJECT_REPOS: RepositoryName[] = shuffleArray([
    "Aliucord/Aliucord",
    "Aliucord/Manager",
    "MateriiApps/OpenCord",
    "rushiiMachine/aliucord-plugins",
    "rushiiMachine/caddy-ja3",
    "rushiiMachine/discord-dracula",
    "rushiiMachine/ktor-impersonate",
    "rushiiMachine/osu-patcher",
    "rushiiMachine/osu-switcher",
    "rushiiMachine/rust-gradle-plugin",
    "rushiiMachine/XSpoofSignatures",
    "rushiiMachine/zip-android",
]);

export const DEVELOPER_BADGES: BadgeData[] = shuffleArray([
    //////////// Local badges ////////////
    {
        name: "rushii",
        badgeUrl: "/88x31/rushii.webp",
        linkUrl: "https://rushii.dev",
    },
    {
        name: "Vencord",
        badgeUrl: "/88x31/vencord.webp",
        linkUrl: "https://vencord.dev",
    },
    {
        name: "NurMarvin",
        badgeUrl: "/88x31/nurmarvin.png",
        linkUrl: "https://nurmarv.in",
    },
    {
        name: "Maisy",
        badgeUrl: "/88x31/maisy.png",
        linkUrl: "https://maisy.moe",
    },
    {
        name: "Megu",
        badgeUrl: "/88x31/megu.png",
        linkUrl: "https://megu.dev",
    },
    {
        name: "khcrysalis",
        badgeUrl: "/88x31/samara.png",
        linkUrl: "https://khcrysalis.dev",
    },
    {
        name: "Shoritsu",
        badgeUrl: "/88x31/shoritsu.webp",
        linkUrl: "https://shoritsu.moe",
    },
    {
        name: "KrystalSkull",
        badgeUrl: "/88x31/krystalskull.gif",
        linkUrl: "https://krstlskll69.github.io",
    },
    {
        name: "py.on",
        badgeUrl: "/88x31/latte.png",
        linkUrl: "https://latte.party",
    },
    {
        name: "HAHALOSAH",
        badgeUrl: "/88x31/hhls.png",
        linkUrl: "https://hhls.xyz",
    },
    {
        name: "Vendicated",
        badgeUrl: "/88x31/vendicated.gif",
        linkUrl: "https://vendicated.dev",
    },
    //////////// Remote badges ////////////
    {
        name: "Wing",
        badgeUrl: "https://wingio.xyz/88x31/badge.gif",
        linkUrl: "https://wingio.xyz",
    },
    {
        name: "Chloe",
        badgeUrl: "https://sapphic.moe/buttons/friends/sapphic.png",
        linkUrl: "https://sapphic.moe",
    },
    {
        name: "Maggie",
        badgeUrl: "https://maggiepi.site/88x31s/maggie8831.gif",
        linkUrl: "https://maggiepi.site",
    },
    {
        name: "Lewisakura",
        badgeUrl: "https://lewisakura.moe/88x31.png",
        linkUrl: "https://lewisakura.moe",
    },
    {
        name: "rini",
        badgeUrl: "https://rinici.de/buttons/rinicide.png",
        linkUrl: "https://rinici.de",
    },
    {
        name: "livia",
        badgeUrl: "https://livia.my/static/57.gif",
        linkUrl: "https://livia.my",
    },
]);

/**
 * A limited subset of GitHub's language colors mapped by name.
 */
// Obtained from https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml
export const LANGUAGE_COLORS: Record<string, string> = {
    "C": "#555555",
    "C#": "#178600",
    "C++": "#f34b7d",
    "Elixir": "#6e4a7e",
    "Go": "#00ADD8",
    "Java": "#b07219",
    "JavaScript": "#f1e05a",
    "Kotlin": "#A97BFF",
    "Rust": "#dea584",
    "SCSS": "#c6538c",
    "TypeScript": "#3178c6",
}
