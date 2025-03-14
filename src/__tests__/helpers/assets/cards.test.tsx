import { Card, CARDLIST, CardRarity, cardRarityRange, CARDS } from "@/assets/cards";
import { bd, toNum } from "@/helpers/numbers";
import { fourteenNumber, sixteenNumber } from "@/helpers/types";
import bigDecimal from "js-big-decimal";
import _, { sum } from "lodash";

const props = CARDLIST.map((card) => {
    return card.getFirstProp();
});

describe("Cards Asset", () => {
    const cases: [sixteenNumber, fourteenNumber][] = [
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [1, 1.2, 2.5, 100, 34.5, 12.2, 1.23, 19.2, 1.356, 2.2, 123456.7, 12, 1.2, 3.2, 4.2, 0],
            [1.2, 2.5, 100, 34.5, 12.2, 1.23, 19.2, 1.356, 2.2, 123456.7, 12, 1.2, 3.2, 4.2],
        ],
    ];
    describe("Bonuses", () => {
        describe.each(cases)("Case %#", (bonuses, expectedVals) => {
            test.each([...Array(props.length).keys()])("Card %# (+1)", (c) => {
                let card: Card = _.cloneDeep(CARDS[c + 1]);
                card.importStats(bonuses);
                expect(card.getStatValue(props[c])).toBeCloseTo(expectedVals[c]);
            });
        });
    });

    const cases2: [bigDecimal, boolean[], fourteenNumber][] = [
        [
            bd(0.1),
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [
                0.07143, 0.07143, 0.07143, 0.07143, 0.07143, 0.07143, 0.07143, 0.07143, 0.07143, 0.07143, 0.07143,
                0.07143, 0.07143, 0.07143,
            ],
        ],
        [
            bd(0.1),
            [true, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [
                0.16429, 0.06429, 0.06429, 0.06429, 0.06429, 0.06429, 0.06429, 0.06429, 0.06429, 0.06429, 0.06429,
                0.06429, 0.06429, 0.06429,
            ],
        ],
        [
            bd(0.1),
            [true, true, false, false, false, false, false, false, false, false, false, false, false, false],
            [
                0.15714, 0.15714, 0.05714, 0.05714, 0.05714, 0.05714, 0.05714, 0.05714, 0.05714, 0.05714, 0.05714,
                0.05714, 0.05714, 0.05714,
            ],
        ],
        [
            bd(0.15),
            [true, true, true, true, false, false, false, false, false, false, false, false, false, false],
            [
                0.17857, 0.17857, 0.17857, 0.17857, 0.02857, 0.02857, 0.02857, 0.02857, 0.02857, 0.02857, 0.02857,
                0.02857, 0.02857, 0.02857,
            ],
        ],
    ];
    describe("Tags", () => {
        describe.each(cases2)("Case %#", (tagEffect, tagged, tagAmt) => {
            const numTagged = tagged.reduce((prev, cur) => {
                return cur ? prev + 1 : prev;
            }, 0);
            test.each([...Array(props.length).keys()])("Card %# (+1)", (c) => {
                let card: Card = _.cloneDeep(CARDS[c + 1]);
                card.isTagged = tagged[c];
                expect(toNum(card.tagFormula(tagEffect, numTagged))).toBeCloseTo(tagAmt[c]);
                expect(sum(tagAmt)).toBeCloseTo(1, 3);
            });
        });
    });

    const cases3: [number, boolean, bigDecimal, number, number][] = [
        [CardRarity.NONE, false, bd(0.1), 0, 0],
        [CardRarity.NONE, true, bd(0.15), 4, 0],
        [CardRarity.CRAPPY, false, bd(0.1), 0, 0.07143],
        [CardRarity.CRAPPY, false, bd(0.15), 4, 0.02857],
        [CardRarity.MEH, false, bd(0.1), 0, 0.03571],
        [CardRarity.OKAY, true, bd(0.15), 4, 0.0098],
    ];
    describe("Rarity Rate", () => {
        test.each(cases3)("Case %#", (rarity, seventies, tagEffect, numTags, expectedVal) => {
            let card: Card = _.cloneDeep(CARDS[1]);
            card.minCastRarity = rarity;
            card.isTagged = false;
            expect(toNum(card.rarityRate(seventies, tagEffect, numTags))).toBeCloseTo(expectedVal);
        });
    });

    const cases4: [fourteenNumber, boolean, fourteenNumber][] = [
        [
            [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
            false,
            [
                0.00112, 0.00106, 0.00108, 0.00108, 0.00112, 0.00104, 0.00104, 0.066, 0.00136, 0.00112, 0.0056, 0.00022,
                0.00028, 0.00027,
            ],
        ],
        [
            [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
            false,
            [
                0.00154, 0.0015, 0.00152, 0.00152, 0.00158, 0.00146, 0.00146, 0.074, 0.00178, 0.00158, 0.0079, 0.0003,
                0.00037, 0.00036,
            ],
        ],
        [
            [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
            true,
            [
                0.00357, 0.00263, 0.00276, 0.00276, 0.00313, 0.00164, 0.0018, 0.38255, 0.00202, 0.00385, 0.01565,
                0.0003, 0.000523, 0.00049,
            ],
        ],
        [
            [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
            true,
            [
                0.0052, 0.00384, 0.00405, 0.00405, 0.0046, 0.00236, 0.00261, 0.54883, 0.00278, 0.00568, 0.02298,
                0.000469, 0.0007345, 0.0006845,
            ],
        ],
    ];
    describe("Bonus Per Mayo", () => {
        describe.each(cases4)("Case %#", (rarity, pen, expectedVals) => {
            test.each([...Array(props.length).keys()])("Card %# (+1)", (c) => {
                let card: Card = _.cloneDeep(CARDS[c + 1]);
                expect(Number(card.bonusPerMayo(rarity[c], pen).getValue())).toBeCloseTo(expectedVals[c]);
            });
        });
    });
    test("Strings", () => {
        let card: Card = _.cloneDeep(CARDS[1]);
        expect(card.tierKey()).toBe("cardTierEnergyNGU");
        expect(card.taggedKey()).toBe("cardTaggedEnergyNGU");
        expect(card.rarityKey()).toBe("cardRarityEnergyNGU");
        expect(card.chonkKey()).toBe("cardChonkedEnergyNGU");
    });

    let cases5: [number, boolean, [number, number]][] = [
        [CardRarity.CRAPPY, false, [0.8, 0.9]],
        [CardRarity.CRAPPY, true, [0.85, 0.9]],
        [CardRarity.GREAT, true, [1.17, 1.19]],
    ];
    describe("Card Rarity Range", () => {
        test.each(cases5)("Case %#", (rarity, seventies, expected) => {
            let crr = cardRarityRange(rarity, seventies);
            expect(crr[0]).toBe(expected[0]);
            expect(crr[1]).toBe(expected[1]);
        });
    });
});
