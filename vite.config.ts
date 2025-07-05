import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPluginRaw from 'vite-plugin-monaco-editor';

// 🛠️ Fix: manually access the default export from CommonJS
const monacoEditorPlugin = (monacoEditorPluginRaw as any).default;

export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService'],
      customWorkers: [
        {
          label: 'typescript',
          entry: 'monaco-editor/esm/vs/language/typescript/ts.worker'
        }
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['monaco-editor > monaco-editor-core']
  },
  build: {
    chunkSizeWarningLimit: 3000
  }
});
