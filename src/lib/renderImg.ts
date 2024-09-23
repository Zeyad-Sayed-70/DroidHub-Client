export function renderImg(imageSrc: string) {
  return `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/${imageSrc}`;
}
