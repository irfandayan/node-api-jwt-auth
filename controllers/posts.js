export const getPosts = (req, res) => {
  // res.json({
  //   posts: {
  //     title: "my first post",
  //     description: "random data you should not access",
  //   },
  // });
  res.send(req.user);
};
