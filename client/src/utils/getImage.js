import { bytesBufferToBase64 } from "./byteArrayToBase64"

export const getImage = (bytea, defaultImage) => {
  if (!bytea) {
    return defaultImage
  }

  const base64buffer = bytesBufferToBase64(bytea);
  const imageSrc = `data:image/jpg;base64,${base64buffer}`;

  return imageSrc
}