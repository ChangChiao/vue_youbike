module.exports = {
    mode: "jit",
    purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                base: "#0E5978",
                sub: "#f9bc60",
                alert: "#f45d48",
                bg: "#f8f5f2",
                blue: "#F0F9FC",
                primary: {
                    300: "#F0F9FC",
                    500: "#12749D",
                    700: "#0A4259"
                },
                red: {
                    100: "#F4DCDC",
                    500: "#CC1010"
                },
                orange: {
                    100: "#F5E6D0",
                    500: "#EB8F05"
                },
                grey: {
                    100: "#f4f5f4",
                    300: "#c3cbcd",
                    500: "#737b7d",
                    700: "#3e3232",
                    900: "#232323"
                }
            }
        }
    },
    plugins: []
};
