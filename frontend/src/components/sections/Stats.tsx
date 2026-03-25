import type { Stat } from '../../types'

const stats: Stat[] = [
  { value: '+500', label: 'Casos Resueltos' },
  { value: '+10', label: 'Años de Experiencia' },
  { value: '98%', label: 'Clientes Satisfechos' },
  { value: '24/7', label: 'Disponibilidad' },
]

function Stats(): JSX.Element {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
