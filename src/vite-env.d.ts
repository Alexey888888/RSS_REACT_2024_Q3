/// <reference types="vite/client" />

declare module 'react-csv' {
  export const CSVLink: React.FC<{
    data: object[];
    filename: string;
    children?: React.ReactNode;
  }>;
}
