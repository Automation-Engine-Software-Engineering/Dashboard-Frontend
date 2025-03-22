/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))"
      },

      fontFamily: {
        vazir: "Vazir"
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    },
    typography: ({ theme }) => ({
      form: {
        css: {
          color: theme("colors.gray.600"),
          input: {
            backgroundColor: "white",
            border: "1px solid #000",
            borderRadius: 5,
            boxShadow: "0 10px 20px -20px #000"
          }
        }
      },

      editor: {
        css: {
          "input, select": {
            borderRadius: "6px",
            border: "1px solid",
            borderColor: theme("colors.slate.300"),
            padding: "8px 12px",
            backgroundColor: "#FFFFFF"
          },

          table: {
            border: "1px solid",
            borderColor: theme("colors.slate.500"),
            td: {
              border: "1px solid",
              borderColor: theme("colors.slate.300")
            },
            tr: {
              "&:nth-child(odd)": {
                backgroundColor: theme("colors.slate.200")
              }
            }
          }
        }
      }
    })
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
