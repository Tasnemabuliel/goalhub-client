import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import styles from './Players.module.css'

type Player = {
  _id: string
  name: string
  position: string
  age: number
}

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([])
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [age, setAge] = useState<number | ''>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const data = await api.get<unknown>('/players')
      const list = Array.isArray(data) ? (data as Player[]) : []
      setPlayers(list)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  async function addPlayer(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await api.post<Player>('/players', { name, position, age: Number(age) })
      setName('')
      setPosition('')
      setAge('')
      await load()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>שחקנים</h2>
      </div>

      <div className={styles.list}>
        <div className={`${styles.row} ${styles.rowHead}`}>
          <div>שם</div>
          <div>עמדה</div>
          <div>גיל</div>
        </div>
        {players.map(p => (
          <div key={p._id} className={styles.row}>
            <div>{p.name}</div>
            <div>{p.position}</div>
            <div>{p.age}</div>
          </div>
        ))}
      </div>

      <form className={styles.form} onSubmit={addPlayer}>
        <input className={styles.input} placeholder="שם" value={name} onChange={e => setName(e.target.value)} required />
        <input className={styles.input} placeholder="עמדה" value={position} onChange={e => setPosition(e.target.value)} required />
        <input className={styles.input} placeholder="גיל" type="number" value={age} onChange={e => setAge(e.target.value ? Number(e.target.value) : '')} required />
        <button className={styles.btn} type="submit">הוסף</button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

