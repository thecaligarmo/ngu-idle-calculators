import { Stat } from "@/assets/stat";
import {
    totalAPBonus,
    totalAugmentSpeed,
    totalCardSpeed,
    totalDaycareSpeed,
    totalDropChance,
    totalEnergyBar,
    totalEnergyBeardSpeed,
    totalEnergyCap,
    totalEnergyNGUSpeedFactor,
    totalEnergyPower,
    totalEnergyWandoosSpeed,
    totalExpBonus,
    totalGoldDrop,
    totalHackSpeed,
    totalHealth,
    totalMagicBar,
    totalMagicBeardSpeed,
    totalMagicCap,
    totalMagicNGUSpeedFactor,
    totalMagicPower,
    totalMagicWandoosSpeed,
    totalMayoSpeed,
    totalPower,
    totalPPBonus,
    totalQuestDropBonus,
    totalQuestRewardBonus,
    totalRegen,
    totalRes3Bar,
    totalRes3Cap,
    totalRes3Power,
    totalRespawnRate,
    totalTagEffect,
    totalToughness,
    totalWishSpeed,
} from "@/helpers/calculators";
import { bd, pn } from "@/helpers/numbers";
import { describeStat, getStatInfo } from "@/helpers/pages/stat";
import { cubeInfo, equipmentInfo } from "@/helpers/resourceInfo";
import Container from "../components/Container";
import ContentSection from "../components/ContentSection";
import ContentSubsection from "../components/ContentSubsection";
import { getNumberFormat, getPlayer } from "../components/Context";

export default function StatsPage() {
    const player = getPlayer();
    const fmt = getNumberFormat();
    const res3Active = player.get("res3Active");
    const curTitan = player.get("highestTitanKilledId");

    const pageData = getStatInfo(player);

    return (
        <Container title="Stats">
            <p>
                The following is a list of the calculations I am making. As these calculations are not in the save file,
                due to rounding they might be slightly different from your game. If you see anything wrong, please let
                me know.
            </p>

            <ContentSection title={res3Active ? "Energy / Magic / Res3" : "Energy / Magic"}>
                <div className="columns-2">
                    <strong className="text-blue-500">Current:</strong>
                    <ul>
                        <li key="ePow">
                            <strong>Energy Power:</strong>{" "}
                            <span className="text-red-500">{pn(totalEnergyPower(player), fmt)}</span>
                        </li>
                        <li key="eBar">
                            <strong>Energy Bar:</strong>{" "}
                            <span className="text-red-500">{pn(totalEnergyBar(player), fmt)}</span>
                        </li>
                        <li key="eCap">
                            <strong>Energy Cap:</strong>{" "}
                            <span className="text-red-500">{pn(totalEnergyCap(player), fmt)}</span>
                        </li>

                        <li key="mPow">
                            <strong>Magic Power:</strong>{" "}
                            <span className="text-red-500">{pn(totalMagicPower(player), fmt)}</span>
                        </li>
                        <li key="mBar">
                            <strong>Magic Bar:</strong>{" "}
                            <span className="text-red-500">{pn(totalMagicBar(player), fmt)}</span>
                        </li>
                        <li key="mCap">
                            <strong>Magic Cap:</strong>{" "}
                            <span className="text-red-500">{pn(totalMagicCap(player), fmt)}</span>
                        </li>
                        {res3Active ? (
                            <>
                                <li key="rPow">
                                    <strong>Resource 3 Power:</strong>{" "}
                                    <span className="text-red-500">{pn(totalRes3Power(player), fmt)}</span>
                                </li>
                                <li key="rBar">
                                    <strong>Resource 3 Bar:</strong>{" "}
                                    <span className="text-red-500">{pn(totalRes3Bar(player), fmt)}</span>
                                </li>
                                <li key="rCap">
                                    <strong>Resource 3 Cap:</strong>{" "}
                                    <span className="text-red-500">{pn(totalRes3Cap(player), fmt)}</span>
                                </li>
                            </>
                        ) : null}
                    </ul>
                    <div>
                        <strong className="text-blue-500">Nude (no equipment/potions - For Gear Optimizer):</strong>
                        <ul>
                            <li key="ePow">
                                <strong>Energy Power:</strong>{" "}
                                <span className="text-red-500">{pn(totalEnergyPower(player, true), fmt)}</span>
                            </li>
                            <li key="eBar">
                                <strong>Energy Bar:</strong>{" "}
                                <span className="text-red-500">{pn(totalEnergyBar(player, true), fmt)}</span>
                            </li>
                            <li key="eCap">
                                <strong>Energy Cap:</strong>{" "}
                                <span className="text-red-500">{pn(totalEnergyCap(player, true), fmt)}</span>
                            </li>

                            <li key="mPow">
                                <strong>Magic Power:</strong>{" "}
                                <span className="text-red-500">{pn(totalMagicPower(player, true), fmt)}</span>
                            </li>
                            <li key="mBar">
                                <strong>Magic Bar:</strong>{" "}
                                <span className="text-red-500">{pn(totalMagicBar(player, true), fmt)}</span>
                            </li>
                            <li key="mCap">
                                <strong>Magic Cap:</strong>{" "}
                                <span className="text-red-500">{pn(totalMagicCap(player, true), fmt)}</span>
                            </li>
                            {res3Active ? (
                                <>
                                    <li key="rPow">
                                        <strong>Resource 3 Power:</strong>{" "}
                                        <span className="text-red-500">{pn(totalRes3Power(player, true), fmt)}</span>
                                    </li>
                                    <li key="rBar">
                                        <strong>Resource 3 Bar:</strong>{" "}
                                        <span className="text-red-500">{pn(totalRes3Bar(player, true), fmt)}</span>
                                    </li>
                                    <li key="rCap">
                                        <strong>Resource 3 Cap:</strong>{" "}
                                        <span className="text-red-500">{pn(totalRes3Cap(player, true), fmt)}</span>
                                    </li>
                                </>
                            ) : null}
                        </ul>
                    </div>
                </div>

                <ContentSubsection title="Energy Power Calculation" defaultHide={true}>
                    {describeStat(pageData["energyPower"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Augments">
                <ul>
                    <li key="eNGU" className="">
                        <strong>Total Augment Speed Factor:</strong>{" "}
                        <span className="text-red-500">{pn(totalAugmentSpeed(player), fmt)}%</span>
                    </li>
                </ul>
                <ContentSubsection title="Total Augment Speed Factor Calculation" defaultHide={true}>
                    {describeStat(pageData["augments"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="NGU">
                <ul>
                    <li key="eNGU" className="">
                        <strong>Total Energy NGU Speed Factor:</strong>{" "}
                        <span className="text-red-500">{pn(totalEnergyNGUSpeedFactor(player), fmt)}%</span>
                    </li>
                    <li key="mNGU" className="">
                        <strong>Total Magic NGU Speed Factor:</strong>{" "}
                        <span className="text-red-500">{pn(totalMagicNGUSpeedFactor(player), fmt)}%</span>
                    </li>
                </ul>
                <ContentSubsection title="Total Energy NGU Speed Factor Calculation" defaultHide={true}>
                    {describeStat(pageData["enguSpeed"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Exp/AP/PP">
                <ul>
                    <li key="exp">
                        <strong>Total Exp Bonus:</strong>{" "}
                        <span className="text-red-500">{pn(totalExpBonus(player), fmt, 2)}%</span>
                    </li>
                    <li key="ap">
                        <strong>Total AP Bonus:</strong>{" "}
                        <span className="text-red-500">{pn(totalAPBonus(player), fmt, 2)}%</span>
                    </li>
                    <li key="pp">
                        <strong>Total PP Bonus:</strong>{" "}
                        <span className="text-red-500">{pn(totalPPBonus(player), fmt, 2)}%</span>
                    </li>
                </ul>
                <ContentSubsection title="Exp Calculation" defaultHide={true}>
                    {describeStat(pageData["exp"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="AP Calculation" defaultHide={true}>
                    {describeStat(pageData["ap"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="PP Calculation" defaultHide={true}>
                    {describeStat(pageData["pp"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Misc.">
                <ul>
                    <li key="daycare">
                        <strong>Total Daycare (Kitty) Bonus:</strong>{" "}
                        <span className="text-red-500">{pn(totalDaycareSpeed(player), fmt, 2)}%</span>
                    </li>
                    <li key="hack">
                        <strong>Total Hack Bonus:</strong>{" "}
                        <span className="text-red-500">{pn(totalHackSpeed(player), fmt, 2)}%</span>
                    </li>
                    <li key="wish">
                        <strong>Total Wish Bonus:</strong>{" "}
                        <span className="text-red-500">{pn(totalWishSpeed(player), fmt, 2)}%</span>
                    </li>
                </ul>
                <ContentSubsection title="Daycare Calculation" defaultHide={true}>
                    {describeStat(pageData["daycare"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Hack Calculation" defaultHide={true}>
                    {describeStat(pageData["hack"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Wish Calculation" defaultHide={true}>
                    {describeStat(pageData["wish"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Adventure Stats">
                <ul className="columns-2">
                    <li key="power" className="">
                        <strong>Total Power:</strong>{" "}
                        <span className="text-red-500">{pn(totalPower(player), fmt)}</span>
                    </li>
                    <li key="toughness" className="">
                        <strong>Total Toughness:</strong>{" "}
                        <span className="text-red-500">{pn(totalToughness(player), fmt)}</span>
                    </li>
                    <li key="health" className="">
                        <strong>Total Health:</strong>{" "}
                        <span className="text-red-500">{pn(totalHealth(player), fmt)}</span>
                    </li>
                    <li key="regen" className="">
                        <strong>Total Regen:</strong>{" "}
                        <span className="text-red-500">{pn(totalRegen(player), fmt)}</span>
                    </li>

                    <li key="cubePower">
                        <strong>Cube Power Uncapped:</strong>{" "}
                        <span className="text-red-500">{pn(cubeInfo(player, Stat.POWER), fmt)}</span>
                    </li>
                    <li key="cubeToughness">
                        <strong>Cube Toughness Uncapped:</strong>{" "}
                        <span className="text-red-500">{pn(cubeInfo(player, Stat.TOUGHNESS), fmt)}</span>
                    </li>
                    <li key="cubePowerCap">
                        <strong>Cube Power Softcap:</strong>{" "}
                        <span className="text-red-500">
                            {pn(player.get("baseAdventurePower").add(equipmentInfo(player, Stat.POWER)), fmt)}
                        </span>
                    </li>
                    <li key="cubeToughnessCap">
                        <strong>Cube Toughness Softcap:</strong>{" "}
                        <span className="text-red-500">
                            {pn(player.get("baseAdventureToughness").add(equipmentInfo(player, Stat.TOUGHNESS)), fmt)}
                        </span>
                    </li>
                </ul>
                <ContentSubsection title="Adventure Power Calculation" defaultHide={true}>
                    {describeStat(pageData["advPower"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Adventure Toughness Calculation" defaultHide={true}>
                    {describeStat(pageData["advToughness"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Adventure Health Calculation" defaultHide={true}>
                    {describeStat(pageData["advHealth"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Adventure Regen Calculation" defaultHide={true}>
                    {describeStat(pageData["advRegen"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Misc Stats">
                <ul>
                    <li key="goldDrop">
                        <strong>Total Gold Drop:</strong>{" "}
                        <span className="text-red-500">{pn(totalGoldDrop(player), fmt)}%</span>
                    </li>
                    <li key="respawn">
                        <strong>Total Respawn:</strong>{" "}
                        <span className="text-red-500">{pn(totalRespawnRate(player), fmt, 2)}%</span> (
                        {pn(totalRespawnRate(player).divide(bd(25)), fmt, 2)} seconds)
                    </li>
                    <li key="dropChance">
                        <strong>Total Drop Chance:</strong>{" "}
                        <span className="text-red-500">{pn(totalDropChance(player), fmt)}%</span>
                    </li>
                </ul>
                <ContentSubsection title="Gold Drop Calculation" defaultHide={true}>
                    {describeStat(pageData["gold"], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Respawn Calculation" defaultHide={true}>
                    {describeStat(pageData["respawn"], fmt, true)}
                </ContentSubsection>
                <ContentSubsection title="Drop Chance Calculation" defaultHide={true}>
                    {describeStat(pageData["dropChance"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Beards Stats">
                <ul>
                    <li key="eBeards">
                        <strong>Total Energy Beard Speed Factor:</strong>{" "}
                        <span className="text-red-500">{pn(totalEnergyBeardSpeed(player), fmt)}%</span>
                    </li>
                    <li key="mBeards">
                        <strong>Total Magic Beard Speed Factor:</strong>{" "}
                        <span className="text-red-500">{pn(totalMagicBeardSpeed(player), fmt)}%</span>
                    </li>
                </ul>
                <ContentSubsection title="Energy Beards Calculation" defaultHide={true}>
                    {describeStat(pageData["eBeards"], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Wandoos Stats">
                <ul>
                    <li key="eWandoos">
                        <strong>Total Wandoos Energy Speed:</strong>{" "}
                        <span className="text-red-500">{pn(totalEnergyWandoosSpeed(player), fmt)}%</span>
                    </li>
                    <li key="mWandoos">
                        <strong>Total Wandoos Magic Speed:</strong>{" "}
                        <span className="text-red-500">{pn(totalMagicWandoosSpeed(player), fmt)}%</span>
                    </li>
                </ul>
                <ContentSubsection title="Energy Wandoos Calculation" defaultHide={true}>
                    {describeStat(pageData["eWandoos"], fmt)}
                </ContentSubsection>
            </ContentSection>
            {player.questsUnlocked() ? (
                <ContentSection title="Quest Stats">
                    <ul>
                        <li key="questRewards">
                            <strong>Total QP Reward:</strong>{" "}
                            <span className="text-red-500">{pn(totalQuestRewardBonus(player), fmt)}%</span>
                        </li>
                        <li key="questDrop">
                            <strong>Total Quest Item Drop:</strong>{" "}
                            <span className="text-red-500">{pn(totalQuestDropBonus(player), fmt, 2)}%</span>
                        </li>
                    </ul>
                    <ContentSubsection title="Quest Rewards Calculation" defaultHide={true}>
                        {describeStat(pageData["questRewards"], fmt)}
                    </ContentSubsection>
                </ContentSection>
            ) : null}
            {player.cardsUnlocked() ? (
                <ContentSection title="Card Stats">
                    <ul>
                        <li key="mayoSpeed">
                            <strong>Total Mayo Speed:</strong>{" "}
                            <span className="text-red-500">{pn(totalMayoSpeed(player), fmt, 2)}%</span>
                        </li>
                        <li key="cardSpeed">
                            <strong>Total Card Speed:</strong>{" "}
                            <span className="text-red-500">{pn(totalCardSpeed(player), fmt, 2)}%</span>
                        </li>
                        <li key="tagEffect">
                            <strong>Total Tag Effect:</strong>{" "}
                            <span className="text-red-500">{pn(totalTagEffect(player), fmt, 2)}%</span>
                        </li>
                    </ul>
                    <ContentSubsection title="Mayo Speed Calculation" defaultHide={true}>
                        {describeStat(pageData["mayoSpeed"], fmt)}
                    </ContentSubsection>
                    <ContentSubsection title="Card Speed Calculation" defaultHide={true}>
                        {describeStat(pageData["cardSpeed"], fmt)}
                    </ContentSubsection>
                    <ContentSubsection title="Tag Effect Calculation" defaultHide={true}>
                        {describeStat(pageData["tagEffect"], fmt)}
                    </ContentSubsection>
                </ContentSection>
            ) : null}
        </Container>
    );
}
