import { ThemeProvider } from "@mui/system";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import theme from "./utils/theme";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
