import { Head } from "aleph/framework/react/head.ts";
import {
  createTheme,
  ThemeProvider,
} from "https://esm.sh/@mui/material@5.14.4/styles";
import CssBaseline from "https://esm.sh/@mui/material@5.14.4/CssBaseline";
import Box from "https://esm.sh/@mui/material@5.14.4/Box";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Head></Head>
      <Box sx={{ margin: "1%", padding: "1%" }}>{children}</Box>
    </ThemeProvider>
  );
}
