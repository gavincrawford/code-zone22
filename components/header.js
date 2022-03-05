import RedirectButton from "./button";
import { useCookies } from "react-cookie";

function Header() {

    const [cookie, setCookie] = useCookies(["user"]);

    return (
        <div className="flex-col w-screen">
            <div className="text-size-4 bg-gray-200 text-black hover:bg-gray-500 hover:text-white transition-all p-2">
                <span className="px-6">CODE_COMP</span>
                {/* Buttons */}
                <RedirectButton href="/leaderboard">leaderboard</RedirectButton>
                <RedirectButton href="/">problems</RedirectButton>
                {
                    cookie.user
                    ?
                        <RedirectButton href="/logout">logout <span className="text-white">({cookie.user})</span></RedirectButton>
                    :
                        <RedirectButton href="/login">login/signup</RedirectButton>
                }
            </div>
        </div>
    );
}

export default Header;
