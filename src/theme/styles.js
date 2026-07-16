import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      50: "#e6f1fe",
      100: "#b3d6fc",
      200: "#80bbfb",
      300: "#4da1f9",
      400: "#1a86f8",
      500: "#0878F9", // Brand Blue
      600: "#0756B8", // Deep Blue
      700: "#054593",
      800: "#032e62",
      900: "#011731",
    },
    brandScheme: {
      50: "#e6f1fe",
      100: "#b3d6fc",
      200: "#80bbfb",
      300: "#4da1f9",
      400: "#1a86f8",
      500: "#0878F9",
      600: "#0756B8",
      700: "#054593",
      800: "#032e62",
      900: "#011731",
    },
    brandTabs: {
      50: "#FFF2E5",
      100: "#ffe0c2",
      200: "#ffcc99",
      300: "#ffb870",
      400: "#ffa347",
      500: "#FF851B", // Brand Orange
      600: "#cc6a16",
      700: "#994f10",
      800: "#66350b",
      900: "#331b05",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
