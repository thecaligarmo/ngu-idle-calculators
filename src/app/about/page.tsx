'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import Link from 'next/link';

export default function Page() {
    return (
        <Container title="About/Credits">
            <ContentSection title="Credits">
                <>
                    <p>
                        Most of the data/calculations found on this website are obtained from the following google spreadsheets.
                    </p>
                    <ul className="list-disc pl-5">
                        <li key="gearOptimizer">
                            <Link href="https://gmiclotte.github.io/gear-optimizer/">Gear Optimizer</Link> (Importing Save File)
                        </li>
                        <li key="simpleRatioCal">
                            <Link href="https://docs.google.com/spreadsheets/d/1gy4GtvZZlNQG_uWd-DWVvl2hBi6Ha18A9ojFgXevuLA/">NGU - Simple ratio calculator by ily</Link> (Ratios)
                        </li>
                        <li key="expPPNguCal">
                            <Link href="https://docs.google.com/spreadsheets/d/1_tR_k-X32DPe5sd1ACKfHmY6uuiqDOYNsSxxb0EqZOo/">The Bestest MostPerfectest Exp, PP and NGU Calculator</Link> (NGUs)
                        </li>
                        <li key="farmerSancBoostAlmanac">
                            <Link href="https://docs.google.com/spreadsheets/d/1UyOPvZ_Gen02xfJZuPGnOQNVETxoQXlYJ9ObHmmDWRI/edit#gid=0">Farmer Sanc&apos;s Boost Almanac</Link> (Optimal Zone) - Last updated 11/29/20 - Discord: Sancdar#0032
                        </li>
                        <li key="sancPPSheet">
                            <Link href="https://docs.google.com/spreadsheets/d/1v9yA1Cv8W7OS1Vo_3LU3rHVBsPXaFRzP4T7Di2ZT3YY/edit?usp=sharing">Sanc&apos;s Giant PP (and EXP/etc.)</Link> (Daily) - Last Updated 7/04/2021 - Discord: Sancdar#0032
                        </li>
                        <li key="blaze">
                            <Link href="https://docs.google.com/spreadsheets/d/1S1JXe3kZeqzxBOVXMo2-Db6iSrfeS42oTeBuVIarjmY/">Blaze&apos;s Junkyard - v1.482</Link> (Wandoos, Ygg)
                        </li>
                    </ul>
                </>
            </ContentSection>
            <ContentSection title="About">
                <>
                <p>
                    This website was created by Cali. The NGU discord can be found <Link href="https://discord.gg/HapA3J8j">here</Link> and my username on there is <span className="text-green-500">thecaligarmo</span>. if you ee any bugs and/or want any additional features, just lemme know.
                </p>
                <p>
                    To see what has updated between versions, you can check out the <Link href="https://github.com/thecaligarmo/ngu-idle-calculators/releases">github releases page</Link>.
                </p>
                </>
            </ContentSection>
        </Container>
    )
}
