import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'status', 'category'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of the event',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      admin: {
        description: 'End date for multi-day events',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'upcoming',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Competition', value: 'competition' },
        { label: 'Seminar', value: 'seminar' },
        { label: 'Fest', value: 'fest' },
        { label: 'Meetup', value: 'meetup' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'location',
      type: 'text',
      required: false,
    },
    {
      name: 'registrationLink',
      type: 'text',
      required: false,
      admin: {
        description: 'External registration link',
      },
    },
    {
      name: 'maxParticipants',
      type: 'number',
      required: false,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage',
      },
    },
  ],
}
