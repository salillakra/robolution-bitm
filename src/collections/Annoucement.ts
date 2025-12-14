import {
  FixedToolbarFeature,
  lexicalEditor,
  SubscriptFeature,
  SuperscriptFeature,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Annoucement: CollectionConfig = {
  slug: 'annoucement',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'content'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          FixedToolbarFeature(),
          ...defaultFeatures.filter((feature) => feature.key !== 'relationship'),
          SubscriptFeature(),
          SuperscriptFeature(),
        ],
      }),
      required: true,
    },
  ],
}
