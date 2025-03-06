import bigDecimal from "js-big-decimal";
import { Card, CardRarity, cardRarityRange } from "@/assets/cards";
import { FruitOfMayo, Yggdrasil } from "@/assets/yggdrasil";
import Content from "../components/Content";
import { requiredDataType } from "@/helpers/types";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";
import { disableItem } from "../components/dataListColumns";
import { StandardTable } from "../components/StandardTable";
import { StandardTableRowType } from "@/helpers/types";
import { bd, greaterThan, isZero, lessThan, pn, toNum } from "@/helpers/numbers";
import { bigDecimalObj, toObjectMap } from "@/helpers/objects";
import {
    cardReqChonkers,
    cardReqFruit,
    getCardsPerDay,
    getCardsRecycled,
    getChonksPerDay,
    getChonksRecycled,
    getMayoFromFruit,
    getMayoFromInfusers,
    getMayoFromRecycling,
} from "@/helpers/pages/cards";
import { getPlayerDataInfo } from "@/helpers/playerInfo";
import { camelToTitle } from "@/helpers/strings";

export default function CardsPage() {
    const fmt = getNumberFormat();
    const player = getPlayer();

    // Set data required (from playerData)
    const infoRequired: requiredDataType = [
        ["blueHeart", "cardChonkers", "70sSet", "totalMayoSpeed", "totalCardSpeed", "totalTagEffect"],
        [
            "cardTierEnergyNGU",
            "cardTierMagicNGU",
            "cardTierWandoos",
            "cardTierAugments",
            "cardTierTimeMachine",
            "cardTierHack",
            "cardTierWish",
            "cardTierStat",
            "cardTierAdventure",
            "cardTierDropChance",
            "cardTierGoldDrop",
            "cardTierDaycare",
            "cardTierPP",
            "cardTierQP",
        ],
        [
            "cardTaggedEnergyNGU",
            "cardTaggedMagicNGU",
            "cardTaggedWandoos",
            "cardTaggedAugments",
            "cardTaggedTimeMachine",
            "cardTaggedHack",
            "cardTaggedWish",
            "cardTaggedStat",
            "cardTaggedAdventure",
            "cardTaggedDropChance",
            "cardTaggedGoldDrop",
            "cardTaggedDaycare",
            "cardTaggedPP",
            "cardTaggedQP",
        ],
        ["cardRecyclingCard", "cardRecyclingMayo", "wimpyWish", "beefyWish", "chonkChonkier", "chonkLessNotChonkier"],
        [
            "tierFruitOfAngryMayo",
            "tierFruitOfSadMayo",
            "tierFruitOfMoldyMayo",
            "tierFruitOfAyyMayo",
            "tierFruitOfCincoDeMayo",
            "tierFruitOfPrettyMayo",
        ],
        [
            "poopFruitOfAngryMayo",
            "poopFruitOfSadMayo",
            "poopFruitOfMoldyMayo",
            "poopFruitOfAyyMayo",
            "poopFruitOfCincoDeMayo",
            "poopFruitOfPrettyMayo",
        ],
    ];

    // Set extra required (not from playerData)
    const extraRequired: requiredDataType = [
        ["includeFruit", "includeLeftovers", "poopAllLeftovers"],
        ["infusersEveryXDays", "twoFruitPerInfuser"],
        ["blackPen"],
        [
            "cardRarityEnergyNGU",
            "cardRarityMagicNGU",
            "cardRarityWandoos",
            "cardRarityAugments",
            "cardRarityTimeMachine",
            "cardRarityHack",
            "cardRarityWish",
            "cardRarityStat",
            "cardRarityAdventure",
            "cardRarityDropChance",
            "cardRarityGoldDrop",
            "cardRarityDaycare",
            "cardRarityPP",
            "cardRarityQP",
        ],
        [
            "cardChonkedEnergyNGU",
            "cardChonkedMagicNGU",
            "cardChonkedWandoos",
            "cardChonkedAugments",
            "cardChonkedTimeMachine",
            "cardChonkedHack",
            "cardChonkedWish",
            "cardChonkedStat",
            "cardChonkedAdventure",
            "cardChonkedDropChance",
            "cardChonkedGoldDrop",
            "cardChonkedDaycare",
            "cardChonkedPP",
            "cardChonkedQP",
        ],
    ];

    const goRequired: requiredDataType = [[]];

    // Get required data
    let infoReq = getPlayerDataInfo(infoRequired);
    let extraReq = getPlayerDataInfo(extraRequired);
    const goReq = getPlayerDataInfo(goRequired);
    extraReq.unshift({ colWidths: ["w-1/3", "w-1/3", "w-1/3", "w-2/3", "w-1/3"] });

    if (!player.get("includeFruit")) {
        extraReq = disableItem(extraReq, cardReqFruit);
        infoReq = disableItem(infoReq, cardReqFruit);
    }

    if (!player.get("cardChonkers")) {
        extraReq = disableItem(extraReq, cardReqChonkers);
        infoReq = disableItem(infoReq, cardReqChonkers);
    }

    const seventiesSet = player.get("70sSet");
    const blackPen = player.get("blackPen");
    const tagEffect = player.get("totalTagEffect").divide(bd(100));
    const cardSpeed = player.get("totalCardSpeed");
    const mayoSpeed = player.get("totalMayoSpeed");

    const fruitYieldData = {
        blueHeart: player.get("blueHeart"),
        mayoSpeed: mayoSpeed, // Mayo
    };

    // Grab card info
    const cards: Card[] = Object.values(player.get("cards"));
    let numTagged = 0;
    cards.forEach((card) => {
        card.tier = toNum(player.get(card.tierKey()));
        card.isTagged = player.get(card.taggedKey());
        card.isChonked = player.get(card.chonkKey());
        card.minCastRarity = toNum(player.get(card.rarityKey()));
        if (card.isTagged) {
            numTagged += 1;
        }
    });

    // H_i / cardsPeraDay
    const cardTypeRarityRates: bigDecimalObj = toObjectMap(
        cards,
        (card) => card.key,
        (card) => card.rarityRate(seventiesSet, tagEffect, numTagged)
    );

    // sum H_i / cardsPerDay
    const recycleCard = Object.values(cardTypeRarityRates).reduce((rateSum: bigDecimal, rate: bigDecimal) => {
        return rateSum.add(rate);
    }, bd(0));

    let cardsPerDay = getCardsPerDay(cardSpeed, recycleCard);
    let cardsRecycled = getCardsRecycled(recycleCard, cardsPerDay);
    if (!player.get("cardRecyclingCard")) {
        cardsPerDay = cardsPerDay.subtract(cardsRecycled);
        cardsRecycled = bd(0);
    }

    // Chonk info
    // J_i * O_i / cardSpeed
    const chonkTags: bigDecimalObj = toObjectMap(
        cards,
        (card: Card) => card.key,
        (card: Card) => (player.get(card.chonkKey()) ? card.tagFormula(tagEffect, numTagged) : bd(0))
    );
    const recycleChonk = Object.values(chonkTags).reduce((tagSum: bigDecimal, tag: bigDecimal) => {
        return tagSum.add(tag);
    }, bd(0));

    const chonksPerDay = getChonksPerDay(cardSpeed, recycleChonk, player.get("cardRecyclingCard"));
    const chonksRecycled = player.get("cardRecyclingCard") ? getChonksRecycled(recycleChonk, chonksPerDay) : bd(0);

    // Mayo

    // Grab Mayo generation from fruits
    const fruits: Yggdrasil[] = Object.values(player.get("yggdrasil"));
    fruits.forEach((fruit) => {
        if (fruit instanceof FruitOfMayo) {
            fruit.tier = toNum(player.get(fruit.tierKey()));
            fruit.usePoop = player.get(fruit.poopKey());
            fruit.eatFruit = true;
        }
    });

    const [mayoFromFruit, mayoFromFruitLeftovers] = player.get("includeFruit")
        ? getMayoFromFruit(player.get("includeLeftovers"), fruits, fruitYieldData, player.get("poopAllLeftovers"))
        : [bd(0), bd(0)];

    const mayoFromRecycling = player.get("cardRecyclingMayo")
        ? getMayoFromRecycling(cardsRecycled, chonksRecycled)
        : bd(0);
    const mayoFromInfusers = lessThan(player.get("infusersEveryXDays"), bd(1))
        ? bd(0)
        : getMayoFromInfusers(
              mayoSpeed,
              player.get("infusersEveryXDays"),
              player.get("twoFruitPerInfuser"),
              mayoFromFruit,
              mayoFromFruitLeftovers
          );
    const mayoPerDay = bd(24)
        .multiply(mayoSpeed.divide(bd(100)))
        .add(mayoFromFruit)
        .add(mayoFromFruitLeftovers)
        .add(mayoFromRecycling)
        .add(mayoFromInfusers);

    // Grab min/max cord cost for normal cards and chonkers
    const minCardCost = bd(1).add(player.get("wimpyWish"));
    const maxCardCost = bd(9).add(player.get("beefyWish"));
    const averageCardCost = minCardCost.add(maxCardCost).divide(bd(2));

    const minChonkCardCost = bd(1).add(player.get("chonkLessNotChonkier"));
    const maxChonkCardCost = bd(9).add(player.get("chonkChonkier"));
    const averageChonkCardCost = bd(20).add(minChonkCardCost.add(maxChonkCardCost).divide(bd(2)));

    // By Type Calculations
    const infoByType: {
        [k: string]: {
            cardsPerDay: bigDecimal;
            chonksPerDay: bigDecimal;
            bonusPerMayo: bigDecimal;
            bonusPerCard: bigDecimal;
            bonusPerChonk: bigDecimal;
            bonusPerDay: bigDecimal;
            mayoNeeded: bigDecimal;
            Hi: bigDecimal;
        };
    } = toObjectMap(
        cards,
        (card) => card.key,
        (card) => {
            const cardsPDay = cardsPerDay.multiply(card.tagFormula(tagEffect, numTagged));
            const chonkPDay = chonksPerDay.multiply(card.tagFormula(tagEffect, numTagged));
            const bonusPerMayo = card.bonusPerMayo(
                (cardRarityRange(card.minCastRarity, seventiesSet)[0] + 1.2) / 2,
                blackPen
            );
            const bonusPerCard = bonusPerMayo.multiply(averageCardCost);
            const bonusPerChonk = card
                .bonusPerMayo(cardRarityRange(CardRarity.CHONKER)[0], blackPen)
                .multiply(averageChonkCardCost);

            const Hi = cardTypeRarityRates[card.key].multiply(cardsPerDay);
            const Ji = !isZero(cardsPerDay) ? cardsPDay.divide(cardsPerDay).multiply(chonksPerDay) : bd(0);
            const bonusPerDay = bonusPerCard
                .multiply(Hi)
                .add(bonusPerChonk.multiply(Ji).multiply(player.get(card.chonkKey()) ? bd(1) : bd(0)));

            // Ki
            const mayoNeeded = Hi.multiply(averageCardCost).add(
                Ji.multiply(averageChonkCardCost).multiply(player.get(card.chonkKey()) ? bd(1) : bd(0))
            );

            return {
                cardsPerDay: cardsPDay,
                chonksPerDay: chonkPDay,
                bonusPerMayo: bonusPerMayo.multiply(bd(100)),
                bonusPerCard: bonusPerCard.multiply(bd(100)),
                bonusPerChonk: bonusPerChonk.multiply(bd(100)),
                bonusPerDay: bonusPerDay.multiply(bd(100)),
                mayoNeeded: mayoNeeded,
                Hi: Hi,
            };
        }
    );

    // Total Mayo Needed
    const totalMayoNeeded = Object.keys(infoByType).reduce((mayoSum: bigDecimal, k: string) => {
        return mayoSum.add(infoByType[k]["mayoNeeded"]);
    }, bd(0));
    const mayoLeftover = mayoPerDay.subtract(totalMayoNeeded);

    let perTypeOrder = ["key", "bpd", "cpd", "bpc", "mpd", "bpm"];
    if (player.get("cardChonkers")) {
        perTypeOrder = ["key", "bpd", "cpd", "bpc", "chpd", "bpch", "mpd", "bpm"];
    }

    const perTypeHeader = {
        key: "",
        bpd: "Bonus per day",
        cpd: "Cards per day",
        bpc: "Bonus per card",
        chpd: "Chonks per day",
        bpch: "Bonus per chonk",
        mpd: "Mayo needed per day",
        bpm: "Bonus per mayo",
    };

    const perTypeRows: StandardTableRowType = {};
    for (const k of Object.keys(infoByType)) {
        perTypeRows[k] = {
            key: camelToTitle(k.replace("card", "")) + " Card",
            cpd: <span className="text-red-500">{pn(infoByType[k]["cardsPerDay"], fmt)}</span>,
            chpd: <span className="text-red-500">{pn(infoByType[k]["chonksPerDay"], fmt, 3)}</span>,
            bpm: pn(infoByType[k]["bonusPerMayo"], fmt, 3) + "%",
            bpc: pn(infoByType[k]["bonusPerCard"], fmt, 3) + "%",
            bpch: pn(infoByType[k]["bonusPerChonk"], fmt, 3) + "%",
            bpd: <span className="text-green-500">{pn(infoByType[k]["bonusPerDay"], fmt, 3) + "%"}</span>,
            mpd: <span className="text-blue-500">{pn(infoByType[k]["mayoNeeded"], fmt, 2)}</span>,
        };
    }

    const dailyOrder = ["main", "amt", "extra"];
    const dailyHeader = {
        main: "",
        amt: "Amount",
        extra: "Extra Info",
    };
    const dailyData: StandardTableRowType = {
        mayo: {
            main: "Mayo",
            amt: <span className="text-red-500">{pn(mayoPerDay, fmt)}</span>,
            extra: (
                <ul key="mayoInfo">
                    <li key="fruit">
                        <strong>Fruit:</strong> {pn(mayoFromFruit, fmt)}
                    </li>
                    <li key="leftover">
                        <strong>Fruit Leftovers:</strong> {pn(mayoFromFruitLeftovers, fmt)}
                    </li>
                    <li key="recycle">
                        <strong>Card Recycling:</strong> {pn(mayoFromRecycling, fmt)}
                    </li>
                    <li key="infusers">
                        <strong>Infusers:</strong> {pn(mayoFromInfusers, fmt)}
                    </li>
                </ul>
            ),
        },
        cards: {
            main: "Cards",
            amt: <span className="text-red-500">{pn(cardsPerDay, fmt)}</span>,
            extra: (
                <ul key="cardInfo">
                    <li key="recycle">
                        <strong>Card Recycling:</strong> {pn(cardsRecycled, fmt)}
                    </li>
                </ul>
            ),
        },
    };
    if (player.get("cardChonkers")) {
        dailyData["chonks"] = {
            main: "Chonkers",
            amt: <span className="text-red-500">{pn(chonksPerDay, fmt)}</span>,
            extra: (
                <ul key="cardInfo">
                    <li key="recycle">
                        <strong>Card Recycling:</strong> {pn(chonksRecycled, fmt)}
                    </li>
                </ul>
            ),
        };
    }

    const chanceOfTagged = bd(numTagged)
        .multiply(tagEffect)
        .add(
            bd(1)
                .subtract(bd(numTagged).multiply(tagEffect))
                .multiply(bd(numTagged / 14))
        );
    let chanceCastable = Object.keys(infoByType).reduce((cards: bigDecimal, k: string) => {
        return cards.add(infoByType[k]["Hi"]);
    }, bd(0));
    if (greaterThan(cardsPerDay, bd(0))) {
        chanceCastable = chanceCastable.divide(cardsPerDay);
    }

    return (
        <Content
            title="Cards"
            infoRequired={infoReq}
            extraRequired={extraReq}
            goRequired={goReq}
            prechildren={
                <p>
                    This page gives information about cards and mayo. By <span className="text-red-500">leftovers</span>{" "}
                    we mean when you use Yggdrasil more than once per day. So eating your second (third, etc.) fruit
                    from Yggdrasil is considered a &ldquo;leftover&rdquo;.
                </p>
            }
        >
            <ContentSubsection title={"How much mayo, cards, chonks will I get per day?"}>
                <>
                    <p>The below let&apos;s you know how much mayo, cards and chonks you will get per day.</p>
                    <StandardTable order={dailyOrder} header={dailyHeader} rows={dailyData} />

                    <p>
                        With the above stats, you will have{" "}
                        <span className={lessThan(mayoLeftover, bd(0)) ? "text-red-500" : "text-green-500"}>
                            {pn(mayoLeftover, fmt)}
                        </span>{" "}
                        Mayo spare at the end of each day.
                    </p>
                    <p>The chance of getting a tagged card is: {pn(chanceOfTagged.multiply(bd(100)), fmt, 2)}%</p>
                    <p>The chance of getting a castable card is: {pn(chanceCastable.multiply(bd(100)), fmt, 2)}%</p>
                </>
            </ContentSubsection>
            <ContentSubsection title={"What do I get per card type?"}>
                <>
                    <StandardTable order={perTypeOrder} header={perTypeHeader} rows={perTypeRows} />
                    <p>Due to the nature of cards, the above are averages and are not guaranteed.</p>
                </>
            </ContentSubsection>
        </Content>
    );
}
