import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()

// ✅ מתיר בקשות מהפרונט (5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// ✅ מאפשר קבלת JSON בבקשות POST
app.use(express.json())

// ✅ חיבור למסד נתונים
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Mongo Error:', err))

// ✅ ראוטים
app.use('/api/auth', authRoutes)

// ראוט בדיקה
app.get('/', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'GoalHub API' })
})

// הפעלת השרת
const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`🚀 API running on http://localhost:${PORT}`)
)
