'use client'
import { ItemSets } from '@/assets/sets';
import { Stat } from '@/assets/stat';
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import ContentSubsection from '@/components/contentSubsection';
import { getNumberFormat } from '@/components/context';
import { totalAPBonus, totalDaycareSpeed, totalDropChance, totalEnergyBar, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalExpBonus, totalGoldDrop, totalHackSpeed, totalHealth, totalMagicBar, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower, totalPPBonus, totalPower, totalRegen, totalRes3Bar, totalRes3Cap, totalRes3Power, totalRespawnRate, totalToughness, totalWishSpeed } from '@/helpers/calculators';
import { bd, pn } from '@/helpers/numbers';
import { describeStat, getStatInfo } from '@/helpers/pages/stat';
import { parseNum, parseObj } from '@/helpers/parsers';
import { achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, hackInfo, isMaxxedItemSet, macguffinInfo, nguInfo, perkInfo, quirkInfo, wishInfo } from '@/helpers/resourceInfo';
import { createStatesForData } from '@/helpers/stateForData';
import bigDecimal from "js-big-decimal";
import _ from 'lodash';



export default function Page() {
    const playerStates = createStatesForData();
    var fmt = getNumberFormat();
    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        return parseNum(playerStates, key)
    }
    function j(key : string) : any{
        return parseObj(playerStates, key)
    }

    var [res3Active, setRes3Active] = playerStates["res3Active"]


    var pageData = getStatInfo(playerStates);
    
    return (
        <Container title="Stats">
            <p>
                The following is a list of the calculations I am making.
                As these calculations are not in the save file, due to rounding they might be slightly different from your game. 
                If you see anything wrong, please let me know.
            </p>

            <ContentSection title="Energy / Magic">
                <ul>
                    <li key="ePow"><strong>Energy Power:</strong> <span className="text-red-500">{pn(totalEnergyPower(playerStates), fmt)}</span></li>
                    <li key="eBar"><strong>Energy Bar:</strong> <span className="text-red-500">{pn(totalEnergyBar(playerStates), fmt)}</span></li>
                    <li key="eCap"><strong>Energy Cap:</strong> <span className="text-red-500">{pn(totalEnergyCap(playerStates), fmt)}</span></li>
                    
                    <li key="mPow"><strong>Magic Power:</strong> <span className="text-red-500">{pn(totalMagicPower(playerStates), fmt)}</span></li>
                    <li key="mBar"><strong>Magic Bar:</strong> <span className="text-red-500">{pn(totalMagicBar(playerStates), fmt)}</span></li>
                    <li key="mCap"><strong>Magic Cap:</strong> <span className="text-red-500">{pn(totalMagicCap(playerStates), fmt)}</span></li>
                    { res3Active ?
                        <>
                            <li key="rPow"><strong>Resource 3 Power:</strong> <span className="text-red-500">{pn(totalRes3Power(playerStates), fmt)}</span></li>
                            <li key="rBar"><strong>Resource 3 Bar:</strong> <span className="text-red-500">{pn(totalRes3Bar(playerStates), fmt)}</span></li>
                            <li key="rCap"><strong>Resource 3 Cap:</strong> <span className="text-red-500">{pn(totalRes3Cap(playerStates), fmt)}</span></li>
                        </>
                        : null
                    }
                </ul>
                <ContentSubsection title="Energy Power Calculation" defaultHide={true}>
                    {describeStat(pageData['energyPower'], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="NGU">
                <ul>
                    <li key="eNGU" className=""><strong>Total Energy NGU Speed Factor:</strong> <span className="text-red-500">{pn(totalEnergyNGUSpeedFactor(playerStates), fmt)}%</span></li>
                    <li key="mNGU" className=""><strong>Total Magic NGU Speed Factor:</strong> <span className="text-red-500">{pn(totalMagicNGUSpeedFactor(playerStates), fmt)}%</span></li>
                </ul>
                <ContentSubsection title="Total Energy NGU Speed Factor Calculation" defaultHide={true}>
                    {describeStat(pageData['enguSpeed'], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Exp/AP/PP">
                <ul>
                    <li key="exp"><strong>Total Exp Bonus:</strong> <span className="text-red-500">{pn(totalExpBonus(playerStates), fmt, 2)}%</span></li>
                    <li key="ap"><strong>Total AP Bonus:</strong> <span className="text-red-500">{pn(totalAPBonus(playerStates), fmt, 2)}%</span></li>
                    <li key="pp"><strong>Total PP Bonus:</strong> <span className="text-red-500">{pn(totalPPBonus(playerStates), fmt, 2)}%</span></li>
                </ul>
                <ContentSubsection title="Exp Calculation" defaultHide={true}>
                    {describeStat(pageData['exp'], fmt)}
                </ContentSubsection>
                <ContentSubsection title="AP Calculation" defaultHide={true}>
                    {describeStat(pageData['ap'], fmt)}
                </ContentSubsection>
                <ContentSubsection title="PP Calculation" defaultHide={true}>
                    {describeStat(pageData['pp'], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Misc.">
                <ul>
                    <li key="daycare"><strong>Total Daycare (Kitty) Bonus:</strong> <span className="text-red-500">{pn(totalDaycareSpeed(playerStates), fmt, 2)}%</span></li>
                    <li key="hack"><strong>Total Hack Bonus:</strong> <span className="text-red-500">{pn(totalHackSpeed(playerStates), fmt, 2)}%</span></li>
                    <li key="wish"><strong>Total Wish Bonus:</strong> <span className="text-red-500">{pn(totalWishSpeed(playerStates), fmt, 2)}%</span></li>
                </ul>
                <ContentSubsection title="Daycare Calculation" defaultHide={true}>
                    {describeStat(pageData['daycare'], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Hack Calculation" defaultHide={true}>
                    {describeStat(pageData['hack'], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Wish Calculation" defaultHide={true}>
                    {describeStat(pageData['wish'], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Adventure Stats">
                <ul>
                    <li key="power" className=""><strong>Total Power:</strong> <span className="text-red-500">{pn(totalPower(playerStates), fmt)}</span></li>
                    <li key="toughness" className=""><strong>Total Toughness:</strong> <span className="text-red-500">{pn(totalToughness(playerStates), fmt)}</span></li>
                    <li key="health" className=""><strong>Total Health:</strong> <span className="text-red-500">{pn(totalHealth(playerStates), fmt)}</span></li>
                    <li key="regen" className=""><strong>Total Regen:</strong> <span className="text-red-500">{pn(totalRegen(playerStates), fmt)}</span></li>
                </ul>
                <ContentSubsection title="Adventure Power Calculation" defaultHide={true}>
                    {describeStat(pageData['advPower'], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Adventure Toughness Calculation" defaultHide={true}>
                    {describeStat(pageData['advToughness'], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Adventure Health Calculation" defaultHide={true}>
                    {describeStat(pageData['advHealth'], fmt)}
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Misc Stats">
                <ul>
                    <li key="goldDrop"><strong>Total Gold Drop:</strong> <span className="text-red-500">{pn(totalGoldDrop(playerStates), fmt)}%</span></li>
                    <li key="respawn"><strong>Total Respawn:</strong> <span className="text-red-500">{pn(totalRespawnRate(playerStates), fmt, 2)}%</span> ({pn(totalRespawnRate(playerStates).divide(bd(25)), fmt, 2)} seconds)</li>
                    <li key="dropChance"><strong>Total Drop Chance:</strong> <span className="text-red-500">{pn(totalDropChance(playerStates), fmt)}%</span></li>
                </ul>
                <ContentSubsection title="Gold Drop Calculation" defaultHide={true}>
                    {describeStat(pageData['gold'], fmt)}
                </ContentSubsection>
                <ContentSubsection title="Respawn Calculation" defaultHide={true}>
                    {describeStat(pageData['respawn'], fmt, true)}
                </ContentSubsection>
                <ContentSubsection title="Drop Chance Calculation" defaultHide={true}>
                    {describeStat(pageData['dropChance'], fmt)}
                </ContentSubsection>
            </ContentSection>
        </Container>
    )
}
