import { ReactNode } from "react";
import Container from "./container";
import ContentSection from "./contentSection";
import ContentSectionWithData from "./contentSectionWithData";
import _ from "lodash";

interface ContentProps {
    children : ReactNode;
    prechildren?: ReactNode;
    title: string;
    infoRequired: any;
    infoChildren?: ReactNode;
    extraRequired: any;
    extraChildren?: ReactNode;
    extraInputChildren?: ReactNode;
    extraListChildren?: ReactNode;
}

export default function Content({children, prechildren, title, infoRequired, infoChildren, extraRequired, extraChildren, extraInputChildren, extraListChildren} : ContentProps) {
    return (
        <Container title={title}>
            {prechildren}
            <ContentSectionWithData idKey="player" title="Player Info" data={infoRequired}>
                {infoChildren}
            </ContentSectionWithData>
            <ContentSectionWithData idKey="extra" title="Extra Info" data={extraRequired} inputChildren={extraInputChildren} listChildren={extraListChildren}>
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