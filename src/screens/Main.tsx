import { JSX, ParentProps } from 'solid-js';
import { NAME_IPA_READING, URLS } from "../constants";
import { Link } from "../components/Link";
import { ClassProps } from "../components/ClassProps";
import { Socials } from "../components/Socials";
import { AllBadges } from "../components/Badges";

function Main(): JSX.Element {
    return <div class="bg-black text-gray-200 text-base">
        <div class="min-w-screen min-h-screen site-background pt-16 pb-20">
            <div class="flex flex-col h-full space-y-10 ml-10 mr-10">
                <div class="flex justify-center self-center space-x-8">
                    <div class="grow max-w-150">
                        <Bio/>
                    </div>
                    <Socials/>
                </div>

                <Divider/>

                <AllBadges class="ml-5 mr-5"/>

                <div class="flex flex-wrap justify-evenly gap-x-10 gap-y-5 min-h-max pl-3 pr-3">
                    <InfoSection title="Projects"/>
                    <InfoSection title="Libraries"/>
                </div>
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
        <div class={"flex flex-col justify-start gap-y-4 grow basis-40 " + props.class || ""}>
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
        <div class="flex items-center mb-5">
            <p class="text-5xl font-semibold">Hi, I'm <span class="italic">
                <span class="text-pink-300 font-bold">rushii</span>
                !
            </span></p>
            <span class="min-w-4 max-w-9 grow"/>
            <Link noReferrer
                  url={URLS.NameIpaReader}
                  class="text-nowrap text-2xl font-semibold text-gray-300
                         transition-colors hover:text-pink-100
                         no-underline hover-offset">
                {NAME_IPA_READING}
            </Link>
        </div>
        <p>I'm a self-taught developer living on the US west coast.</p>
        <br/>
        <p>
            I love modding & reverse engineering Android apps,
            writing apps with <Link url={URLS.Compose}>Jetpack Compose</Link>,
            and working with <Link url={URLS.Kotlin}>Kotlin</Link> and <Link url={URLS.Rust}>Rust</Link>.
        </p>
        <p class="mt-3.5">I am available for jobs/internships/freelancing, etc.</p>
    </>
}

function Footer(props: ClassProps): JSX.Element {
    return <>
        <div class={`h-20 w-full 
                    flex flex-col justify-center text-center
                    text-xs text-gray-300 font-bold ` + props.class}>
            <p>rushii © All rights reserved</p>
            <Link url={URLS.WebsiteRepo}>Source Code <span class="text-red-500">❤️</span> GitHub</Link>
        </div>
    </>
}

export default Main;
