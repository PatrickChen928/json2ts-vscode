const REG = /{.+:.+}/;

export function isJson(stringContent: string) {
  try {
    JSON.parse(stringContent);
  } catch (e) {
    return REG.test(stringContent);
  }
  return true;
}