import {
  createClient,
  createPreviewSubscriptionHook,
  createPortableTextComponent,
} from "next-sanity"

const config = {
  projectId: "8duvt6tu",
  dataset: "production",
  apiVersion: "2021-09-01",
  useCdn: false,
}

// Import this client whenever there's a need to fetch content from the Sanity project.
export const sanityClient = createClient(config)

// For real-time client side preview by streaming the whole dataset to the browser.
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Portable text stores rich text content as an array of blocks and custom block types (block = paragraph).
export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {},
})