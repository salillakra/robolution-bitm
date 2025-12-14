import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { ArrowLeft, Bell } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { renderLexical } from '@/lib/lexicalToHtml'

export const revalidate = 6200 // Revalidate every hour

export default async function AnnouncementsPage() {
  const payload = await getPayload({ config })

  const { docs: announcements } = await payload.find({
    collection: 'annoucement', // Matching the slug in Annoucement.ts
    limit: 50,
    sort: '-createdAt',
  })

  // render content
  const processedAnnouncements = await Promise.all(
    announcements.map(async (item) => ({
      ...item,
      contentHtml: await renderLexical(item.content),
    })),
  )

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
      <header className="border-b border-white/10 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="items-center text-white/60 flex hover:text-white transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 text-indigo-400">
            <Bell className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Updates</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Title */}
        <div className="mb-20 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/40 relative z-10">
            Announcements
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed relative z-10">
            Stay updated with the latest news, updates, and important information from Robolution.
          </p>
        </div>

        {/* Announcements Stream */}
        <div className="space-y-12 relative z-10">
          {processedAnnouncements.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
              <p className="text-white/40 text-lg">No announcements at the moment.</p>
            </div>
          ) : (
            processedAnnouncements.map((item) => (
              <article
                key={item.id}
                className="group relative bg-black/40 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md overflow-hidden hover:border-indigo-500/30 transition-colors duration-500"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-px bg-linear-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4 text-xs font-mono tracking-wider text-indigo-300/80">
                      <span className="bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        ANNOUNCEMENT
                      </span>
                      {item.createdAt && <span>{formatDate(item.createdAt)}</span>}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
                      {item.title}
                    </h2>
                  </header>

                  <div
                    className="prose prose-invert prose-lg max-w-none text-white/70 prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-code:text-indigo-200 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
                    dangerouslySetInnerHTML={{
                      __html: item.contentHtml,
                    }}
                  />
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
