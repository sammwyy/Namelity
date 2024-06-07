import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import styles from "./styles";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const Theme = extendTheme({
  config,
  colors,
  styles,
});

export default Theme;
