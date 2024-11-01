export function fileToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result! as string).split(",")[1]); // Strip the "data:*/*;base64," prefix
    reader.onerror = (error) => reject(error);
  });
}
