export const dataUrlToFile = async (dataUrl, fileName) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const image = new File([blob], fileName, { type: 'image/png' })
  return image;
}