import Header from "../components/header";
import RedirectButton from "../components/button";
import { useCookies } from "react-cookie";
import sha256 from "crypto-js/sha256";

const Signup = () => {

    const [cookie, setCookie] = useCookies(["user"]);

    const handleSignup = async (e) => {
        e.preventDefault();

        console.log(e);

        const username = e.target[0].value; 
        const password = sha256(e.target[1].value).toString();

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (data.success) {
            setCookie("user", data.name, { path: "/", maxAge: 21600 });
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    };

    return (
        <>
            <Header/>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignup}>
                        <input type="text" placeholder="username" className="bg-gray-200"></input>
                        <input type="password" placeholder="password" className="bg-gray-200"></input> 
                        <div className="p-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign up</button>
                        </div>
                    </form>
                    <RedirectButton href="/login">Or log in!</RedirectButton> {/* TODO this button kinda sucks, make it look better */}
                </div>
            </div>
        </>
    );
};

export default Signup;
