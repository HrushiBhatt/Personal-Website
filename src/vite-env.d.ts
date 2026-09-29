/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key for the contact form (see .env.example). */
  readonly VITE_WEB3FORMS_KEY?: string
}

declare module '*?responsive' {
  const picture: import('./lib/picture').Picture
  export default picture
}
