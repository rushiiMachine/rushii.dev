import { JSX } from 'solid-js';
import { GITHUB_PROFILE_URL } from "./constants";
import { Link } from "./Link";
import { Socials } from "./Socials";

function App(): JSX.Element {
    return <>
        <div class="w-screen h-screen flex flex-col pt-16 pl-16 pr-16 site-background">
            <div class="flex flex-col space-y-10 h-full pt-[2%] text-gray-200 text-base">
                <div class="flex justify-between align-top pl-[25%] pr-[25%]">
                    <div class="grow">
                        <Bio/>
                    </div>
                    <Socials/>
                </div>

                <Divider/>

                <div class="flex justify-evenly space-x-20 h-full pl-5 pr-5">

                    <div class="backdrop-brightness-[1.8] w-full rounded-md hover-offset hover:backdrop-brightness-[1.9]"/>
                    <div class="backdrop-brightness-[1.8] w-full rounded-md hover-offset hover:backdrop-brightness-[1.9]"/>
                    <div class="backdrop-brightness-[1.8] w-full rounded-md hover-offset hover:backdrop-brightness-[1.9]"/>
                </div>
            </div>
            <Footer/>
        </div>
    </>;
}

function Divider(): JSX.Element {
    return <div class="h-[1px] bg-white opacity-30"/>;
}

function Bio(): JSX.Element {
    return <div>
        <div class="flex space-x-8 items-center mb-5">
            <p class="text-5xl font-semibold">Hi, I'm {" "}
                <span class="text-pink-300 font-bold">rushii</span>!</p>
            <Link secure noReferrer
                  url="http://ipa-reader.xyz/?text=%2Fru%CB%90%CA%83i%2F"
                  class="text-nowrap text-2xl font-semibold text-gray-300
                         transition-colors hover:text-pink-100
                         no-underline hover-offset">
                /ruːʃi/
            </Link>
        </div>
        <p>I'm a self-taught student developer living on the US west coast.</p>
        <p>I love modding/reverse engineering Android apps, writing apps with {" "}
            <Link secure url="https://developer.android.com/develop/ui/compose">Jetpack Compose</Link>,
            and working with <Link secure url="https://kotlinlang.org/">Kotlin</Link> and {" "}
            <Link secure url="https://www.rust-lang.org/">Rust</Link>.</p>
        <p class="mt-3.5">You can find me in various communities you've probably never heard of.</p>
        <p class="mt-3.5">I am available for freelance work/jobs/internships.</p>
    </div>
}

function Footer(): JSX.Element {
    return <>
        <div class="h-20 w-full flex flex-col justify-center items-center text-center text-xs text-gray-300 font-bold">
            <p>rushii © All rights reserved</p>
            <Link url={`${GITHUB_PROFILE_URL}/rushii.dev`}>Source Code <span
                class="text-red-500">❤️</span> GitHub</Link>
        </div>
    </>
}

export default App;
