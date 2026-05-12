import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// repo has to be exact 
export default defineConfig({
  plugins: [react()],
  base: "/Uniform"
})
