import { ClassProps } from "./ClassProps";
import { JSX } from "solid-js";
import { EMAIL } from "../constants";
import { Link } from "./Link";

/**
 * Obfuscated email link to subvert mail scrapers.
 */
function Email(props: ClassProps): JSX.Element {
    const [user, domain] = EMAIL.split('@');

    return <Link {...props}
                 url=""
                 onClick={() => window.open(`mailto:${EMAIL}`, "_blank")}>
        {user}@<span class="hidden">IGNOREME</span>{domain}
    </Link>
}

export default Email;
