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

          table: {
            border: "2px solid",
            borderColor: theme("colors.slate.500"),
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

          "div[data-columns='column']": {
            border: "1px solid #d1d1d1"
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
            overflow: "hidden",
            zIndex: 2,
            resize: "none !important"
          },

          ".wrapper input[required] + label": {
            display: "block !important"
          },

          ".wrapper:has(> input[data-readonly])": {
            border: "none !important"
          },

          div: {
            verticalAlign: "middle"
          },

          table: {
            border: "2px solid",
            borderColor: theme("colors.slate.500"),
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
          }
        }
      }
    })
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
