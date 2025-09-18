import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from './models/User'

dotenv.config()

async function run() {
  await mongoose.connect(process.env.MONGO_URI!)
  const hash = await bcrypt.hash('Tasnem123456789', 10)  // ← הסיסמה שבחרת
  const user = await User.create({
    name: 'Super Admin',
    email: 'abulieltasneem23@gmail.com',
    password: hash,
    role: 'superadmin'
  })
  console.log('✅ SuperAdmin created:', user.email)
  process.exit(0)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
