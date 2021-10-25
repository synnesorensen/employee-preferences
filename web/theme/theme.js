import { theming } from "@stacc/bento";

const reset = theming.createGlobal({
  baseReset: theming.cssResets,
});

const fontFamily = {
  heading: "Circe",
  body: "Circe",
};

const fontWeight = {
  bold: "800",
  normal: "400",
};

theming.theme.append({
  name: "My theme",
  fontWeight,
  fontFamily,
  reset,
});
