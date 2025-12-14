import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { renderLexical } from '@/lib/lexicalToHtml'
import type { TermsOfService } from '@/payload-types'
import { ArrowLeft } from 'lucide-react'

export default async function TermsOfServicePage() {
  const payload = await getPayload({ config })

  // fetch the active terms of service
  const termsData = await payload.find({
    collection: 'terms-of-service',
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 1,
  })

  const terms = termsData.docs[0]

  if (!terms) {
    notFound()
  }

  // convert all Lexical content to HTML
  const introductionHtml = await renderLexical(terms.introduction)
  const sectionsHtml = await Promise.all(
    terms.sections?.map(async (section: TermsOfService['sections'][number]) => ({
      ...section,
      sectionContentHtml: await renderLexical(section.sectionContent),
      subsectionsHtml: await Promise.all(
        section.subsections?.map(
          async (sub: NonNullable<TermsOfService['sections'][number]['subsections']>[number]) => ({
            ...sub,
            subsectionContentHtml: await renderLexical(sub.subsectionContent),
          }),
        ) || [],
      ),
    })) || [],
  )

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans">
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
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

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          {/* Title Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/40">
              {terms.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
              <span>Version {terms.version}</span>
              <span>•</span>
              <span>
                Effective:{' '}
                {new Date(terms.effectiveDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div
              className="text-white/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: introductionHtml }}
            />
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sectionsHtml.map((section, index: number) => (
              <section
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
              >
                <h2 className="text-3xl font-bold mb-6 text-white">
                  {index + 1}. {section.sectionTitle}
                </h2>
                <div
                  className="prose prose-invert max-w-none text-white/70 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: section.sectionContentHtml }}
                />

                {/* Subsections */}
                {section.subsectionsHtml && section.subsectionsHtml.length > 0 && (
                  <div className="space-y-6 mt-8 pl-6 border-l-2 border-white/20">
                    {section.subsectionsHtml.map((subsection, subIndex: number) => (
                      <div key={subIndex}>
                        <h3 className="text-xl font-semibold mb-3 text-white/90">
                          {index + 1}.{subIndex + 1} {subsection.subsectionTitle}
                        </h3>
                        <div
                          className="prose prose-invert max-w-none text-white/60 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: subsection.subsectionContentHtml,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Contact Information */}
          {terms.contactInformation && (
            <div className="mt-16 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Us</h2>
              <div className="space-y-3 text-white/70">
                {terms.contactInformation.email && (
                  <p>
                    <strong className="text-white">Email:</strong>{' '}
                    <a
                      href={`mailto:${terms.contactInformation.email}`}
                      className="text-white/90 hover:text-white underline"
                    >
                      {terms.contactInformation.email}
                    </a>
                  </p>
                )}
                {terms.contactInformation.address && (
                  <p>
                    <strong className="text-white">Address:</strong>
                    <br />
                    <span className="whitespace-pre-line">{terms.contactInformation.address}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Acceptance Notice */}
          {terms.acceptanceRequired && (
            <div className="mt-12 bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-white/80 text-center">
                By using our services, you acknowledge that you have read and agree to these Terms
                of Service.
              </p>
            </div>
          )}

          {/* Last Updated */}
          <div className="mt-12 text-center text-white/40 text-sm">
            Last updated:{' '}
            {new Date(terms.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
