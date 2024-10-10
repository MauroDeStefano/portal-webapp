import type {StorybookConfig} from "@storybook/nextjs";
import path from "node:path";

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],

    webpackFinal: async (config) => {
        config.resolve ??= {};
        config.resolve.alias ??= {};

        // @ts-ignore
        config.resolve.alias["@"] = path.resolve(__dirname, "../src");
        // @ts-ignore
        config.resolve.alias["@root"] = path.resolve(__dirname, "../");
        // @ts-ignore
        config.resolve.alias["@i18n"] = path.resolve(__dirname, "../locales");

        return config;
    }
};
export default config;
