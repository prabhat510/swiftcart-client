import { environment } from "src/environments/environment";

const env =  environment.production ? "prod": "dev";

export function getServiceUrl() {
    switch (env) {
      case "dev":
        return {
          swiftCartApiEndpoint: "http://localhost:3000/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
      case "prod":
        return {
          swiftCartApiEndpoint: "https://swiftcart-uo5v.onrender.com/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
      default:
        return {
          swiftCartApiEndpoint: "https://swiftcart-uo5v.onrender.com/api",
          authApiEndpoint: "https://jwt-authservice-production.up.railway.app/api/auth",
        };
    }

   
}