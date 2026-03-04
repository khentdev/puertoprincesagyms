import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'
import gymsData from './src/features/gym/data/gyms.json'
import fs from 'fs'
import type { Plugin } from 'vite'

const getDynamicRoutes = () => {
  const uniqueBarangays = [...new Set(gymsData.gyms.map((gym) => gym.barangay))]
  const dynamicRoutes = uniqueBarangays.map(
    (barangay) => `/barangay/${barangay.toLowerCase().replace(/\s+/g, '-')}`
  )
  return ['/all-gyms', ...dynamicRoutes]
}

const ensureSitemapsDir = (): Plugin => ({
  name: 'ensure-sitemaps-dir',
  enforce: 'pre',
  closeBundle() {
    fs.mkdirSync('dist/sitemaps', { recursive: true })
  }
})

export default ({
  plugins: [
    vue(),
    tailwindcss(),
    ensureSitemapsDir(),
    Sitemap({
      hostname: 'https://puertoprincesagyms.vercel.app/',
      dynamicRoutes: getDynamicRoutes(),
      changefreq: "weekly",
      priority: 0.8,
    }),
  ],
  ssgOptions: {
    includedRoutes: () => getDynamicRoutes(),
    script: 'async'
  }
})