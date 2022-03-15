import { useRouter } from 'next/router';

function RedirectButton({ children, href }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <button className="px-2" href={href} onClick={handleClick}>
            <span className="px-2 rounded transition-all shadow-md bg-blue-400 shadow-cyan-800/50 hover:bg-blue-500">
                {children}
            </span>
        </button>
    );
}

export default RedirectButton;
