export async function sha256(data: string): Promise<string> {
  const utf8Encoder = new TextEncoder().encode(data);

  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8Encoder);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}
