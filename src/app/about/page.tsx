'use client'
import ContentSubsection from '@/components/contentSubsection';
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { getNumberFormat } from '@/helpers/context';
import { bd, pn } from '@/helpers/numbers';
import { createStatesForData } from '@/helpers/stateForData';
import Link from 'next/link';
import bigDecimal from "js-big-decimal";
import { Stat } from '@/assets/stat';
import { apItemInfo, beardInfoPerm, beardInfoTemp, challengeInfo, diggerInfo, equipmentInfo, isMaxxedItem, nguInfo, perkInfo, quirkInfo, totalEnergyBar, totalEnergyCap, totalEnergyNGUSpeedFactor, totalEnergyPower, totalMagicBar, totalMagicCap, totalMagicNGUSpeedFactor, totalMagicPower } from '@/helpers/calculators';
import { PropsWithChildren } from 'react';

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
        </Container>
    )
}
