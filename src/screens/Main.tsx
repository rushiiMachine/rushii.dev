import { JSX, ParentProps } from 'solid-js';
import { NAME_IPA_READING, URLS } from "../constants";
import { Link } from "../components/Link";
import { ClassProps } from "../components/ClassProps";
import { AllBadges } from "../components/Badges";
import { BlogSection } from "../components/BlogPosts";
import Email from "../components/Email";

function Main(): JSX.Element {
    return <div class="bg-black text-gray-200 text-base">
        <div class="min-w-screen min-h-screen site-background pt-16 pb-20">
            <div class="flex flex-col h-full space-y-10 mx-10">
                <div class="self-center max-w-200">
                    <Bio/>
                </div>

                <Divider/>

                <div class="flex flex-wrap justify-evenly gap-x-10 gap-y-5 min-h-max px-3">
                    <InfoSection title="Projects"/>
                </div>

                <Divider/>
                <AllBadges/>

            </div>

            <Footer class="fixed bottom-0"/>
        </div>
    </div>;
}

interface InfoSectionProps extends ParentProps, ClassProps {
    title: string,
}

function InfoSection(props: InfoSectionProps): JSX.Element {
    return <>
        <div class={`flex flex-col justify-start gap-y-4 basis-200 ${props.class || ""}`}>
            <p class="text-3xl font-extralight ms-2">{props.title}</p>
            <div class="backdrop-brightness-[1.8] grow hover:backdrop-brightness-[1.9]
                        rounded-md hover-offset h-[100vh]">
                {props.children}
            </div>
        </div>
    </>;
}

function Divider(): JSX.Element {
    return <div class="h-[1px] bg-white opacity-30"/>;
}

function Bio(): JSX.Element {
    return <>
        <div class="flex flex-row flex-wrap gap-8 items-center mb-5">
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
        <p>I'm a developer living on the pacific coast.</p>
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
        <div class={`h-20 w-full 
                    flex flex-col justify-center text-center
                    text-xs text-gray-300 font-bold ${props.class || ""}`}>
            <p>rushii © All rights reserved</p>
            <Link url={URLS.WebsiteRepo}>Source Code <span class="text-red-500">❤️</span> GitHub</Link>
        </div>
    </>
}

export default Main;
