/**
 * Hashes the given data using SHA-256.
 * @param data The data to hash.
 * @returns The hash of the data.
 */
export async function sha256(data: string): Promise<string> {
  const utf8Encoder = new TextEncoder().encode(data);

  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8Encoder);
  const hashArray = [...new Uint8Array(hashBuffer)];
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
