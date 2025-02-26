import { BadgeData } from "./components/Badges";
import { shuffleArray } from "./utils";

export const NAME_IPA_READING = "/ruːʃi/";

export const URLS = {
    GithubProfile: "https://github.com/rushiiMachine",
    WebsiteRepo: "https://github.com/rushiiMachine/rushii.dev",
    Blog: "https://blog.rushii.dev",
    NameIpaReader: "http://ipa-reader.xyz/?text=%2Fru%CB%90%CA%83i%2F",

    Compose: "https://developer.android.com/develop/ui/compose",
    Kotlin: "https://kotlinlang.org",
    Rust: "https://www.rust-lang.org",
}

export const DEVELOPER_BADGES: BadgeData[] = shuffleArray([
    //////////// Local badges ////////////
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
        linkUrl: "https://shoritsu.moe/",
    },
    //////////// Remote badges ////////////
    {
        name: "Vendicated",
        badgeUrl: "https://github.com/Vendicated/Vendicated/assets/45497981/5794a4e1-292f-46cc-af3a-b33a27a2f15e",
        linkUrl: "https://vendicated.dev",
    },
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
    }
]);
