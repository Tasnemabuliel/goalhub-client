import styles from './Positions.module.css'

type PositionCard = {
  key: string
  title: string
  description: string
  image: string
}

const POSITIONS: PositionCard[] = [
  { key: 'gk', title: 'שוער', description: 'עמדת ההגנה האחרונה של הקבוצה.', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200&auto=format&fit=crop' },
  { key: 'df', title: 'בלם/מגן', description: 'אחראי על מניעת התקפות היריב.', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop' },
  { key: 'mf', title: 'קשר', description: 'מחבר בין הגנה להתקפה ומנהל את הקצב.', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop' },
  { key: 'fw', title: 'חלוץ', description: 'מוביל התקפה וכיבוש שערים.', image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200&auto=format&fit=crop' }
]

export default function Positions() {
  return (
    <div className={styles.wrap}>
      <h2 style={{margin: '8px 0 16px'}}>עמדות משחק</h2>
      <div className={styles.grid}>
        {POSITIONS.map(pos => (
          <div key={pos.key} className={styles.card}>
            <img className={styles.img} src={pos.image} alt={pos.title} loading="lazy" />
            <div className={styles.body}>
              <h3 className={styles.title}>{pos.title}</h3>
              <p className={styles.desc}>{pos.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

