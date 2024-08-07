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
    // console.log(extraRequired, extraRequired[0].length, _.isEqual(extraRequired, [[]]));
    return (
        <Container title={title}>
            {prechildren}
            {!_.isEqual(extraRequired, [[]])
                    ? <ContentSectionWithData
                        idKey="extra"
                        title="Required Info"
                        data={extraRequired}
                        inputChildren={extraInputChildren}
                        listChildren={extraListChildren}
                        description="Double check this info to make sure everything is the way you want."
                        >
                            {extraChildren}
                        </ContentSectionWithData>
                : null
            }
            <ContentSectionWithData
                idKey="player"
                title="Player Info"
                data={infoRequired}
                description="This info is auto-generated from your save file. To see calculations, check out the 'Stats' page."
                >
                {infoChildren}
            </ContentSectionWithData>
            
            <ContentSection title="Information">
                <div id="content" className="clear-both">
                    {children}
                </div>
            </ContentSection>
        </Container>
    )
}