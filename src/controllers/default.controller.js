const getHome = (req, res) => {
  res.json({ message: "Api qui gere l'application airbnb" });
};

export const DefaultController = { getHome };
