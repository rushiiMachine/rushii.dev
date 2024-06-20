import { JSX, ParentProps } from 'solid-js';
import { URLS } from "./constants";
import { Link } from "./Link";
import { ClassProps } from "./Utils";
import { Socials } from "./Socials";

function App(): JSX.Element {
    return <div class="min-w-screen min-h-screen site-background p-16 pb-20">
        <div class="flex flex-col h-full space-y-10 text-gray-200 text-base">
            <div class="flex justify-center align-top space-x-8 pl-[25%]">
                <div class="grow">
                    <Bio/>
                </div>
                <Socials/>
                <span class="min-w-10 max-w-[25%] grow"/>
            </div>

            <Divider/>

            <div class="flex flex-wrap justify-evenly gap-x-10 gap-y-5 min-h-max pl-3 pr-3">
                <InfoSection title="Projects"/>
                <InfoSection title="Libraries"/>
                <InfoSection title="Contact Me"/>
            </div>
        </div>
        <Footer class="fixed bottom-0"/>
    </div>;
}

interface InfoSectionProps extends ParentProps, ClassProps {
    title: string,
}

function InfoSection(props: InfoSectionProps): JSX.Element {
    return <>
        <div class={"flex flex-col justify-start gap-y-4 grow basis-40 max-w-1/3 " + props.class || ""}>
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
            <p class="text-5xl font-semibold">Hi, I'm <span class="text-pink-300 font-bold">rushii</span>!</p>
            <span class="min-w-4 max-w-9 grow"/>
            <Link secure noReferrer
                  url={URLS.NameIpaReader}
                  class="text-nowrap text-2xl font-semibold text-gray-300
                         transition-colors hover:text-pink-100
                         no-underline hover-offset">
                /ruːʃi/
            </Link>
        </div>
        <p>I'm a self-taught student developer living on the US west coast.</p>
        <p>
            I love modding/reverse engineering Android apps,
            writing apps with <Link secure url={URLS.Compose}>Jetpack Compose</Link>,
            and working with <Link secure url={URLS.Kotlin}>Kotlin</Link> and <Link secure url={URLS.Rust}>Rust</Link>.
        </p>
        <p class="mt-3.5">You can find me in various communities you've probably never heard of.</p>
        <p class="mt-3.5">I am available for freelance work/jobs/internships.</p>
    </>
}

function Footer(props: ClassProps): JSX.Element {
    return <>
        <div class={`h-20 w-full 
                    flex flex-col justify-center items-center text-center
                    text-xs text-gray-300 font-bold ` + props.class}>
            <p>rushii © All rights reserved</p>
            <Link url={URLS.WebsiteRepo}>Source Code <span class="text-red-500">❤️</span> GitHub</Link>
        </div>
    </>
}

export default App;
