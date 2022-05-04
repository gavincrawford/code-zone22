import { useCookies } from "react-cookie";

function Submit() {
    const [cookie, setCookie] = useCookies(["user"]);
    const user = cookie.user ? true : false;
    if (user) {
        return (<button type="submit" className="rounded bg-blue-200 px-4">Submit</button>);
    } else {
        return (<>Please log in.</>);
    }
}

export default Submit;
