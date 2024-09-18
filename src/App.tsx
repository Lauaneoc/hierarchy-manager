import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ApiProviderTractian } from "./@shared/contexts/ApiTractianContext";
import { AuthProvider } from "./@shared/contexts/AuthContext";

export function App() {
  
  return (
    <AuthProvider>
      <ApiProviderTractian>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApiProviderTractian>
    </AuthProvider>
  )
}

