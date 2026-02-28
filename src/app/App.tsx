import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "../core/auth/AuthContext";
import { ThemeProvider } from "../core/theme/ThemeContext";
import MuiThemeWrapper from "../core/theme/MuiThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <MuiThemeWrapper>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MuiThemeWrapper>
    </ThemeProvider>
  );
}

export default App;