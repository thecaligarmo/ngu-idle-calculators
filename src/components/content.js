import ContentSection from "./contentSection";
import ContentSectionWithData from "./contentSectionWithData";

export default function Content({children, prechildren, title, infoRequired, infoChildren, extraRequired, extraChildren}) {
    return (
        <main className="w-3/4 mx-auto pt-10">
            <h2 className="text-4xl mb-5 border-b border-black dark:border-white font-bold">{title}</h2>
            {prechildren}
            <ContentSectionWithData idKey="player" title="Player Info" data={infoRequired}>
                {infoChildren}
            </ContentSectionWithData>
            <ContentSectionWithData idKey="extra" title="Extra Info" data={extraRequired}>
                {extraChildren}
            </ContentSectionWithData>
            <ContentSection title="Information">
                <div id="content" className="clear-both">
                    {children}
                </div>
            </ContentSection>
        </main>
    )
}