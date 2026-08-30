import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

//todo: https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests/', //! <-- ім'я репозиторію
  //! Налаштування Аліасів для абсолютних шляхів імпортів
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

