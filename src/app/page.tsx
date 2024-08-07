'use client'
import Container from '@/components/container';
import ContentSection from '@/components/contentSection';



export default function Home() {
    return (
        <Container title="NGU Idle">
            <ContentSection title="Welcome">
                  <p>
                      A little wesbite to help with calculations because filling out spreadsheets is hard.
                      It is currently in alpha.
                  </p>
            </ContentSection>
        </Container>
    )
}

