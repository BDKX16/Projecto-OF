export const createContentAdapter = (content) => ({
  title: content.title,
  description: content.description,
  videoUrl: content.videoUrl,
  coverUrl: content.coverUrl,
  price: content.price,
  date: content.createdAt,
  id: content._id,
  status: content.state,
});
