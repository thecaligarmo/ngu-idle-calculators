import Container from "./container";
import ContentSection from "./contentSection";
import ContentSectionWithData from "./contentSectionWithData";

export default function Content({children, prechildren, title, infoRequired, infoChildren, extraRequired, extraChildren}) {
    return (
        <Container title={title}>
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
        </Container>
    )
}