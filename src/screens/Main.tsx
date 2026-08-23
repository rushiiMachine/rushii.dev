import { JSX } from 'solid-js';
import { NAME_IPA_READING, URLS } from "../constants";
import { Link } from "../components/Link";
import { ClassProps } from "../components/ClassProps";
import { AllBadges, AllProfileBadges } from "../components/Badges";
import { BlogSection } from "../components/BlogPosts";
import Email from "../components/Email";
import { ProjectsSection } from "../components/Projects";
import { Socials } from "../components/Socials";
import { Divider } from "../components/Divider";

function Main(props: ClassProps): JSX.Element {
    return <div class={`text-gray-200 text-base h-screen w-screen ${props.class || ""}`}>
        <div class="flex flex-col min-h-full">
            <div class="flex flex-col pt-16 gap-y-16 min-h-full">
                <div class="flex flex-row self-center gap-14 mx-10
                            flex-wrap lg:flex-nowrap">
                    <img width={256}
                         height={222}
                         alt="Mizuki stamp"
                         src="/mizuki_stamp_1.png"
                         class="mx-10 hidden xl:block
                                object-contain drop-shadow-red-200 drop-shadow-md"/>
                    <Bio/>
                    <Socials class="flex-1 mx-5"/>
                </div>

                <Divider class="mx-10 hidden md:block"/>

                <div class="flex flex-row flex-wrap min-h-max gap-10
                            px-4 md:px-16 3xl:justify-center">
                    <ProjectsSection class="3xl:max-w-1/2"/>
                    <BlogSection class="3xl:max-w-1/3"/>
                </div>

                <Divider class="mx-10 grow"/>
                <div class="flex flex-col self-center gap-y-6 mx-10
                            md:max-w-3/4 xl:max-w-2/3 2xl:max-w-1/2 3xl:max-w-2/5">
                    <AllBadges/>
                    <AllProfileBadges/>
                </div>
            </div>

            <Footer class="my-10"/>
        </div>
    </div>;
}

function Bio(props: ClassProps): JSX.Element {
    return <div class={`flex flex-col gap-4 max-w-200 select-text ${props.class || ""}`}>
        <div class="flex flex-row text-nowrap gap-4 items-center mb-5">
            <img width={32}
                 height={32}
                 alt={undefined}
                 src="/favicon.png"
                 class="max-w-none max-h-none drop-shadow-red-100 drop-shadow-sm"/>
            <p class="font-light text-4xl md:text-5xl">
                hii, i'm <span class="text-pink-300 font-normal">rushii</span>!
            </p>
            <Link noReferrer
                  url={URLS.NameIpaReader}
                  class="text-nowrap text-2xl font-semibold text-gray-300
                         transition-colors hover:text-pink-100
                         no-underline hover-offset
                         hidden md:block">
                {NAME_IPA_READING}
            </Link>
        </div>
        <p>I'm a software developer on the Pacific Coast, currently studying Computer Science.</p>
        <p>
            I love working with Android internals, modding apps, and developing utilities that improve UX.
            I like working with <Link url={URLS.Kotlin}>Kotlin</Link> and <Link url={URLS.Rust}>Rust</Link>, making
            Android apps with <Link url={URLS.Compose}>Jetpack Compose</Link>, and reverse-engineering.
        </p>
        <p>
            Most of my own projects are open-source, and I occasionally contribute back to projects that I use as well.
            Nowadays, I'm mainly working on <Link url={URLS.Aliucord}>Aliucord</Link>, an open-source mod for Discord's
            proprietary Android client. It currently has over 1+ million downloads and 300+ unique plugins contributed
            by dozens of developers. You can view some of my other projects below,
            or on my <Link url={URLS.GithubProfile}>Github</Link>.
        </p>
        <p class="mt-4">
            I am also looking for jobs, internships, and contract work in the Greater Seattle area.
            <br/>
            Please feel free to contact me at <Email/>
        </p>
    </div>
}

function Footer(props: ClassProps): JSX.Element {
    return <>
        <div class={`flex flex-col w-full items-center
                    text-xs text-gray-300 font-bold ${props.class || ""}`}>
            <p>rushii © All rights reserved</p>
            <Link url={URLS.WebsiteRepo}>Source Code <span class="text-red-500">❤️</span> GitHub</Link>
        </div>
    </>
}

export default Main;
