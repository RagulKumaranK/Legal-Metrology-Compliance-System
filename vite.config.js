import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function databasePlugin() {
  const dbFilePath = path.resolve(__dirname, 'server_db.json')

  function getDb() {
    try {
      if (fs.existsSync(dbFilePath)) {
        const content = fs.readFileSync(dbFilePath, 'utf-8')
        return JSON.parse(content)
      }
    } catch (e) {}
    return null
  }

  function saveDb(data) {
    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (e) {}
  }

  return {
    name: 'database-server-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/inspections')) {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

          if (req.method === 'OPTIONS') {
            res.statusCode = 204
            return res.end()
          }

          if (req.method === 'GET') {
            const db = getDb()
            res.statusCode = 200
            return res.end(JSON.stringify(db || null))
          }

          if (req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                const newInspections = JSON.parse(body)
                saveDb(newInspections)
                res.statusCode = 200
                return res.end(JSON.stringify({ success: true, count: newInspections.length }))
              } catch (err) {
                res.statusCode = 400
                return res.end(JSON.stringify({ error: 'Invalid JSON' }))
              }
            })
            return
          }
        }
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    databasePlugin()
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      ignored: ['**/server_db.json', '**/*.json']
    }
  }
})
