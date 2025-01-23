
import Container from "../components/Container"
import ContentSection from "../components/ContentSection"

export default function IndexPage() {
    return (
        <Container title="NGU Idle">
            <ContentSection title="Welcome">
                <>
                    <p>
                        A little wesbite to help with calculations because filling out spreadsheets is hard.
                    </p>
                    <p>
                        The website is currently in beta. If you see any bugs (or if you want any extra features), please let Cali know on discord (<span className='text-green-500'>thecaligarmo</span>).
                    </p>
                    <br />
                    <br />
                    <p>
                        <strong>Quick Note:</strong> Pressing the + and - on the left hand sides expand and collapse the sections. Try it by pressing the button next to Welcome now.
                    </p>
                </>
            </ContentSection>
        </Container>
    )
}