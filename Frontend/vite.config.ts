import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'
import gymsData from './src/features/gym/data/gyms.json'

const getDynamicRoutes = () => {
  const uniqueBarangays = [...new Set(gymsData.gyms.map((gym) => gym.barangay))]
  const dynamicRoutes = uniqueBarangays.map(
    (barangay) => `/barangay/${barangay.toLowerCase().replace(/\s+/g, '-')}`
  )
  return ['/all-gyms', ...dynamicRoutes]
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://puertoprincesagyms.vercel.app',
      dynamicRoutes: getDynamicRoutes(),
      robots: [{ userAgent: '*', allow: '/' }]
    }),
  ],
})
