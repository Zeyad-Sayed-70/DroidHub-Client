export function renderImg(imageSrc: string | undefined) {
  if (!imageSrc) return "/robo-user.png";
  if (imageSrc.includes("http")) return imageSrc;
  return `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${imageSrc}`;
}
