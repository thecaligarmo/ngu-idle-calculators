import Player from "@/assets/player";
import { bd } from "@/helpers/numbers";
import { getRatioInfo } from "@/helpers/pages/ratios";
import bigDecimal from "js-big-decimal";

type tempType =
    | "baseEnergyPower"
    | "baseEnergyCap"
    | "baseEnergyBar"
    | "baseMagicPower"
    | "baseMagicCap"
    | "baseMagicBar"
    | "baseRes3Power"
    | "baseRes3Cap"
    | "baseRes3Bar"
    | "energyRatio"
    | "energyPowerRatio"
    | "energyCapRatio"
    | "energyBarRatio"
    | "magicRatio"
    | "magicPowerRatio"
    | "magicCapRatio"
    | "magicBarRatio"
    | "res3Ratio"
    | "res3PowerRatio"
    | "res3CapRatio"
    | "res3BarRatio"
    | "res3Active";

const cases: [
    string,
    {
        energy: bigDecimal;
        magic: bigDecimal;
        res3: bigDecimal;
        total: bigDecimal;
    },
    {
        baseEnergyPower: bigDecimal;
        baseEnergyCap: bigDecimal;
        baseEnergyBar: bigDecimal;
        baseMagicPower: bigDecimal;
        baseMagicCap: bigDecimal;
        baseMagicBar: bigDecimal;
        baseRes3Power: bigDecimal;
        baseRes3Cap: bigDecimal;
        baseRes3Bar: bigDecimal;
        energyRatio: bigDecimal;
        energyPowerRatio: bigDecimal;
        energyCapRatio: bigDecimal;
        energyBarRatio: bigDecimal;
        magicRatio: bigDecimal;
        magicPowerRatio: bigDecimal;
        magicCapRatio: bigDecimal;
        magicBarRatio: bigDecimal;
        res3Ratio: bigDecimal;
        res3PowerRatio: bigDecimal;
        res3CapRatio: bigDecimal;
        res3BarRatio: bigDecimal;
        res3Active: boolean;
    }
][] = [
    [
        "Energy Power",
        {
            energy: bd(3420),
            magic: bd(0),
            res3: bd(0),
            total: bd(3420),
        },
        {
            baseEnergyPower: bd(5),
            baseEnergyCap: bd(160000),
            baseEnergyBar: bd(4),
            baseMagicPower: bd(5),
            baseMagicCap: bd(160000),
            baseMagicBar: bd(4),
            baseRes3Power: bd(0),
            baseRes3Cap: bd(0),
            baseRes3Bar: bd(0),
            energyRatio: bd(3),
            energyPowerRatio: bd(5),
            energyCapRatio: bd(160000),
            energyBarRatio: bd(4),
            magicRatio: bd(1),
            magicPowerRatio: bd(5),
            magicCapRatio: bd(160000),
            magicBarRatio: bd(4),
            res3Ratio: bd(0),
            res3PowerRatio: bd(0),
            res3CapRatio: bd(0),
            res3BarRatio: bd(0),
            res3Active: false,
        },
    ],
    [
        "Energy Cap",
        {
            energy: bd(14360),
            magic: bd(1980),
            res3: bd(0),
            total: bd(16340),
        },
        {
            baseEnergyPower: bd(13),
            baseEnergyCap: bd(412500),
            baseEnergyBar: bd(13),
            baseMagicPower: bd(4),
            baseMagicCap: bd(60000),
            baseMagicBar: bd(5),
            baseRes3Power: bd(0),
            baseRes3Cap: bd(0),
            baseRes3Bar: bd(0),
            energyRatio: bd(10),
            energyPowerRatio: bd(1),
            energyCapRatio: bd(37500),
            energyBarRatio: bd(1),
            magicRatio: bd(1),
            magicPowerRatio: bd(1),
            magicCapRatio: bd(37500),
            magicBarRatio: bd(1),
            res3Ratio: bd(0),
            res3PowerRatio: bd(0),
            res3CapRatio: bd(0),
            res3BarRatio: bd(0),
            res3Active: false,
        },
    ],
    [
        "Energy Bar",
        {
            energy: bd(153600000),
            magic: bd(341999690),
            res3: bd(0),
            total: bd(495599690),
        },
        {
            baseEnergyPower: bd(2575000),
            baseEnergyCap: bd(6e10),
            baseEnergyBar: bd(1260000),
            baseMagicPower: bd(525000),
            baseMagicCap: bd(16800000000),
            baseMagicBar: bd(420000),
            baseRes3Power: bd(0),
            baseRes3Cap: bd(0),
            baseRes3Bar: bd(0),
            energyRatio: bd(3),
            energyPowerRatio: bd(5),
            energyCapRatio: bd(160000),
            energyBarRatio: bd(4),
            magicRatio: bd(1),
            magicPowerRatio: bd(5),
            magicCapRatio: bd(160000),
            magicBarRatio: bd(4),
            res3Ratio: bd(0),
            res3PowerRatio: bd(0),
            res3CapRatio: bd(0),
            res3BarRatio: bd(0),
            res3Active: false,
        },
    ],
    [
        "Magic Power",
        {
            energy: bd(0),
            magic: bd(5130),
            res3: bd(0),
            total: bd(5130),
        },
        {
            baseEnergyPower: bd(30),
            baseEnergyCap: bd(960000),
            baseEnergyBar: bd(24),
            baseMagicPower: bd(5),
            baseMagicCap: bd(160000),
            baseMagicBar: bd(4),
            baseRes3Power: bd(0),
            baseRes3Cap: bd(0),
            baseRes3Bar: bd(0),
            energyRatio: bd(3),
            energyPowerRatio: bd(5),
            energyCapRatio: bd(160000),
            energyBarRatio: bd(4),
            magicRatio: bd(1),
            magicPowerRatio: bd(5),
            magicCapRatio: bd(160000),
            magicBarRatio: bd(4),
            res3Ratio: bd(0),
            res3PowerRatio: bd(0),
            res3CapRatio: bd(0),
            res3BarRatio: bd(0),
            res3Active: false,
        },
    ],

    [
        "Magic Cap",
        {
            energy: bd(0),
            magic: bd(4680),
            res3: bd(0),
            total: bd(4680),
        },
        {
            baseEnergyPower: bd(30),
            baseEnergyCap: bd(960000),
            baseEnergyBar: bd(24),
            baseMagicPower: bd(6),
            baseMagicCap: bd(160000),
            baseMagicBar: bd(4),
            baseRes3Power: bd(0),
            baseRes3Cap: bd(0),
            baseRes3Bar: bd(0),
            energyRatio: bd(3),
            energyPowerRatio: bd(5),
            energyCapRatio: bd(160000),
            energyBarRatio: bd(4),
            magicRatio: bd(1),
            magicPowerRatio: bd(5),
            magicCapRatio: bd(160000),
            magicBarRatio: bd(4),
            res3Ratio: bd(0),
            res3PowerRatio: bd(0),
            res3CapRatio: bd(0),
            res3BarRatio: bd(0),
            res3Active: false,
        },
    ],

    [
        "Magic Bar",
        {
            energy: bd(0),
            magic: bd(4680),
            res3: bd(0),
            total: bd(4680),
        },
        {
            baseEnergyPower: bd(30),
            baseEnergyCap: bd(960000),
            baseEnergyBar: bd(24),
            baseMagicPower: bd(6),
            baseMagicCap: bd(160001),
            baseMagicBar: bd(4),
            baseRes3Power: bd(0),
            baseRes3Cap: bd(0),
            baseRes3Bar: bd(0),
            energyRatio: bd(3),
            energyPowerRatio: bd(5),
            energyCapRatio: bd(160000),
            energyBarRatio: bd(4),
            magicRatio: bd(1),
            magicPowerRatio: bd(5),
            magicCapRatio: bd(160000),
            magicBarRatio: bd(4),
            res3Ratio: bd(0),
            res3PowerRatio: bd(0),
            res3CapRatio: bd(0),
            res3BarRatio: bd(0),
            res3Active: false,
        },
    ],
    [
        "Resource 3 Cap",
        {
            energy: bd(555640560),
            magic: bd(555640560),
            res3: bd(1250000000),
            total: bd(2361281120),
        },
        {
            baseEnergyPower: bd(6498720),
            baseEnergyCap: bd(207959040000),
            baseEnergyBar: bd(5198976),
            baseMagicPower: bd(2166240),
            baseMagicCap: bd(69319680000),
            baseMagicBar: bd(1732992),
            baseRes3Power: bd(50),
            baseRes3Cap: bd(1000000),
            baseRes3Bar: bd(20),
            energyRatio: bd(81234),
            energyPowerRatio: bd(5),
            energyCapRatio: bd(160000),
            energyBarRatio: bd(4),
            magicRatio: bd(27078),
            magicPowerRatio: bd(5),
            magicCapRatio: bd(160000),
            magicBarRatio: bd(4),
            res3Ratio: bd(1),
            res3PowerRatio: bd(4),
            res3CapRatio: bd(150000),
            res3BarRatio: bd(1),
            res3Active: true,
        },
    ],
    [
        "Resource 3 Power",
        {
            energy: bd(125608000),
            magic: bd(29640000),
            res3: bd(600000000),
            total: bd(755248000),
        },
        {
            baseEnergyPower: bd(6000000),
            baseEnergyCap: bd(243002000000),
            baseEnergyBar: bd(1024680),
            baseMagicPower: bd(2106240),
            baseMagicCap: bd(81034000000),
            baseMagicBar: bd(540560),
            baseRes3Power: bd(40),
            baseRes3Cap: bd(3000000),
            baseRes3Bar: bd(20),
            energyRatio: bd(81234),
            energyPowerRatio: bd(4),
            energyCapRatio: bd(150000),
            energyBarRatio: bd(1),
            magicRatio: bd(27078),
            magicPowerRatio: bd(4),
            magicCapRatio: bd(150000),
            magicBarRatio: bd(1),
            res3Ratio: bd(1),
            res3PowerRatio: bd(4),
            res3CapRatio: bd(150000),
            res3BarRatio: bd(1),
            res3Active: true,
        },
    ],
];

describe("Ratio Page Helper", () => {
    test.each(cases)("Case %s", (sugBuy, expectedCost, data) => {
        const player = new Player(false, true);
        let k: tempType;
        for (k in data) {
            player.set(k, data[k]);
        }
        const [desired, buy, cost, suggestedBuy] = getRatioInfo(player);
        const res3: boolean = player.get("res3Active");

        // Check desired ratios
        expect(Number(desired["energy"]["power"].divide(desired["energy"]["bar"]).getValue())).toBeCloseTo(
            Number(data["energyPowerRatio"].divide(data["energyBarRatio"]).getValue())
        );
        expect(Number(desired["energy"]["cap"].divide(desired["energy"]["bar"]).getValue())).toBeCloseTo(
            Number(data["energyCapRatio"].divide(data["energyBarRatio"]).getValue()),
            0
        );
        expect(Number(desired["energy"]["cap"].divide(desired["energy"]["power"]).getValue())).toBeCloseTo(
            Number(data["energyCapRatio"].divide(data["energyPowerRatio"]).getValue()),
            0
        );

        expect(Number(desired["magic"]["power"].divide(desired["magic"]["bar"]).getValue())).toBeCloseTo(
            Number(data["magicPowerRatio"].divide(data["magicBarRatio"]).getValue())
        );
        expect(Number(desired["magic"]["cap"].divide(desired["magic"]["bar"]).getValue())).toBeCloseTo(
            Number(data["magicCapRatio"].divide(data["magicBarRatio"]).getValue()),
            0
        );
        expect(Number(desired["magic"]["cap"].divide(desired["magic"]["power"]).getValue())).toBeCloseTo(
            Number(data["magicCapRatio"].divide(data["magicPowerRatio"]).getValue()),
            0
        );

        if (res3) {
            expect(Number(desired["res3"]["power"].divide(desired["res3"]["bar"]).getValue())).toBeCloseTo(
                Number(data["res3PowerRatio"].divide(data["res3BarRatio"]).getValue()),
                0
            );
            expect(Number(desired["res3"]["cap"].divide(desired["res3"]["bar"]).getValue())).toBeCloseTo(
                Number(data["res3CapRatio"].divide(data["res3BarRatio"]).getValue()),
                0
            );
            expect(Number(desired["res3"]["cap"].divide(desired["res3"]["power"]).getValue())).toBeCloseTo(
                Number(data["res3CapRatio"].divide(data["res3PowerRatio"]).getValue()),
                0
            );
        }

        // Energy to Magic ratio
        expect(Number(desired["energy"]["power"].divide(desired["magic"]["power"]).getValue())).toBeCloseTo(
            Number(data["energyRatio"].divide(data["magicRatio"]).getValue())
        );

        // Check differences (buying)
        expect(Number(buy["energy"]["power"].getValue())).toBeCloseTo(
            Number(desired["energy"]["power"].subtract(data["baseEnergyPower"]).getValue())
        );
        expect(Number(buy["energy"]["cap"].getValue())).toBeCloseTo(
            Number(desired["energy"]["cap"].subtract(data["baseEnergyCap"]).getValue())
        );
        expect(Number(buy["energy"]["bar"].getValue())).toBeCloseTo(
            Number(desired["energy"]["bar"].subtract(data["baseEnergyBar"]).getValue())
        );

        expect(Number(buy["magic"]["power"].getValue())).toBeCloseTo(
            Number(desired["magic"]["power"].subtract(data["baseMagicPower"]).getValue())
        );
        expect(Number(buy["magic"]["cap"].getValue())).toBeCloseTo(
            Number(desired["magic"]["cap"].subtract(data["baseMagicCap"]).getValue())
        );
        expect(Number(buy["magic"]["bar"].getValue())).toBeCloseTo(
            Number(desired["magic"]["bar"].subtract(data["baseMagicBar"]).getValue())
        );

        if (res3) {
            expect(Number(buy["res3"]["power"].getValue())).toBeCloseTo(
                Number(desired["res3"]["power"].subtract(data["baseRes3Power"]).getValue())
            );
            expect(Number(buy["res3"]["cap"].getValue())).toBeCloseTo(
                Number(desired["res3"]["cap"].subtract(data["baseRes3Cap"]).getValue())
            );
            expect(Number(buy["res3"]["bar"].getValue())).toBeCloseTo(
                Number(desired["res3"]["bar"].subtract(data["baseRes3Bar"]).getValue())
            );
        }

        expect(cost).toMatchObject(expectedCost);

        // Suggested Buy
        expect(suggestedBuy).toBe(sugBuy);
    });
});
