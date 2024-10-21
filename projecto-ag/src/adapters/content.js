export const createContentAdapter = (content) => ({
  title: content.title,
  description: content.description,
  categorys: content.categorys,
  videoUrl: content.videoUrl,
  coverUrl: content.coverUrl,
  price: content.price,
  date: content.createdAt,
  id: content.id,
  status: content.state,
});
