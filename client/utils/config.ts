import Constants from "expo-constants";

// Acceder a las variables de entorno desde app.json
export const config = {
  apiUrl: Constants.expoConfig?.extra?.environment || "https://localhost:8080",
  environment: Constants.expoConfig?.extra?.environment || "development",
};

// También puedes acceder directamente
export const getApiUrl = () => Constants.expoConfig?.extra?.apiUrl;
export const getEnvironment = () => Constants.expoConfig?.extra?.environment;
