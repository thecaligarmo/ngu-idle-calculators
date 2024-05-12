'use client'
import ContentSubsection from '@/components/contentSubsection';
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { getNumberFormat } from '@/components/context';
import { bd, pn } from '@/helpers/numbers';
import { createStatesForData } from '@/helpers/stateForData';
import bigDecimal from "js-big-decimal";
import { Stat } from '@/assets/stat';
import { totalAPBonus, totalDropChance, totalEnergyBar, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalExpBonus, totalGoldDrop, totalMagicBar, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower, totalPPBonus, totalPower, totalRespawnRate, totalToughness } from '@/helpers/calculators';
import {achievementAPBonus, advTrainingInfo, apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, isMaxxedItem, isMaxxedItemSet, macguffinInfo, nguInfo, perkInfo, quirkInfo} from '@/helpers/resourceInfo';
import { ItemSets } from '@/assets/sets';

export default function Page() {
    const playerStates = createStatesForData();
    var fmt = getNumberFormat();
    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key : string) : bigDecimal{
        var x = playerStates[key][0]
        if (x instanceof bigDecimal) {
            return x
        }
        return bd(x)
    }
    function j(key : string) : any{
        var x = playerStates[key][0]
        if (typeof x === 'string') {
            return JSON.parse(x)
        } else if (typeof x === 'number') {
            return {}
        }
        return x
    }

    
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
                </ul>
                <ContentSubsection title="Energy Power Calculation" defaultHide={true}>
                    <ul className="ml-5">
                        <li key="base">Base Energy Power ({pn(v('baseEnergyPower'), fmt, 2)})</li>
                        <li key="equip">x Equipment ({pn(equipmentInfo(playerStates, Stat.ENERGY_POWER), fmt, 2)}%) </li>
                        <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.ENERGY_POWER), fmt)}%)</li>
                        <li key="quirk">x Quirk ({pn(quirkInfo(playerStates, Stat.ENERGY_POWER), fmt)}%)</li>
                        <li key="apitems">x Potions ({pn(apItemInfo(playerStates, Stat.ENERGY_POWER), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalEnergyPower(playerStates), fmt, 4)}</span></li>
                    </ul>
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="NGU">
                <ul>
                    <li key="eNGU" className=""><strong>Total Energy NGU Speed Factor:</strong> <span className="text-red-500">{pn(totalEnergyNGUSpeedFactor(playerStates), fmt)}%</span></li>
                    <li key="mNGU" className=""><strong>Total Magic NGU Speed Factor:</strong> <span className="text-red-500">{pn(totalMagicNGUSpeedFactor(playerStates), fmt)}%</span></li>
                </ul>
                <ContentSubsection title="Total Energy NGU Speed Factor Calculation" defaultHide={true}>
                    <ul className="ml-5">
                        <li key="base">Base Energy NGU Speed (100%)</li>
                        <li key="energyPower">x Energy Power ({pn(totalEnergyPower(playerStates).multiply(bd(100)), fmt)}%)</li>
                        <li key="equipment">x Equipment ({pn(equipmentInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                        <li key="Number">x &apos;A Number&apos; Set ({pn(isMaxxedItemSet(playerStates, ItemSets.NUMBER) ? bd(110) : bd(100), fmt)}%)</li>
                        <li key="magicNGU">x Magic NGU ({pn(nguInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                        <li key="beard">x Beard ({pn(beardInfoPerm(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100)).multiply(beardInfoTemp(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100))).multiply(bd(100)).round(), fmt)}%)</li>
                        <li key="digger">x Digger ({pn(diggerInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                        <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.ENERGY_NGU_SPEED).round(), fmt)}%)</li>
                        <li key="challenge">x Challenge ({pn(challengeInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalEnergyNGUSpeedFactor(playerStates), fmt)}%</span></li>
                    </ul>
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Exp/AP/PP">
                <ul>
                    <li key="exp"><strong>Total Exp Bonus:</strong> <span className="text-red-500">{pn(totalExpBonus(playerStates), fmt, 2)}%</span></li>
                    <li key="ap"><strong>Total AP Bonus:</strong> <span className="text-red-500">{pn(totalAPBonus(playerStates), fmt, 2)}%</span></li>
                    <li key="pp"><strong>Total PP Bonus:</strong> <span className="text-red-500">{pn(totalPPBonus(playerStates), fmt, 2)}%</span></li>
                </ul>
                <ContentSubsection title="Exp Calculation" defaultHide={true}>
                    <ul className='ml-5'>
                        <li key="base">Base Exp Gain (100%)</li>
                        <li key="heart">x Red Heart Bonus ({pn(isMaxxedItem(playerStates, 119) ? bd(110) : bd(100), fmt)}%)</li>
                        <li key="ngu">x NGU ({pn(nguInfo(playerStates, Stat.EXPERIENCE), fmt, 2)}%)</li>
                        <li key="digger">x Digger ({pn(diggerInfo(playerStates, Stat.EXPERIENCE), fmt, 2)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalExpBonus(playerStates), fmt, 2)}%</span></li>
                    </ul>
                </ContentSubsection>
                <ContentSubsection title="AP Calculation" defaultHide={true}>
                    <ul className='ml-5'>
                    <li key="base">Base AP Gain (100%)</li>
                        <li key="heart">x Yellow Heart Bonus ({pn(isMaxxedItem(playerStates, 129) ? bd(120) : bd(100), fmt)}%)</li>
                        <li key="ngu">x Achievements ({pn(achievementAPBonus(playerStates), fmt, 2)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalAPBonus(playerStates), fmt, 2)}%</span></li>
                    </ul>
                </ContentSubsection>
                <ContentSubsection title="PP Calculation" defaultHide={true}>
                    <ul className='ml-5'>
                        <li key="base">Base PP Gain (100%)</li>
                        <li key="heart">x Green Heart Bonus ({pn(isMaxxedItem(playerStates, 171) ? bd(120) : bd(100), fmt)}%)</li>
                        <li key="podKey">x Pissed Off Key Bonus ({pn(isMaxxedItem(playerStates, 172) ? bd(110) : bd(100), fmt)}%)</li>
                        <li key="ngu">x NGU ({pn(nguInfo(playerStates, Stat.PP), fmt)}%)</li>
                        <li key="digger">x Digger ({pn(diggerInfo(playerStates, Stat.PP), fmt, 2)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalPPBonus(playerStates), fmt, 2)}%</span></li>
                    </ul>
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Adventure Stats">
                <ul>
                    <li key="power" className=""><strong>Total Power:</strong> <span className="text-red-500">{pn(totalPower(playerStates), fmt)}</span></li>
                    <li key="toughness" className=""><strong>Total Toughness:</strong> <span className="text-red-500">{pn(totalToughness(playerStates), fmt)}</span></li>
                </ul>
                <ContentSubsection title="Adventure Power Calculation" defaultHide={true}>
                    <ul className="ml-5">
                        <li key="base">Base Adventure Power ({pn(v('baseAdventurePower'), fmt)})</li>
                        <li key="equipment">+ Equipment Power + Infinity Cube ({pn(equipmentInfo(playerStates, Stat.POWER), fmt)})</li>
                        <li key="subtotal" className="border-white border-t-2 border-solid">Subtotal: {pn(v('baseAdventurePower').add(equipmentInfo(playerStates, Stat.POWER)), fmt)}</li>
                        <li key="at">x Advanced Training ({pn(advTrainingInfo(playerStates, Stat.POWER), fmt)}%)</li>
                        <li key="engu">x (Energy x Magic) NGU ({pn(nguInfo(playerStates, Stat.POWER), fmt)}%)</li>
                        <li key="digger">x Digger ({pn(diggerInfo(playerStates, Stat.POWER), fmt)}%)</li>
                        <li key="basicChallenge">x Basic Challenge ({pn(challengeInfo(playerStates, Stat.POWER), fmt)}%)</li>
                        <li key="beardTemp">x Beard (this run) ({pn(beardInfoTemp(playerStates, Stat.POWER), fmt)}%)</li>
                        <li key="beardPerm">x Beard (permanent) ({pn(beardInfoPerm(playerStates, Stat.POWER), fmt)}%)</li>
                        <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.POWER).round(), fmt)}%)</li>
                        <li key="quirk">x Quirk ({pn(quirkInfo(playerStates, Stat.POWER).round(), fmt)}%)</li>
                        <li key="beastMode">x Beast Mode ({v('beastMode').compareTo(bd(1)) == 0 ? pn(bd(140), fmt) : pn(bd(100), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalPower(playerStates), fmt)}</span></li>
                    </ul>
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="Misc Stats">
                <ul>
                    <li key="goldDrop"><strong>Total Gold Drop:</strong> <span className="text-red-500">{pn(totalGoldDrop(playerStates), fmt)}%</span></li>
                    <li key="respawn"><strong>Total Respawn:</strong> <span className="text-red-500">{pn(totalRespawnRate(playerStates), fmt, 2)}%</span> ({pn(totalRespawnRate(playerStates).divide(bd(25)), fmt, 2)} seconds)</li>
                    <li key="dropChance"><strong>Total Drop Chance:</strong> <span className="text-red-500">{pn(totalDropChance(playerStates), fmt)}%</span></li>
                </ul>
                <ContentSubsection title="Gold Drop Calculation" defaultHide={true}>
                    <ul className='ml-5'>
                        <li key="base">Base Gold Drop (100%)</li>
                        <li key="equipment">x Equipment ({pn(equipmentInfo(playerStates, Stat.GOLD_DROP), fmt, 3)}%)</li>
                        <li key="ngu">x NGU ({pn(nguInfo(playerStates, Stat.GOLD_DROP), fmt)}%)</li>
                        <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.GOLD_DROP), fmt)}%)</li>
                        <li key="quirk">x Quirk ({pn(quirkInfo(playerStates, Stat.GOLD_DROP), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalGoldDrop(playerStates), fmt)}%</span></li>
                    </ul>
                </ContentSubsection>
                <ContentSubsection title="Respawn Calculation" defaultHide={true}>
                    <ul className='ml-5'>
                        <li key="base">Base Respawn Rate (100% - 4 seconds)</li>
                        <li key="equipment">x Equipment ({pn(bd(200).subtract(equipmentInfo(playerStates, Stat.RESPAWN)).round(), fmt)}%)</li>
                        <li key="ngu">x NGU ({pn(nguInfo(playerStates, Stat.RESPAWN), fmt, 2)}%)</li>
                        <li key="Number">x Clock Set Bonus ({pn(isMaxxedItemSet(playerStates, ItemSets.CLOCK) ? bd(95) : bd(100), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalRespawnRate(playerStates), fmt, 2)}%</span> ({pn(totalRespawnRate(playerStates).divide(bd(25)), fmt, 2)} seconds)</li>
                    </ul>
                </ContentSubsection>
                <ContentSubsection title="Drop Chance Calculation" defaultHide={true}>
                    <ul className='ml-5'>
                        <li key="base">Base Drop Chance Rate (100%)</li>
                        <li key="equipment">x Equipment ({pn(equipmentInfo(playerStates, Stat.DROP_CHANCE), fmt)}%)</li>
                        <li key="macguffin">x MacGuffin ({pn(macguffinInfo(playerStates, Stat.DROP_CHANCE), fmt, 2)}%)</li>
                        <li key="2d">x 2D Set Bonus ({pn(isMaxxedItemSet(playerStates, ItemSets.TWO_D) ? bd(107.43) : bd(100), fmt, 2)}%) </li>
                        <li key="blood">x Blood Magic ({pn(v('bloodMagicDropChance').add(bd(100)), fmt)}%)</li>
                        <li key="Yggdrasil">x Yggdrasil Fruit ({pn(v('yggdrasilDropChance'), fmt)}%)</li>
                        <li key="ngu">x NGU ({pn(nguInfo(playerStates, Stat.DROP_CHANCE), fmt)}%)</li>
                        <li key="digger">x Digger ({pn(diggerInfo(playerStates, Stat.DROP_CHANCE), fmt, 2)}%)</li>
                        <li key="beardTemp">x Beard (this run) ({pn(beardInfoTemp(playerStates, Stat.DROP_CHANCE), fmt)}%)</li>
                        <li key="beardPerm">x Beard (permanent) ({pn(beardInfoPerm(playerStates, Stat.DROP_CHANCE), fmt)}%)</li>
                        <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.DROP_CHANCE), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalDropChance(playerStates), fmt)}%</span></li>
                    </ul>
                </ContentSubsection>
            </ContentSection>
        </Container>
    )
}
