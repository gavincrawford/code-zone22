import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
    // Remove cuser cookie and reroute to home
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    const router = useRouter();

    removeCookie("user");

    useEffect(() => {
        router.push("/");
    }, []);

    return (<></>);

};

export default Logout;
