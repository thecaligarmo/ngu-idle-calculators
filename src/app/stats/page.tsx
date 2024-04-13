'use client'
import ContentSubsection from '@/components/contentSubsection';
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { getNumberFormat } from '@/components/context';
import { bd, pn } from '@/helpers/numbers';
import { createStatesForData } from '@/helpers/stateForData';
import bigDecimal from "js-big-decimal";
import { Stat } from '@/assets/stat';
import { totalEnergyBar, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalGoldDrop, totalMagicBar, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower, totalRespawnRate } from '@/helpers/calculators';
import {apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, isMaxxedItemSet, nguInfo, perkInfo, quirkInfo} from '@/helpers/resourceInfo';
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
                If you see anything wrong, let me know.
            </p>

            <ContentSection title="Energy / Magic">
                <ContentSubsection title="Energy Power" defaultHide={true}>
                    <ul>
                        <li key="base">Base Energy Power ({pn(v('baseEnergyPower'), fmt)})</li>
                        <li key="equip">x Equipment ({pn(equipmentInfo(playerStates, Stat.ENERGY_POWER), fmt)}%) </li>
                        <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.ENERGY_POWER), fmt)}%)</li>
                        <li key="quirk">x Quirk ({pn(quirkInfo(playerStates, Stat.ENERGY_POWER), fmt)}%)</li>
                        <li key="apitems">x Potions ({pn(apItemInfo(playerStates, Stat.ENERGY_POWER), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalEnergyPower(playerStates), fmt)}</span></li>
                    </ul>
                    <p className="mt-3">Similarly with the other basic stats:</p>
                    <ul>
                        <li key="eBar"><strong>Energy Bar:</strong> <span className="text-red-500">{pn(totalEnergyBar(playerStates), fmt)}</span></li>
                        <li key="eCap"><strong>Energy Cap:</strong> <span className="text-red-500">{pn(totalEnergyCap(playerStates), fmt)}</span></li>
                        
                        <li key="mPow"><strong>Magic Power:</strong> <span className="text-red-500">{pn(totalMagicPower(playerStates), fmt)}</span></li>
                        <li key="mBar"><strong>Magic Bar:</strong> <span className="text-red-500">{pn(totalMagicBar(playerStates), fmt)}</span></li>
                        <li key="mCap"><strong>Magic Cap:</strong> <span className="text-red-500">{pn(totalMagicCap(playerStates), fmt)}</span></li>
                    </ul>
                </ContentSubsection>
            </ContentSection>
            <ContentSection title="NGU">
                    <ContentSubsection title="Total Energy NGU Speed Factor" defaultHide={true}>
                        <ul>
                            <li key="base">Base Energy NGU Speed (100%)</li>
                            <li key="energyPower">x Energy Power ({pn(totalEnergyPower(playerStates).multiply(bd(100)), fmt)}%)</li>
                            <li key="equipment">x Equipment ({pn(equipmentInfo(playerStates, Stat.ENERGY_NGU_SPEED).round(), fmt)}%)</li>
                            <li key="Number">x &apos;A Number&apos; Set ({pn(isMaxxedItemSet(playerStates, ItemSets.NUMBER) ? bd(110) : bd(100), fmt)}%)</li>
                            <li key="magicNGU">x Magic NGU ({pn(nguInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                            <li key="beard">x Beard ({pn(beardInfoPerm(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100)).multiply(beardInfoTemp(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100))).multiply(bd(100)).round(), fmt)}%)</li>
                            <li key="digger">x Digger ({pn(diggerInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                            <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.ENERGY_NGU_SPEED).round(), fmt)}%)</li>
                            <li key="challenge">x Challenge ({pn(challengeInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                            <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalEnergyNGUSpeedFactor(playerStates), fmt)}%</span></li>
                        </ul>
                        <p className="mt-3">Similarly with Magic:</p>
                        <ul>
                            <li key="total" className=""><strong>Total Magic NGU Speed Factor:</strong> <span className="text-red-500">{pn(totalMagicNGUSpeedFactor(playerStates), fmt)}%</span></li>
                        </ul>
                        
                    </ContentSubsection>
            </ContentSection>
            {/* <ContentSection title="Adventure Stats">
                <div>
                    <ContentSubsection title="Adventure Power">
                        <ul>
                            <li key="base">Base Adventure Power</li>
                            <li key="equipment">+ Equipment Power</li>
                            <li key="infinity Cube">+ Infinity Cube</li>
                            <li key="subtotal" className="border-white border-t-2 border-solid">Subtotal: </li>
                            <li key="at">x Advanced Training</li>
                            <li key="engu">x Energy NGU</li>
                            <li key="mngu">x Magic NGU</li>
                            <li key="digger">x Digger</li>
                            <li key="basicChallenge">x Basic Challenge</li>
                            <li key="beard">x Beard</li>
                            <li key="perk">x Perk</li>
                            <li key="quirk">x Quirk</li>
                        </ul>
                    </ContentSubsection>
                </div>
            </ContentSection> */}
            <ContentSection title="Misc Stats">
                <ContentSubsection title="Gold Drop" defaultHide={false}>
                    <ul>
                        <li key="base">Base Gold Drop (100%)</li>
                        <li key="equipment">x Equipment ({pn(equipmentInfo(playerStates, Stat.GOLD_DROP), fmt, 3)}%)</li>
                        <li key="ngu">x NGU ({pn(nguInfo(playerStates, Stat.GOLD_DROP), fmt)}%)</li>
                        <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.GOLD_DROP), fmt)}%)</li>
                        <li key="quirk">x Quirk ({pn(quirkInfo(playerStates, Stat.GOLD_DROP), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalGoldDrop(playerStates), fmt)}%</span></li>
                    </ul>
                </ContentSubsection>
                <ContentSubsection title="Respawn" defaultHide={true}>
                    <ul>
                        <li key="base">Base Respawn Rate (100% - 4 seconds)</li>
                        <li key="equipment">x Equipment ({pn(bd(200).subtract(equipmentInfo(playerStates, Stat.RESPAWN)).round(), fmt)}%)</li>
                        <li key="ngu">x NGU ({pn(nguInfo(playerStates, Stat.RESPAWN), fmt, 2)}%)</li>
                        <li key="Number">x Clock Set Bonus ({pn(isMaxxedItemSet(playerStates, ItemSets.CLOCK) ? bd(95) : bd(100), fmt)}%)</li>
                        <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalRespawnRate(playerStates), fmt, 2)}%</span> ({pn(totalRespawnRate(playerStates).divide(bd(25)), fmt, 2)} seconds)</li>
                    </ul>
                </ContentSubsection>
            </ContentSection>
            <p className="text-sm my-5">
                * These are also calculations and are not in the save file.
            </p>
        </Container>
    )
}
