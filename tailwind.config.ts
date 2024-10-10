import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/app/**/*.{jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],

    corePlugins: {
        preflight: false,
    }
}

export default config
