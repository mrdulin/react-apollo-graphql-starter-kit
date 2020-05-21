function b64toFile(base64: string, name: string, type: string): File {
  const binaryString = window.atob(base64);
  const bytes = Uint8Array.from(binaryString.split('').map((_, i) => binaryString.charCodeAt(i)));

  return new File([bytes.buffer], name, { type });
}
export { b64toFile };
