export default function Footer() {
    return (
        <footer className="border-t border-black dark:border-white mt-10 py-5">
            <div className="w-3/4 mx-auto">
                <p className="float-left">Current version: {__APP_VERSION__}</p>
                <p className="float-right">&copy;{new Date().getFullYear()} by thecaligarmo</p>
            </div>
        </footer>
    );
}
