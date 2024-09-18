export const createCarouselAdapter = (content) => ({
  id: content._id,
  createdAt: content.createdAt,
  description: content.description,
  imagesURL: content.imagesURL,
  link: content.link,
  title: content.title,
  type: content.type,
});
