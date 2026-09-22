import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import "./assets/fonts/fonts.css";
import "atropos/css";
import App from "./App";

import { ProductLiveDataProvider } from "./contexts/ProductLiveDataContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MensWearProvider } from "./contexts/MensWearContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductLiveDataProvider>
          <MensWearProvider>
            <App />
          </MensWearProvider>
        </ProductLiveDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
