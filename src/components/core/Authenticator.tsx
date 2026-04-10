import type { PropsWithChildren } from "react";
import {
  Authenticator as AmplifyAuthenticator,
  ThemeProvider as AmplifyThemeProvider,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box, Typography } from "@mui/material";
import type { Theme } from "@aws-amplify/ui-react";

export const Authenticator: React.FC<PropsWithChildren> = ({ children }) => {

const theme: Theme = {
  name: "bookshelf-dark-blue",
  tokens: {
    colors: {
      background: {
        primary: { value: "#0b1120" }, // deep black-blue
      },

      font: {
        primary: { value: "#e5e7eb" },
        secondary: { value: "#9ca3af" },
      },

      brand: {
        primary: {
          10: { value: "#e0f2fe" },
          20: { value: "#bae6fd" },
          40: { value: "#38bdf8" },
          60: { value: "#0ea5e9" },
          80: { value: "#0284c7" },
          90: { value: "#0369a1" },
          100: { value: "#075985" },
        },
        secondary: {
          10: { value: "#111827" },
          20: { value: "#1f2937" },
          40: { value: "#374151" },
          60: { value: "#4b5563" },
          80: { value: "#6b7280" },
          90: { value: "#9ca3af" },
          100: { value: "#e5e7eb" },
        },
      },
    },

    radii: {
      small: { value: "10px" },
      medium: { value: "14px" },
      large: { value: "18px" },
    },

    shadows: {
      small: { value: "0 2px 10px rgba(0,0,0,0.3)" },
      medium: { value: "0 8px 30px rgba(0,0,0,0.5)" },
      large: { value: "0 15px 50px rgba(0,0,0,0.7)" },
    },

    components: {
      authenticator: {
        container: {
          backgroundColor: { value: "#0b1120" },
        } as any,
        modal: {
          backgroundColor: { value: "#111827" },
          borderRadius: { value: "16px" },
          boxShadow: { value: "{shadows.large}" },
        } as any,
        router: {
          borderWidth: { value: "0" },
        },
      },

      button: {
        primary: {
          backgroundColor: { value: "#0ea5e9" },
          color: { value: "#ffffff" },
          borderRadius: { value: "10px" },
          fontWeight: { value: "600" },
          _hover: {
            backgroundColor: { value: "#0284c7" },
          },
        },
      },

      fieldcontrol: {
        backgroundColor: { value: "#1f2937"},
        color: { value: "#e5e7eb" },
        borderColor: { value: "#374151" },
        borderRadius: { value: "10px" },
        _focus: {
          borderColor: { value: "#0ea5e9" },
          boxShadow: { value: "0 0 0 2px rgba(14,165,233,0.3)" },
        },
      },

      tabs: {
        item: {
          color: { value: "#9ca3af" },
          _active: {
            color: { value: "#0ea5e9" },
            borderColor: { value: "#0ea5e9" },
            fontWeight: { value: "600" },
          } as any,
          _hover: {
            color: { value: "#38bdf8" },
          },
        },
      },
    },
  },
};

  return (
    <AmplifyThemeProvider theme={theme}>
      <AmplifyAuthenticator
        variation="modal"
        signUpAttributes={["given_name", "family_name"]}
        components={{
          Header: () => (
            <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #0ea5e9, #1e3a8a)",
                        color: "#fff",
                        py: "1.2rem",
                        borderRadius: "1rem 1rem 0 0",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    }}
            >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                        }}
                    >
                        Bookshelf
                    </Typography>
            </Box>
          ),
          Footer: () => (
            <Box
              sx={{
                background: "#fff",
                borderRadius: " 0 0 1rem 1rem",
                py: "0.4rem",
              }}
            ></Box>
          ),
        }}
        formFields={{
          signIn: {
            username: {
              label: "Email",
              placeholder: "Enter your email",
            },
          },
          signUp: {
            username: {
              label: "Email",
              placeholder: "Enter your email",
            },
            given_name: {
              label: "First name",
              placeholder: "Enter your first name",
            },
            family_name: {
              label: "Last name",
              placeholder: "Enter your last name",
            },
          },
        }}
      >
        {children}
      </AmplifyAuthenticator>
    </AmplifyThemeProvider>
  );
};