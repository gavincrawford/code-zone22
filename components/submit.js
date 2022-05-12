import { useCookies } from "react-cookie";
import { RedirectButton } from "./button";

function Submit() {
    const [cookie, setCookie] = useCookies(["user"]);
    const user = cookie.user ? true : false;
    if (user) {
        return (<button type="submit" className="rounded bg-blue-200 px-4">Submit</button>);
    } else {
        return (<button type="submit" className="rounded bg-gray-200 px-4" disabled>Please log in.</button>);
    }
}

export default Submit;
