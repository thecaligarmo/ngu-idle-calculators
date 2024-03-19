import ContentSection from "./contentSection";

export default function Content({children, title, infoRequired, infoChildren, extraRequired, extraChildren}) {
    return (
        <main className="w-3/4 mx-auto pt-10">
            <h2 className="text-4xl mb-10 border-b font-bold">{title}</h2>
            <ContentSection idKey="player" title="Player Info" data={infoRequired}>
                {infoChildren}
            </ContentSection>
            <ContentSection idKey="extra" title="Extra Info" data={extraRequired}>
                {extraChildren}
            </ContentSection>
            <section className="pt-5 clear-both">
                <h3 className="text-2xl underline">Information</h3>
                <div id="content" className="clear-both">
                    {children}
                </div>
            </section>
        </main>
    )
}