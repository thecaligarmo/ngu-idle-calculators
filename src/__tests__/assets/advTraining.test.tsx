import { ADVTRAININGLIST, ADVTRAININGS } from "@/assets/advTraining";
import { fiveNumber, tenNumber } from "@/helpers/types";
import _ from "lodash";

const props = ADVTRAININGLIST.map((adv) => {
    return adv.getFirstProp();
});

describe("AdvTraining Asset", () => {
    const cases: [tenNumber, fiveNumber][] = [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 50, 0, 0],
        ],
        [
            [100, 100, 100, 100, 100, 0, 0, 0, 0, 0],
            [63.1, 63.1, 75, 100, 100],
        ],
        [
            [1000, 1000, 1000, 1000, 1000, 0, 0, 0, 0, 0],
            [158.49, 158.49, 95.45, 1000, 1000],
        ],

        [
            [10000, 10000, 10000, 10000, 10000, 0, 0, 0, 0, 0],
            [398.11, 398.11, 99.5, 10000, 10000],
        ],

        [
            [1000000, 1000000, 1000000, 1000000, 1000000, 0, 0, 0, 0, 0],
            [2511.89, 2511.89, 100, 1000000, 1000000],
        ],
    ];
    describe.each(cases)("Case %#", (levels, expectedVals) => {
        test.each([...Array(props.length).keys()])("Adv Training %#", (c) => {
            const advTraining = _.cloneDeep(ADVTRAININGS[c]);
            advTraining.setLevel(levels[c]);
            expect(advTraining.getStatValue(props[c])).toBeCloseTo(expectedVals[c]);
        });
    });
});
