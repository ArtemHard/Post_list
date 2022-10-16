export const useTags = (tags) => {
  const comma = ",";
  if (tags.length === 0) return null;
  else {
    const mappedTag = tags.map((item, index) => {
      if (index + 1 === tags.length) {
        return item;
      } else {
        return item.replace(comma, "") + ", ";
      }
    });
    return mappedTag;
  }
};
