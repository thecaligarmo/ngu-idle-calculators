'use client'
import CalcSection from '@/components/calcSection';
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { getNumberFormat, getPlayerData } from '@/helpers/context';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { bd, pn } from '@/helpers/numbers';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import Link from 'next/link';
import bigDecimal from "js-big-decimal";
import { ITEMS, updateStats } from '@/assets/items';
import { Stat } from '@/assets/stat';
import { beardInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, isMaxxedItem, nguInfo, perkInfo, quirkInfo, totalEnergyBar, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalMagicBar, totalMagicCap, totalMagicPower } from '@/helpers/calculators';

export default function Page({children}) 
{
    const playerStates = createStatesForData();
    var fmt = getNumberFormat();
    // Helper function - Needed in every isntance (makes code easier to read too)
    function v(key) {
        var x = playerStates[key][0]
        if (x instanceof bigDecimal) {
        return x
        }
        return bd(x)
    }
    function j(key) {
        var x = playerStates[key][0]
        if (typeof x === 'string') {
            return JSON.parse(x)
        } else if (typeof x === 'number') {
            return {}
        }
        return x
    }
    
    // var x = totalEnergyPower(playerStates);
    // console.log(x)
    // console.log(isMaxxedItem(playerStates, 102))
    
    return (
        <Container title="About/Credits">
            <ContentSection title="Credits">
                <>
                    <p>
                        Most of the data/calculations found on this website are obtained from the following google spreadsheets.
                    </p>
                    <ul className="list-disc pl-5">
                        <li key="gearOptimizer"><Link href="https://gmiclotte.github.io/gear-optimizer/">Gear Optimizer</Link> (Importing Save File)</li>
                        <li key="simpleRatioCal"><Link href="https://docs.google.com/spreadsheets/d/1gy4GtvZZlNQG_uWd-DWVvl2hBi6Ha18A9ojFgXevuLA/">NGU - Simple ratio calculator by ily</Link> (Ratios)</li>
                        <li key="expPPNguCal"><Link href="https://docs.google.com/spreadsheets/d/1_tR_k-X32DPe5sd1ACKfHmY6uuiqDOYNsSxxb0EqZOo/">The Bestest MostPerfectest Exp, PP and NGU Calculator</Link> (NGUs)</li>
                    </ul>
                </>
            </ContentSection>

            <ContentSection title="Calculations">
                <>
                    <p>
                        The following is a list of the calculations I am making.
                        If you see anything wrong, let me know.
                    </p>
                    <div>
                        <CalcSection title="Energy Power">
                            <ul>
                                <li key="base">Base Energy Power ({pn(v('baseEnergyPower'), fmt)})</li>
                                <li key="equip">x Equipment ({pn(equipmentInfo(playerStates, Stat.ENERGY_POWER).round(), fmt)}%) </li>
                                <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.ENERGY_POWER).round(), fmt)}%)</li>
                                <li key="quirk">x Quick ({pn(quirkInfo(playerStates, Stat.ENERGY_POWER).round(), fmt)}%)</li>
                                <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalEnergyPower(playerStates), fmt)}</span></li>
                            </ul>
                            <p className="mt-3">Similarly with the other basic stats:</p>
                            <ul>
                                <li key="eCap"><strong>Energy Cap:</strong> <span className="text-red-500">{pn(totalEnergyCap(playerStates), fmt)}</span></li>
                                <li key="eBar"><strong>Energy Bar:</strong> <span className="text-red-500">{pn(totalEnergyBar(playerStates), fmt)}</span></li>
                                <li key="mPow"><strong>Magic Power:</strong> <span className="text-red-500">{pn(totalMagicPower(playerStates), fmt)}</span></li>
                                <li key="mCap"><strong>Magic Cap:</strong> <span className="text-red-500">{pn(totalMagicCap(playerStates), fmt)}</span></li>
                                <li key="mBar"><strong>Magic Bar:</strong> <span className="text-red-500">{pn(totalMagicBar(playerStates), fmt)}</span></li>
                            </ul>
                        </CalcSection>
                        <CalcSection title="Total Energy NGU Speed Factor">
                            <ul>
                                <li key="base">Base Energy NGU Speed (100%)</li>
                                <li key="energyPower">x Energy Power ({pn(totalEnergyPower(playerStates).multiply(bd(100)), fmt)}%)</li>
                                <li key="equipment">x Equipment ({pn(equipmentInfo(playerStates, Stat.ENERGY_NGU_SPEED).round(), fmt)}%)</li>
                                <li key="Number">x &apos;A Number&apos; Set ({pn(isMaxxedItem(playerStates, 102) ? bd(110) : bd(100), fmt)}%)</li>
                                <li key="magicNGU">x Magic NGU ({pn(nguInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                                <li key="beard">x Beard ({pn(beardInfoPerm(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100)).multiply(beardInfoTemp(playerStates, Stat.ENERGY_NGU_SPEED).divide(bd(100))).multiply(bd(100)).round(), fmt)}%)</li>
                                <li key="digger">x Digger ({pn(diggerInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                                <li key="perk">x Perk ({pn(perkInfo(playerStates, Stat.ENERGY_NGU_SPEED).round(), fmt)}%)</li>
                                <li key="challenge">x Challenge ({pn(challengeInfo(playerStates, Stat.ENERGY_NGU_SPEED), fmt)}%)</li>
                                <li key="total" className="mt-2 border-white border-t-2 border-solid"><strong>Total:</strong> <span className="text-red-500">{pn(totalEnergyNGUSpeedFactor(playerStates), fmt)}</span></li>
                            </ul>
                        </CalcSection>

                        <CalcSection title="Total Magic NGU Speed Factor">
                            <ul>
                                <li key="base">Base Magic NGU Speed</li>
                                <li key="energyPower">x Magic Power*</li>
                                <li key="equipment">x Equipment</li>
                                <li key="Number">x &apos;A Number&apos; Set</li>
                                <li key="energyNGU">x Energy NGU</li>
                                <li key="beard">x Beard</li>
                                <li key="digger">x Digger</li>
                                <li key="perk">x Perk</li>
                                <li key="challenge">x Challenge</li>
                                <li key="trollChallenge">x Troll Challenge</li>
                            </ul>
                        </CalcSection>
                    </div>
                    <p className="text-sm my-5">
                        * These are also calculations and are not in the save file.
                    </p>
                </>
            </ContentSection>
        </Container>
    )
}
