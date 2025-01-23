// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APIGATEWAY_URL: string;

    // Adicione outras variáveis aqui, se necessário
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }