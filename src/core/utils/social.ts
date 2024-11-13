/**
 * Asynchronously loads a Google Font and returns its data as an ArrayBuffer.
 * @param font - The name of the Google Font to load.
 * @param weight - The weight of the font to load.
 * @returns A promise that resolves to an ArrayBuffer containing the font data.
 * @throws Will throw an error if the font data could not be loaded.
 */
export async function loadGoogleFont(
  font: string,
  weight:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900" = "400",
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
  const cssFile = await fetch(url);
  const css = await cssFile.text();
  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}
