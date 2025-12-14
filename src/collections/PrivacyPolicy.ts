import type { CollectionConfig } from 'payload'

export const PrivacyPolicy: CollectionConfig = {
  slug: 'privacy-policy',
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
      defaultValue: 'Privacy Policy',
      admin: {
        description: 'Title of the privacy policy document',
      },
    },
    {
      name: 'version',
      type: 'text',
      required: true,
      defaultValue: '1.0',
      admin: {
        description: 'Version number of this policy',
      },
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Date when this policy becomes effective',
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
        description: 'Introduction section of the privacy policy',
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
            description: 'Title of this section (e.g., "Information We Collect")',
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
        description: 'Set this as the active privacy policy',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // If this policy is being set as active, deactivate all others
        if (data.isActive && operation === 'update') {
          const allPolicies = await req.payload.find({
            collection: 'privacy-policy',
            where: {
              id: {
                not_equals: data.id,
              },
            },
          })

          for (const policy of allPolicies.docs) {
            await req.payload.update({
              collection: 'privacy-policy',
              id: policy.id,
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
