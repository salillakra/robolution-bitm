import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PrivacyPolicy } from './collections/PrivacyPolicy'
import { TermsOfService } from './collections/TermsOfService'
import { TeamMembers } from './collections/TeamMembers'
import { Events } from './collections/Events'
import { AboutUs } from './collections/AboutUs'
import { Annoucement } from './collections/Annoucement'
import { Sponsors } from './collections/Sponsors'
import { Gallery } from './collections/Gallery'
import { Newsletter } from './collections/Newsletter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: './components/Logo',
      },
    },
  },
  collections: [
    Users,
    Media,
    PrivacyPolicy,
    TermsOfService,
    TeamMembers,
    Events,
    AboutUs,
    Annoucement,
    Sponsors,
    Gallery,
    Newsletter,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        radio: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        date: false,
        payment: false,
      },
    }),
  ],
})
