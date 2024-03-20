import ContentSection from "./contentSection";
import ContentSectionWithData from "./contentSectionWithData";

export default function Container({children, title}) {
    return (
        <main className="w-3/4 mx-auto pt-10">
            <h2 className="text-4xl mb-5 border-b border-black dark:border-white font-bold">{title}</h2>
            {children}
        </main>
    )
}