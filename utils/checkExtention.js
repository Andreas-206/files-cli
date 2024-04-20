export function checkExtention(fileName) {
  const EXTENTIONS = ["html", "css", "js", "txt", "jsx", "docs"];
  const index = fileName.lastIndexOf(".");
  const extention = fileName.slice(index + 1);
  const result = {
    extention,
    check: EXTENTIONS.includes(extention),
  };
  return result;
}
