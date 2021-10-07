export default {
  name: "person",
  title: "Personlige opplysninger",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      }
    },
    {
      name: "allergy",
      title: "Allergi",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "allergy" }]
        }
      ]
    },
    {
      name: "diet",
      title: "Diett",
      type: "reference",
      to: { type: "diet" }
    },
    {
      name: "comment",
      title: "Eventuelle kommentarer",
      type: "text"
    }
  ]
}
