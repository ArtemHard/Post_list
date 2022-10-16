export const useLikes = (likes, personId) => {
  if (likes.length === 0) return null;
  const like = {
    amount: likes.length,
    color: likes.includes(personId) ? "red" : "none",
  };

  return like;
};
