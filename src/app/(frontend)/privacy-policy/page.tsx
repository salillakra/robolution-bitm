import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { renderLexical } from '@/lib/lexicalToHtml'
import type { PrivacyPolicy } from '@/payload-types'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 3600 // doesn't change often

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default async function PrivacyPolicyPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'privacy-policy',
    where: {
      isActive: { equals: true },
    },
    limit: 1,
  })

  const policy = docs[0]
  if (!policy) notFound()

  // convert all Lexical content to HTML
  const introductionHtml = await renderLexical(policy.introduction)
  const sectionsHtml = await Promise.all(
    policy.sections?.map(async (section: PrivacyPolicy['sections'][number]) => ({
      ...section,
      sectionContentHtml: await renderLexical(section.sectionContent),
      subsectionsHtml: await Promise.all(
        section.subsections?.map(
          async (sub: NonNullable<PrivacyPolicy['sections'][number]['subsections']>[number]) => ({
            ...sub,
            subsectionContentHtml: await renderLexical(sub.subsectionContent),
          }),
        ) || [],
      ),
    })) || [],
  )

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans">
      <header className="border-b border-white/10 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="items-center text-white/60 flex hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/40">
            {policy.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
            <span>Version {policy.version}</span>
            <span>•</span>
            <span>Effective: {formatDate(policy.effectiveDate)}</span>
          </div>
        </div>

        {/* Introduction */}
        <div
          className="prose prose-invert prose-lg max-w-none text-white/70 mb-12"
          dangerouslySetInnerHTML={{
            __html: introductionHtml,
          }}
        />

        {/* Sections */}
        <div className="space-y-12">
          {sectionsHtml.map((section, i: number) => (
            <section
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                {i + 1}. {section.sectionTitle}
              </h2>

              <div
                className="prose prose-invert max-w-none text-white/70 mb-6"
                dangerouslySetInnerHTML={{
                  __html: section.sectionContentHtml,
                }}
              />

              {section.subsectionsHtml?.length > 0 && (
                <div className="space-y-6 mt-8 pl-6 border-l-2 border-white/20">
                  {section.subsectionsHtml.map((sub, j: number) => (
                    <div key={j}>
                      <h3 className="text-xl font-semibold mb-3 text-white/90">
                        {i + 1}.{j + 1} {sub.subsectionTitle}
                      </h3>
                      <div
                        className="prose prose-invert max-w-none text-white/60"
                        dangerouslySetInnerHTML={{
                          __html: sub.subsectionContentHtml,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Contact */}
        {policy.contactInformation && (
          <div className="mt-16 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">Contact Us</h2>

            <div className="space-y-3 text-white/70">
              {policy.contactInformation.email && (
                <p>
                  <strong className="text-white">Email:</strong>{' '}
                  <a
                    href={`mailto:${policy.contactInformation.email}`}
                    className="underline hover:text-white"
                  >
                    {policy.contactInformation.email}
                  </a>
                </p>
              )}

              {policy.contactInformation.address && (
                <p>
                  <strong className="text-white">Address:</strong>
                  <br />
                  <span className="whitespace-pre-line">{policy.contactInformation.address}</span>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-white/40 text-sm">
          Last updated: {formatDate(policy.updatedAt)}
        </div>
      </main>

      <Footer />
    </div>
  )
}
