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
        vazir: "Vazir",
        iransans:"IRANsans"
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
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
          a: {
            color: "#0099A5",
            textDecoration: "underline"
          },

          "ol, ul": {
            listStylePosition: "inside"
          },

          ol: {
            listStyleType: "decimal"
          },

          ul: {
            listStyleType: "disc"
          },

          "ul li::marker": {
            margin: 0
          },

          hr: {
            margin: "12px 0",
            borderColor: theme("colors.slate.300")
          },

          ".wrapper": {
            position: "relative",
            border: "2px solid #0099A5",
            borderRadius: "6px",
            overflow: "hidden",
            zIndex: 2
          },

          ".wrapper::before": {
            content: `attr(data-type)`,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
            fontSize: 10,
            padding: "0 2px",
            color: "white",
            backgroundColor: "#0099A5"
          },

          "#table-container": {
            button: {
              padding: "6px 15px",
              backgroundColor: theme("colors.primary"),
              color: "white",
              borderRadius: 8,
              fontSize: 14
            },

            "input, select": {
              padding: "6px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }
          },

          table: {
            border: "2px solid",
            borderColor: theme("colors.slate.200"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.slate.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.slate.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.slate.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            },

            div: {
              verticalAlign: "middle"
            }
          },

          "table.table-black": {
            border: "2px solid",
            borderColor: theme("colors.black.200"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.black.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.black")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.slate.200")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-blue": {
            border: "2px solid",
            borderColor: theme("colors.blue.200"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.blue.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.blue.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.blue.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-red": {
            border: "2px solid",
            borderColor: theme("colors.red.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.red.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.red.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.red.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-green": {
            border: "2px solid",
            borderColor: theme("colors.green.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.green.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.green.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.green.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-purple": {
            border: "2px solid",
            borderColor: theme("colors.purple.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.purple.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.purple.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.purple.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-orange": {
            border: "2px solid",
            borderColor: theme("colors.orange.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.orange.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.orange.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.orange.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },
          "table.table-transparent": {
            border: "2px solid",
            borderColor: theme("colors.slate.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.slate.400")
            },

            thead: {
              tr: {
                backgroundColor: "transparent"
              },
              td: {
                color: "black"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: "transparent"
                },
                "&:nth-child(odd)": {
                  backgroundColor: "transparent"
                }
              }
            }
          },

          "div[data-columns='column']": {
            border: "1px solid #d1d1d1"
          },

          ".tooltip": {
            position: "relative",
            display: "inline-block"
          },

          ".tooltip .tooltiptext": {
            display: "none"
          },

          ".tooltip:hover .tooltiptext": {
            visibility: "visible",
            opacity: 1
          }
        }
      },
      preview: {
        css: {
          a: {
            color: "#0099A5",
            textDecoration: "underline"
          },

          "ol, ul": {
            listStylePosition: "inside"
          },

          ol: {
            listStyleType: "decimal"
          },

          ul: {
            listStyleType: "disc"
          },

          "ul li::marker": {
            margin: 0
          },

          hr: {
            margin: "12px 0",
            borderColor: theme("colors.slate.300")
          },

          ".wrapper": {
            position: "relative",
            border: "2px solid",
            borderColor: theme("colors.slate.300"),
            borderRadius: "6px",
            zIndex: 2,
            resize: "none !important",

            input: {
              padding: "5px 10px",
              borderRadius: "6px"
            },

            "#input-error-message": {
              color: theme("colors.red.600"),
              fontSize: "12px"
            }
          },

          "div[data-type='editor'] .wrapper": {
            resize: "both !important"
          },

          ".wrapper[data-type='image-preview']": {
            height: "fit-content !important"
          },

          ".wrapper input[required] + label": {
            display: "block !important"
          },

          ".wrapper:has(> input[data-readonly])": {
            border: "none !important"
          },

          ".wrapper:has(> input[data-hidden])": {
            border: "none !important"
          },

          div: {
            verticalAlign: "middle"
          },

          "#table-container": {
            button: {
              padding: "6px 15px",
              backgroundColor: theme("colors.primary"),
              color: "white",
              borderRadius: 8,
              fontSize: 14
            },

            "input, select": {
              padding: "6px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }
          },

          table: {
            border: "2px solid",
            borderColor: theme("colors.slate.200"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.slate.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.slate.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.slate.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            },

            div: {
              verticalAlign: "middle"
            }
          },

          "table.table-black": {
            border: "2px solid",
            borderColor: theme("colors.black.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.black.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.black")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.slate.200")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-blue": {
            border: "2px solid",
            borderColor: theme("colors.blue.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.blue.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.blue.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.blue.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-red": {
            border: "2px solid",
            borderColor: theme("colors.red.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.red.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.red.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.red.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-green": {
            border: "2px solid",
            borderColor: theme("colors.green.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.green.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.green.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.green.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-purple": {
            border: "2px solid",
            borderColor: theme("colors.purple.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.purple.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.purple.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.purple.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },

          "table.table-orange": {
            border: "2px solid",
            borderColor: theme("colors.orange.500"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.orange.200")
            },

            thead: {
              tr: {
                backgroundColor: theme("colors.orange.400")
              },
              td: {
                color: "white"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: theme("colors.orange.100")
                },
                "&:nth-child(odd)": {
                  backgroundColor: "white"
                }
              }
            }
          },
          "table.table-transparent": {
            border: "2px solid",
            borderColor: theme("colors.slate.200"),
            td: {
              border: "2px solid",
              borderColor: theme("colors.slate.400")
            },

            thead: {
              tr: {
                backgroundColor: "transparent"
              },
              td: {
                color: "black"
              }
            },

            tbody: {
              tr: {
                "&:nth-child(even)": {
                  backgroundColor: "transparent"
                },
                "&:nth-child(odd)": {
                  backgroundColor: "transparent"
                }
              }
            }
          },

          ".tooltip": {
            position: "relative",
            display: "inline-block"
          },

          ".tooltip .tooltiptext": {
            visibility: "hidden",
            maxWidth: "300px",
            backgroundColor: "white",
            color: "#000",
            textAlign: "center",
            whiteSpace: "nowrap",
            borderRadius: "5px",
            padding: "5px 10px",
            position: "absolute",
            zIndex: 10,
            bottom: "125%",
            left: "50%",
            marginLeft: "-60px",
            fontSize: "10px",
            border: "1px solid",
            borderColor: theme("colors.slate.300"),
            boxShadow: "0px 5px 12px -8px rgba(0,0,0,0.75)",
            opacity: 0,
            transition: "opacity 0.3s"
          },

          ".tooltip:hover .tooltiptext": {
            visibility: "visible",
            opacity: 1
          }
        }
      }
    })
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
