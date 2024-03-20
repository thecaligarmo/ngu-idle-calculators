'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import Link from 'next/link';

export default function Home({children}) {
    return (
        <Container title="NGU Idle">
            <ContentSection title="Welcome">
                  <p>
                      A little wesbite to help with calculations because filling out spreadsheets is hard.
                  </p>
            </ContentSection>
        </Container>
    )
}

