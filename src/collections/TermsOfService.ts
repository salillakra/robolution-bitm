import type { CollectionConfig } from 'payload'

export const TermsOfService: CollectionConfig = {
  slug: 'terms-of-service',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'version', 'effectiveDate', 'updatedAt'],
    group: 'Legal',
  },
  access: {
    read: () => true, // Public access
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Terms of Service',
      admin: {
        description: 'Title of the terms of service document',
      },
    },
    {
      name: 'version',
      type: 'text',
      required: true,
      defaultValue: '1.0',
      admin: {
        description: 'Version number of these terms',
      },
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Date when these terms become effective',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'introduction',
      type: 'richText',
      required: true,
      admin: {
        description: 'Introduction section of the terms of service',
      },
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          admin: {
            description: 'Title of this section (e.g., "Acceptance of Terms")',
          },
        },
        {
          name: 'sectionContent',
          type: 'richText',
          required: true,
          admin: {
            description: 'Content of this section',
          },
        },
        {
          name: 'subsections',
          type: 'array',
          fields: [
            {
              name: 'subsectionTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'subsectionContent',
              type: 'richText',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'acceptanceRequired',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether users must explicitly accept these terms',
      },
    },
    {
      name: 'contactInformation',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'pratyumnis@bitmesra.ac.in',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Set this as the active terms of service',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // If these terms are being set as active, deactivate all others
        if (data.isActive && operation === 'update') {
          const allTerms = await req.payload.find({
            collection: 'terms-of-service',
            where: {
              id: {
                not_equals: data.id,
              },
            },
          })

          for (const terms of allTerms.docs) {
            await req.payload.update({
              collection: 'terms-of-service',
              id: terms.id,
              data: {
                isActive: false,
              },
            })
          }
        }
        return data
      },
    ],
  },
}
