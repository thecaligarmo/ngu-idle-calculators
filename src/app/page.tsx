'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';
import { PropsWithChildren } from 'react';



export default function Home() {
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

