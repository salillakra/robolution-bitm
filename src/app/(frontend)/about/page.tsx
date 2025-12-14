import { getPayload } from 'payload'
import config from '@/payload.config'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import DarkVeil from '@/components/DarkVeil'
import { renderLexical } from '@/lib/lexicalToHtml'
import { notFound } from 'next/navigation'
import AboutPageClient from './page.client'

export const revalidate = 3600

const AboutPage = async () => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'about-us',
    limit: 1,
  })

  const aboutData = docs[0]

  if (!aboutData) {
    return notFound()
  }

  const mainContentHtml = await renderLexical(aboutData.mainContent)
  const missionHtml = aboutData.mission ? await renderLexical(aboutData.mission) : ''
  const visionHtml = aboutData.vision ? await renderLexical(aboutData.vision) : ''

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans">
      <Navbar />

      <AboutPageClient
        data={aboutData}
        mainContentHtml={mainContentHtml}
        missionHtml={missionHtml}
        visionHtml={visionHtml}
      />

      <Footer />
    </div>
  )
}

export default AboutPage
