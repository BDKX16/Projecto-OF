export const createCarouselAdapter = (content) => ({
  id: content._id,
  createdAt: content.createdAt,
  description: content.description,
  imagesUrl: content.imagesUrl,
  link: content.link,
  title: content.title,
  type: content.type,
});
