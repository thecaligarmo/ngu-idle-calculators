import { BEARDLIST, BEARDS } from "@/assets/beards";
import { beardImportType, sevenNumber } from "@/helpers/types";
import _ from "lodash";

const props = BEARDLIST.map((beard) => {
    return beard.getFirstProp();
});

describe("Beards Asset", () => {
    const cases: [beardImportType[], sevenNumber, sevenNumber][] = [
        [
            [
                {
                    progress: 0,
                    active: true,
                    beardLevel: 0,
                    permLevel: 0,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 0,
                    permLevel: 0,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 0,
                    permLevel: 0,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 0,
                    permLevel: 0,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 0,
                    permLevel: 0,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 0,
                    permLevel: 0,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 0,
                    permLevel: 0,
                    bankedLevel: 0,
                },
            ],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [
                {
                    progress: 0,
                    active: true,
                    beardLevel: 100,
                    permLevel: 100,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 100,
                    permLevel: 100,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 100,
                    permLevel: 100,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 100,
                    permLevel: 100,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 100,
                    permLevel: 100,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 100,
                    permLevel: 100,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 100,
                    permLevel: 100,
                    bankedLevel: 0,
                },
            ],
            [500, 5, 100, 1, 10, 10, 20],
            [100, 5, 10, 2, 20, 5, 50],
        ],
        [
            [
                {
                    progress: 0,
                    active: true,
                    beardLevel: 10000,
                    permLevel: 10000,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 10000,
                    permLevel: 10000,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 10000,
                    permLevel: 10000,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 10000,
                    permLevel: 10000,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 10000,
                    permLevel: 10000,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 10000,
                    permLevel: 10000,
                    bankedLevel: 0,
                },
                {
                    progress: 0,
                    active: true,
                    beardLevel: 10000,
                    permLevel: 10000,
                    bankedLevel: 0,
                },
            ],
            [50000, 99.77, 3170, 19.95, 317, 199.54, 634],
            [10000, 106.97, 317, 39.91, 634, 158.5, 1585],
        ],
    ];
    describe.each(cases)("Case %#", (data, expectedTemp, expectedPerm) => {
        test.each([...Array(props.length).keys()])("Beard %#", (c) => {
            const beard = _.cloneDeep(BEARDS[c]);
            beard.importStats(data[c]);
            expect(beard.getTempStatValue(props[c])).toBeCloseTo(expectedTemp[c]);
            expect(beard.getPermStatValue(props[c])).toBeCloseTo(expectedPerm[c]);
        });
    });
});
