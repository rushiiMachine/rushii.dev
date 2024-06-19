import type { Component } from 'solid-js';
import { GITHUB } from "./constants";
import { Link } from "./Link";
import { OcMarkgithub2 } from "solid-icons/oc";

const App: Component = () => {
    return <>
        <div class="w-screen h-screen flex flex-col pt-16 pl-16 pr-16 site-background">
            <div class="flex flex-col space-y-5 grow pt-[5%] pl-[25%] pr-[25%] text-gray-200 text-base">
                <div class="flex justify-between align-top">
                    <div class="grow">
                        <Bio/>
                    </div>
                    <Socials/>
                </div>
                <Divider/>
            </div>
            <Footer/>
        </div>
    </>;
};

const Socials: Component = () => {
    return <>
        <div class="flex flex-col w-1/6 justify-evenly items-end pe-8">
            <a href={GITHUB} rel="noopener" referrerPolicy="strict-origin">
                <div class="group flex space-x-3 text-lg
                                        transition hover:-translate-y-0.5 hover:translate-x-0.5">
                    <OcMarkgithub2 size={32} color="#FFFFFF"/>
                    <p class="pt-1 underline-offset-2 text-pink-100 group-hover:underline group-hover:text-pink-300">GitHub</p>
                </div>
            </a>
        </div>
    </>
};

const Divider: Component = () => {
    return <div class="h-[1px] bg-white opacity-30"/>;
};

const Bio: Component = () => {
    return <div>
        <div class="flex space-x-8 items-center mb-5">
            <p class="text-5xl font-semibold">Hi, I'm {" "}
                <span class="text-pink-300 font-bold">rushii</span>!</p>
            <Link secure url="http://ipa-reader.xyz/?text=%2Fru%CB%90%CA%83i%2F">
                <span
                    class="text-xl text-gray-300 font-semibold hover:text-pink-100 transition-colors no-underline">/ruːʃi/</span>
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
};

const Footer: Component = () => {
    return <>
        <div class="h-20 w-full flex flex-col justify-center items-center text-center text-xs text-gray-300 font-bold">
            <p>rushii © All rights reserved</p>
            <Link url={`${GITHUB}/rushii.dev`}>Source Code <span class="text-red-500">❤️</span> GitHub</Link>
        </div>
    </>
};

export default App;
