export default {
  name: "diet",
  title: "Diett",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Diett",
      type: "string",
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
          lists: [],
        },
      ],
    },
  ],
};
