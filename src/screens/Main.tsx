import { JSX } from 'solid-js';
import { NAME_IPA_READING, PROJECT_REPOS, URLS } from "../constants";
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
            <div class="flex flex-col pt-16 grow gap-y-16 min-h-full">
                <div class="flex flex-row flex-wrap self-center gap-14 mx-10">
                    <Bio class="min-w-2/3 grow flex-1/6"/>
                    <Socials class="flex-2 md:mx-10"/>
                </div>

                <Divider class="mx-10 hidden md:block"/>

                <div class="flex flex-row flex-wrap min-h-max gap-10
                            px-4 md:px-16 3xl:justify-center">
                    <ProjectsSection repos={PROJECT_REPOS} class="3xl:max-w-1/2"/>
                    <BlogSection class="3xl:max-w-1/3"/>
                </div>

                <Divider class="mx-10 grow"/>
                <div class="flex flex-col self-center gap-y-6 mx-10
                            lg:max-w-3/4 2xl:max-w-2/3 3xl:max-w-1/2">
                    <AllBadges/>
                    <AllProfileBadges/>
                </div>
            </div>

            <Footer class="my-10"/>
        </div>
    </div>;
}

function Bio(props: ClassProps): JSX.Element {
    return <div class={`flex flex-col gap-0 max-w-200 select-text ${props.class || ""}`}>
        <div class="flex flex-row flex-wrap gap-4 items-center mb-5">
            <p class="text-5xl font-light">hi, i'm <span class="italic">
                <span class="text-pink-300 font-normal">rushii</span>
                !
            </span></p>
            <Link noReferrer
                  url={URLS.NameIpaReader}
                  class="text-nowrap text-2xl font-semibold text-gray-300
                         transition-colors hover:text-pink-100
                         no-underline hover-offset
                         hidden md:block">
                {NAME_IPA_READING}
            </Link>
        </div>
        <p>I'm a developer on the pacific coast.</p>
        <br/>
        <p>
            I love working with <Link url={URLS.Kotlin}>Kotlin</Link> and <Link url={URLS.Rust}>Rust</Link>, making
            apps with <Link url={URLS.Compose}>Jetpack Compose</Link>, and reverse-engineering/modding Android apps.
        </p>
        <p class="mt-3.5">I am available for jobs/internships/freelancing. Please contact me at <Email/>.</p>
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
