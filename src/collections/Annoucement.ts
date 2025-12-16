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
    defaultColumns: ['title', 'isLive', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // If this announcement is being set to live
        if (data.isLive === true) {
          // Set all other announcements to not live
          await req.payload.update({
            collection: 'annoucement',
            where: {
              id: {
                not_equals: data.id,
              },
            },
            data: {
              isLive: false,
            },
          })
        }
        return data
      },
    ],
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
    {
      name: 'isLive',
      type: 'checkbox',
      label: 'Is Live',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Only one announcement can be live at a time. Setting this to true will automatically set all other announcements to not live.',
      },
    },
  ],
}
