export const formatValues = (format, values) => {
  switch (format) {
    case "all_underscored":
      return values.join("_").replace(/[ ]+/g, "_");
    case "all_dashed":
      return values.join("-").replace(/[ ]+/g, "-");
    case "dashed_upper":
      return values
        .join("-")
        .replace(/[ ]+/g, "-")
        .toUpperCase();
    case "underscored_upper":
      return values
        .join("_")
        .replace(/[ ]+/g, "_")
        .toUpperCase();
    case "dashed_lower":
      return values
        .join("-")
        .replace(/[ ]+/g, "-")
        .toUpperCase()
        .toLowerCase();
    case "underscored_lower":
      return values
        .join("_")
        .replace(/[ ]+/g, "_")
        .toLowerCase();
    case "all_spaced_upper":
      return values.join(" ").toUpperCase();
    case "all_spaced_lower":
      return values.join(" ").toLowerCase();
    case "no_format":
      return values.join(" ");
    default:
      break;
  }
};
