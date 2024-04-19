'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { getNumberFormat } from '@/components/context';
import { bd} from '@/helpers/numbers';
import { createStatesForData } from '@/helpers/stateForData';
import Link from 'next/link';
import bigDecimal from "js-big-decimal";

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
                        <li key="farmerSancBoostAlmanac"><Link href="https://docs.google.com/spreadsheets/d/1UyOPvZ_Gen02xfJZuPGnOQNVETxoQXlYJ9ObHmmDWRI/edit#gid=0">Farmer Sanc&apos;s Boost Almanac</Link> (boost / exp) - Last updated 11/29/20 - Discord: Sancdar#0032</li>
                    </ul>
                </>
            </ContentSection>
        </Container>
    )
}
