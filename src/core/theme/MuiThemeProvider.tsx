import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useTheme } from "./ThemeContext";

/**
 * Wrapper responsável por sincronizar o tema da aplicação
 * com o Material UI.
 *
 * Converte o tema global (light/dark) para o palette.mode do MUI.
 */
export default function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}