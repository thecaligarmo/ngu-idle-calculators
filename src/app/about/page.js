'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import Link from 'next/link';

export default function Page({children}) {
    return (
        <Container title="About/Credits">
            <ContentSection title="Credits">
                <>
                    <p>
                        Most of the data/calculations found on this website are obtained from the following google spreadsheets.
                        The import/save feature is taken from Gear Optimizer.
                    </p>
                    <ul className="list-disc pl-5">
                        <li key="gearOptimizer"><Link href="https://gmiclotte.github.io/gear-optimizer/">Gear Optimizer</Link></li>
                        <li key="simpleRatioCal"><Link href="https://docs.google.com/spreadsheets/d/1gy4GtvZZlNQG_uWd-DWVvl2hBi6Ha18A9ojFgXevuLA/">NGU - Simple ratio calculator by ily</Link></li>
                    </ul>
                </>
            </ContentSection>
        </Container>
    )
}

