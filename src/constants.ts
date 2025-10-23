import { BadgeData } from "./components/Badges";
import { shuffleArray } from "./utils";
import { RepositoryName } from "./api";

const EMAIL_BASE64 = compileTime(btoa("contact@rushii.dev"));
export const EMAIL = atob(EMAIL_BASE64);

export const NAME_IPA_READING = "/ruːʃi/";

export const URLS = {
    GithubProfile: "https://github.com/rushiiMachine",
    GithubSponsor: "https://github.com/sponsors/rushiiMachine",
    WebsiteRepo: "https://github.com/rushiiMachine/rushii.dev",
    BadgesInfo: "https://github.com/rushiiMachine/rushii.dev/blob/master/assets/BadgesInfo.md",
    Blog: "https://blog.rushii.dev",
    BlogPosts: "https://blog.rushii.dev/posts.json",
    NameIpaReader: "https://ipa-reader.com/?text=ru%CB%90%CA%83i&voice=Joey",

    Compose: "https://developer.android.com/develop/ui/compose",
    Kotlin: "https://kotlinlang.org",
    Rust: "https://www.rust-lang.org",

    Aliucord: "https://github.com/Aliucord/Aliucord",
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
    {
        name: "Wing",
        badgeUrl: "/88x31/wing.gif",
        linkUrl: "https://wingio.xyz",
    },
    {
        name: "Chloe",
        badgeUrl: "/88x31/sapphic.png",
        linkUrl: "https://sapphic.moe",
    },
    {
        name: "Lewisakura",
        badgeUrl: "/88x31/lewisakura.png",
        linkUrl: "https://lewisakura.moe",
    },
    {
        name: "rini",
        badgeUrl: "/88x31/rinicide.png",
        linkUrl: "https://github.com/rniii/rinici.de",
    },
    {
        name: "Xinto",
        badgeUrl: "/88x31/xinto.png",
        linkUrl: "https://xinto.dev",
    },
    {
        name: "Vap",
        badgeUrl: "/88x31/vap.png",
        linkUrl: "https://github.com/vap0r1ze",
    },
    {
        name: "AAgaming",
        badgeUrl: "/88x31/aagaming.png",
        linkUrl: "https://aagaming.me",
    },
    {
        name: "Paige",
        badgeUrl: "/88x31/paige.gif",
        linkUrl: "https://codeberg.org/paige",
    },
    {
        name: "lívia",
        badgeUrl: "/88x31/livia.gif",
        linkUrl: "https://acpi.at/",
    },
    // {
    //     name: "mantikafasi",
    //     badgeUrl: "https://avatars.githubusercontent.com/u/67705577?v=4", // TODO
    //     linkUrl: "https://github.com/mantikafasi",
    // },
    {
        name: "zt",
        badgeUrl: "/88x31/zt.png",
        linkUrl: "https://zt64.dev",
    },
    {
        name: "Rosie",
        badgeUrl: "/88x31/rosie.png",
        linkUrl: "https://github.com/acquitelol",
    },
]);

export const DEVELOPER_PROFILES: BadgeData[] = shuffleArray([
    {
        name: "Dolfies",
        badgeUrl: "https://avatars.githubusercontent.com/u/47677887?v=4",
        linkUrl: "https://github.com/dolfies",
    },
    {
        name: "Dziurwa",
        badgeUrl: "https://avatars.githubusercontent.com/u/54191536?v=4",
        linkUrl: "https://github.com/Dziurwa14",
    },
    {
        name: "fawn",
        badgeUrl: "https://avatars.githubusercontent.com/u/36301891?v=4",
        linkUrl: "https://fawn.moe",
    },
    {
        name: "fres",
        badgeUrl: "https://avatars.githubusercontent.com/u/126067139?v=4",
        linkUrl: "https://github.com/fres621",
    },
    {
        name: "Juby",
        badgeUrl: "https://avatars.githubusercontent.com/u/31005896?v=4",
        linkUrl: "https://github.com/juby210"
    },
    {
        name: "OmegaSunkey",
        badgeUrl: "https://omegasunkey.pages.dev/avatar.webp",
        linkUrl: "https://omegasunkey.pages.dev/",
    },
    {
        name: "llsc",
        badgeUrl: "https://avatars.githubusercontent.com/u/42747613?v=4",
        linkUrl: "https://llsc12.me",
    },
    {
        name: "Canny",
        badgeUrl: "https://avatars.githubusercontent.com/u/198346728?v=4",
        linkUrl: "https://github.com/Canny1913",
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
