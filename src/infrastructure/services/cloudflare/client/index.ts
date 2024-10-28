"use server";
import { Cloudflare } from "cloudflare";
import "server-only";

/**
 * Create a new Cloudflare client.
 * @returns The Cloudflare client.
 */
export async function createClient() {
  // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject -- Required for async function and we have to return a promise.
  return Promise.resolve(
    new Cloudflare({
      apiEmail: process.env.CLOUDFLARE_EMAIL,
      apiToken: process.env.CLOUDFLARE_API_TOKEN,
    }),
  );
}
