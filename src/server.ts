import jwt from '@fastify/jwt'

import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/uploads'
import { memoriesRoutes } from './routes/memories'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)

app.register(fastifyStatic, {
  root: resolve(__dirname, '../', 'uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('Server running on port 3333'))
