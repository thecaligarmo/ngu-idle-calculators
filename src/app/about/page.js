'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { getPlayerData } from '@/helpers/context';
import { defaultPlayerData } from '@/helpers/defaultPlayerData';
import { createStatesForData, getRequiredStates } from '@/helpers/stateForData';
import Link from 'next/link';

export default function Page({children}) 
{
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
                        <Calc title="Total Energy NGU Speed Factor">
                            <ul>
                                <li>Base Energy NGU Speed</li>
                                <li>x Energy Power*</li>
                                <li>x Equipment</li>
                                <li>x &apos;A Number&apos; Set</li>
                                <li>x Magic NGU</li>
                                <li>x Beard</li>
                                <li>x Digger</li>
                                <li>x Perk</li>
                                <li>x Challenge</li>
                            </ul>
                        </Calc>

                        <Calc title="Total Magic NGU Speed Factor">
                            <ul>
                                <li>Base Magic NGU Speed</li>
                                <li>x Magic Power*</li>
                                <li>x Equipment</li>
                                <li>x &apos;A Number&apos; Set</li>
                                <li>x Energy NGU</li>
                                <li>x Beard</li>
                                <li>x Digger</li>
                                <li>x Perk</li>
                                <li>x Challenge</li>
                                <li>x Troll Challenge</li>
                            </ul>
                        </Calc>
                    </div>
                    <p className="text-sm my-5">
                        * These are also calculations and are not in the save file.
                    </p>
                </>
            </ContentSection>
        </Container>
    )
}

function Calc({children, title}) {
    return (                        
    <div className="mt-2">
        <h4 className="text-lg"><span className='underline'>{title}</span> = </h4>
        {children}
    </div>
    )
}

