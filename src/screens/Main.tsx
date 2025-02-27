import { JSX } from 'solid-js';
import { NAME_IPA_READING, URLS } from "../constants";
import { Link } from "../components/Link";
import { ClassProps } from "../components/ClassProps";
import { AllBadges } from "../components/Badges";
import { BlogSection } from "../components/BlogPosts";
import Email from "../components/Email";

function Main(props: ClassProps): JSX.Element {
    return <div class={`text-gray-200 text-base h-screen w-screen ${props.class || ""}`}>
        <div class="flex min-h-full pt-16 pb-30">
            <div class="flex flex-col space-y-10 grow">
                <div class="self-center max-w-200 mx-10">
                    <Bio/>
                </div>

                <Divider class="mx-6"/>

                <div class="flex flex-row flex-wrap justify-evenly gap-x-10 gap-y-5 min-h-max px-8">
                    <BlogSection/>
                </div>

                <div class="grow"/>
                <Divider class="mx-6"/>
                <AllBadges class="mx-10"/>
            </div>

            <Footer class="fixed bottom-0"/>
        </div>
    </div>;
}


function Divider(props: ClassProps): JSX.Element {
    return <div class={`h-[1px] bg-white opacity-30 ${props.class || ""}`}/>;
}

function Bio(): JSX.Element {
    return <>
        <div class="flex flex-row flex-wrap gap-4 items-center mb-5">
            <p class="text-5xl font-light">hi, i'm <span class="italic">
                <span class="text-pink-300 font-normal">rushii</span>
                !
            </span></p>
            <Link noReferrer
                  url={URLS.NameIpaReader}
                  class="text-nowrap text-2xl font-semibold text-gray-300
                         transition-colors hover:text-pink-100
                         no-underline hover-offset">
                {NAME_IPA_READING}
                {/*Add a question mark with tooltip explaining what this is*/}
            </Link>
        </div>
        <p>I'm a developer on the pacific coast.</p>
        <br/>
        <p>
            I love working with <Link url={URLS.Kotlin}>Kotlin</Link> and <Link url={URLS.Rust}>Rust</Link>, making
            apps with <Link url={URLS.Compose}>Jetpack Compose</Link>, and reverse-engineering/modding Android apps.
        </p>
        <p class="mt-3.5">I am available for jobs/internships/freelancing. Please contact me at <Email/>.</p>
    </>
}

function Footer(props: ClassProps): JSX.Element {
    return <>
        <div class={`flex flex-col h-20 w-full items-center
                    text-xs text-gray-300 font-bold ${props.class || ""}`}>
            <p>rushii © All rights reserved</p>
            <Link url={URLS.WebsiteRepo} class="">Source Code <span class="text-red-500">❤️</span> GitHub</Link>
        </div>
    </>
}

export default Main;
