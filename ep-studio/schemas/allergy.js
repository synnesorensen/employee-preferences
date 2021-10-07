export default {
  name: "allergy",
  title: "Allergier",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Allergi",
      type: "string"
    },
    {
      name: "descr",
      title: "Beskrivelse",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: []
        }
      ]
    }
  ]
}