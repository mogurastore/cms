import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	cache: { provider: cacheCloudflare() },
	routeRules: {
		"/": { maxAge: 300, tags: ["posts", "emdash:taxonomy:tag", "emdash:widget-area:footer"] },
		"/posts": { maxAge: 300, tags: ["posts", "emdash:taxonomy:tag", "emdash:widget-area:footer"] },
		"/posts/[slug]": { maxAge: 300, tags: ["posts", "emdash:taxonomy:tag", "emdash:taxonomy:category", "emdash:widget-area:sidebar", "emdash:widget-area:footer"] },
		"/pages/[slug]": { maxAge: 300, tags: ["pages", "emdash:widget-area:footer"] },
		"/category/[slug]": { maxAge: 300, tags: ["posts", "emdash:taxonomy:tag", "emdash:widget-area:footer"] },
		"/tag/[slug]": { maxAge: 300, tags: ["posts", "emdash:taxonomy:tag", "emdash:widget-area:footer"] },
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
