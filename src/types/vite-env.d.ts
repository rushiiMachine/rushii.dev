interface ViteTypeOptions {
    strictImportMetaEnv: true
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
    readonly VITE_GITHUB_API_TOKEN: string
}
