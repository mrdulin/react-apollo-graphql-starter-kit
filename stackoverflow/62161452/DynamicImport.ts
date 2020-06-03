export async function DynamicImport({ id, loader }) {
  console.log('real implementation');
  return loader();
}
