import { Router } from 'express'
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import User from '../models/User'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'devSecret'

// ➤ הרשמה
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // בדיקה אם המשתמש כבר קיים
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already in use' })

    // הצפנת סיסמה
    const hash = await bcrypt.hash(password, 10)

    const newUser = await User.create({ name, email, password: hash })
    res.status(201).json({ id: newUser._id, email: newUser.email })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

// ➤ התחברות
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid password' })

    const token = jwt.sign(
      { sub: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.json({ token, name: user.name, role: user.role })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

export default router
