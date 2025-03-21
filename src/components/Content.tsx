import _ from "lodash";
import { ReactNode } from "react";
import Container from "./Container";
import ContentSection from "./ContentSection";
import ContentSectionWithData from "./ContentSectionWithData";
import { requiredDataType } from "@/helpers/types";

interface ContentProps {
    children: ReactNode;
    prechildren?: ReactNode;
    title: string;
    infoRequired: requiredDataType;
    infoChildren?: ReactNode;
    extraRequired: requiredDataType;
    extraPreChildren?: ReactNode;
    extraChildren?: ReactNode;
    extraInputChildren?: ReactNode;
    extraListChildren?: ReactNode;
    goRequired: requiredDataType;
    goChildren?: ReactNode;
}

export default function Content({
    children,
    prechildren,
    title,
    infoRequired,
    infoChildren,
    extraRequired,
    extraChildren,
    extraPreChildren,
    extraInputChildren,
    extraListChildren,
    goRequired,
    goChildren,
}: ContentProps): ReactNode {
    return (
        <Container title={title}>
            {prechildren}
            {!_.isEqual(extraRequired, [[]]) ? (
                <ContentSectionWithData
                    idKey="extra"
                    title="Required Info"
                    data={extraRequired}
                    preChildren={extraPreChildren}
                    inputChildren={extraInputChildren}
                    listChildren={extraListChildren}
                    description="Double check this info to make sure everything is the way you want."
                >
                    {extraChildren}
                </ContentSectionWithData>
            ) : null}

            {!_.isEqual(infoRequired, [[]]) ? (
                <ContentSectionWithData
                    idKey="player"
                    title="Player Info"
                    data={infoRequired}
                    description="This info is auto-generated from your save file. To see calculations, check out the 'Stats' page."
                >
                    {infoChildren}
                </ContentSectionWithData>
            ) : null}

            {!_.isEqual(goRequired, [[]]) ? (
                <ContentSectionWithData
                    idKey="gear-optimizer"
                    title="Gear Optimizer Changes"
                    data={goRequired}
                    defaultHide={true}
                    description="If the gear you want to use is different than the one you currently have on, use gear optimizer to get the change percents and input those percents here. If you edit the information in 'Player Info' make sure these are set to 0."
                >
                    {goChildren}
                </ContentSectionWithData>
            ) : null}

            <ContentSection title="Information">
                <div id="content" className="clear-both">
                    {children}
                </div>
            </ContentSection>
        </Container>
    );
}
