import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import backgroundImage from '../background_coacher_landing.png'

type PhoneTab = 'plan' | 'coach' | 'stats'
type ScrollDirection = 'down' | 'up'

function useReveal<T extends HTMLElement>(threshold = 0.24) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [skipInitialAnimation, setSkipInitialAnimation] = useState(false)
  const [direction, setDirection] = useState<ScrollDirection>('down')
  const hasMeasuredInitialState = useRef(false)
  const scrollDirection = useRef<ScrollDirection>('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - lastScrollY.current) < 2) {
        return
      }

      const nextDirection = currentScrollY > lastScrollY.current ? 'down' : 'up'
      scrollDirection.current = nextDirection
      setDirection(nextDirection)
      lastScrollY.current = currentScrollY
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!hasMeasuredInitialState.current) {
          hasMeasuredInitialState.current = true

          if (entry.isIntersecting) {
            setSkipInitialAnimation(true)
          }
        }

        setDirection(scrollDirection.current)
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin: '-8% 0px -8% 0px',
        threshold,
      },
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    observer.observe(node)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible, skipInitialAnimation, direction }
}

const focusAreas = [
  {
    title: 'REACTION CONTROL',
    label: 'Реакция',
    progress: 78,
    workload: '32 min',
    code: 'DRL-014',
    detail: '6 коротких серий на шайбу, отскок и перенос веса.',
  },
  {
    title: 'BUTTERFLY BASE',
    label: 'Бабочка',
    progress: 64,
    workload: '28 min',
    code: 'DRL-021',
    detail: 'Техника посадки, контроль пятаков и возврат в стойку.',
  },
  {
    title: 'GLOVE ANGLE',
    label: 'Ловушка',
    progress: 86,
    workload: '18 min',
    code: 'DRL-008',
    detail: 'Угол, кисть и фиксация шайбы после броска.',
  },
]

const features = [
  {
    index: '01',
    title: 'TRAINING DATABASE',
    metric: '24/7',
    text: 'Тренировки, упражнения и фишки для развития вратарских навыков собраны в одном месте.',
  },
  {
    index: '02',
    title: 'PRO METHODS',
    metric: 'NHL / KHL / MHL',
    text: 'Программы основаны на опыте работы со специалистами уровня НХЛ, КХЛ и МХЛ.',
  },
  {
    index: '03',
    title: 'ONE SESSION PRICE',
    metric: '1X',
    text: 'За цену одной тренировки ты получаешь объемную базу знаний и практики.',
  },
  {
    index: '04',
    title: 'ANY SURFACE',
    metric: 'ICE / GYM / HOME',
    text: 'Занимайся где угодно: зал, улица, дом или лед. Ограничение только в твоем желании.',
  },
  {
    index: '05',
    title: 'ADAPTIVE AI',
    metric: 'LIVE FOCUS',
    text: 'AI-сопровождение подстраивается под твои интересы, задачи и текущий уровень.',
  },
  {
    index: '06',
    title: 'FEEDBACK LOOP',
    metric: 'UPDATE',
    text: 'Команда анализирует обратную связь и улучшает приложение под реальный хоккей.',
  },
]

const audiences = [
  ['Дети', 'Интуитивный интерфейс и понятные шаги для разных возрастов.'],
  ['Любители', 'Системное развитие навыков без хаоса и случайных тренировок.'],
  ['Начинающие тренеры', 'Платформа для идей, структуры занятий и собственного роста.'],
  ['Профи', 'Новые детали, обмен опытом и персональные карточки с советами игроков.'],
]

const plans = [
  {
    name: 'Base',
    price: 'Старт',
    description: 'Базовый комплекс тренировок и понятная структура для начинающих.',
    perks: ['База упражнений', 'Готовые блоки', 'Прогресс по навыкам'],
  },
  {
    name: 'Pro',
    price: 'AI',
    description: 'Все из Base плюс ассистент, адаптация плана и подбор экипировки.',
    perks: ['AI-коуч', 'Персональные цели', 'Рекомендации по экипу'],
  },
  {
    name: 'Pro+',
    price: 'Full',
    description: 'Максимум для мотивированных: полная база, удаленное ведение и связь с командой.',
    perks: ['Полная база', 'Удаленное сопровождение', 'Связь с разработчиком'],
  },
]

function App() {
  const featuresReveal = useReveal<HTMLElement>(0.18)
  const audienceReveal = useReveal<HTMLElement>(0.24)
  const pricingReveal = useReveal<HTMLElement>(0.22)
  const featuresAreReversed = featuresReveal.direction === 'up'
  const audienceIsReversed = audienceReveal.direction === 'up'
  const pricingIsReversed = pricingReveal.direction === 'up'

  return (
    <main className="landing">
      <Hero />
      <DemoSection />
      <section
        className={`section section-intro reveal-features ${featuresReveal.isVisible ? 'is-visible' : ''} ${
          featuresReveal.skipInitialAnimation ? 'reveal-static' : ''
        } ${featuresAreReversed ? 'reveal-reverse' : ''}`}
        id="about"
        ref={featuresReveal.ref}
      >
        <div className="section-kicker">FIRST GOALIE AI ASSISTANT</div>
        <div className="section-heading">
          <h2>Первый в мире вратарский ассистент</h2>
          <p>
            COACHER помогает тренироваться осознанно: выбирает фокус, объясняет детали,
            собирает прогресс и держит тебя в режиме развития весь сезон.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <article
              className="feature-card"
              key={feature.index}
              style={
                {
                  '--delay': `${(featuresAreReversed ? features.length - 1 - index : index) * 140}ms`,
                } as CSSProperties
              }
            >
              <div className="card-topline">
                <span>{feature.index}</span>
                <i>{feature.metric}</i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`section split-section reveal-audience ${audienceReveal.isVisible ? 'is-visible' : ''} ${
          audienceReveal.skipInitialAnimation ? 'reveal-static' : ''
        } ${audienceIsReversed ? 'reveal-reverse' : ''}`}
        ref={audienceReveal.ref}
      >
        <div className="audience-copy">
          <div className="section-kicker">FOR EVERY LEVEL</div>
          <h2>Для кого подойдет</h2>
          <p className="section-copy">
            Хоккей не стоит на месте. База постоянно обновляется и подстраивается под
            современный стиль игры, а календарь помогает подобрать нагрузку, когда
            сложно собрать план самому.
          </p>
        </div>
        <div className="audience-list">
          {audiences.map(([title, text], index) => (
            <article
              className="audience-card"
              key={title}
              style={
                {
                  '--delay': `${(audienceIsReversed ? audiences.length - 1 - index : index) * 150}ms`,
                } as CSSProperties
              }
            >
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`section pricing-section reveal-blur ${pricingReveal.isVisible ? 'is-visible' : ''} ${
          pricingReveal.skipInitialAnimation ? 'reveal-static' : ''
        } ${pricingIsReversed ? 'reveal-reverse' : ''}`}
        id="plans"
        ref={pricingReveal.ref}
      >
        <div className="section-kicker">SUBSCRIPTION LEVELS</div>
        <div className="section-heading">
          <h2>Выбери свой уровень</h2>
          <p>От первого комплекса до полного удаленного сопровождения и AI-плана.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <article
              className={index === 1 ? 'plan-card plan-card-active' : 'plan-card'}
              key={plan.name}
              style={
                {
                  '--delay': `${(pricingIsReversed ? plans.length - 1 - index : index) * 90 + 150}ms`,
                  '--mobile-delay': `${(pricingIsReversed ? plans.length - 1 - index : index) * 90 + 130}ms`,
                } as CSSProperties
              }
            >
              <div className="plan-topline">
                <h3>{plan.name}</h3>
                <span>{plan.price}</span>
              </div>
              <p>{plan.description}</p>
              <ul>
                {plan.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p>LEAD. DEVELOP. WIN.</p>
        <h2>Твой вратарский штаб теперь в телефоне.</h2>
        <a href="#about">Посмотреть возможности</a>
      </section>
    </main>
  )
}

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav className="topbar" aria-label="Главная навигация">
        <a className="brand" href="#">
          <span className="brand-mark">C</span>
          COACHER
        </a>
        <div className="nav-links">
          <a href="#about">Платформа</a>
          <a href="#phone-demo">Демо</a>
          <a href="#plans">Подписки</a>
        </div>
      </nav>

      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">AI GOALIE COACH / PERFORMANCE SYSTEM</p>
          <h1>Вратарский штаб в твоем телефоне</h1>
          <div className="hero-actions">
            <a href="#plans">Выбрать план</a>
            <a className="ghost-link" href="#phone-demo">Открыть демо</a>
          </div>
        </div>
        <div className="hero-dashboard" aria-label="Ключевые модули COACHER">
          <p className="hero-lead">
            COACHER собирает тренировочную базу, календарь, аналитику и AI-подсказки
            в один жесткий рабочий инструмент для голкипера.
          </p>
          <div className="hero-stats" aria-label="Преимущества платформы">
            <div>
              <strong>24/7</strong>
              <span>доступ к базе</span>
            </div>
            <div>
              <strong>AI</strong>
              <span>адаптация целей</span>
            </div>
            <div>
              <strong>NHL</strong>
              <span>уровень методик</span>
            </div>
          </div>
          <article>
            <span>NEXT BLOCK</span>
            <strong>Reaction + Rebound</strong>
            <p>32 MIN / GYM / HIGH INTENSITY</p>
          </article>
          <article>
            <span>AI STATUS</span>
            <strong>82%</strong>
            <p>READY LOAD SCORE</p>
          </article>
          <article>
            <span>PRACTICE PLAN</span>
            <strong>5 DRILLS</strong>
            <p>FOCUS / PREPARE / ELEVATE</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  const demoReveal = useReveal<HTMLElement>(0.24)

  return (
    <section
      className={`section demo-section reveal-demo ${demoReveal.isVisible ? 'is-visible' : ''} ${
        demoReveal.skipInitialAnimation ? 'reveal-static' : ''
      }`}
      id="phone-demo"
      ref={demoReveal.ref}
    >
      <AppInterface />
      <div className="demo-copy">
        <div className="section-kicker">INTERACTIVE APP CONCEPT</div>
        <h2>Демо интерфейса внутри iPhone 17</h2>
        <p className="section-copy">
          Макет телефона вынесен отдельно, чтобы интерфейс приложения воспринимался как
          продуктовая демонстрация: кликай по вкладкам, меняй фокус и смотри, как AI
          перестраивает подсказку.
        </p>
        <div className="demo-specs">
          <article>
            <span>01</span>
            <strong>План тренировки</strong>
            <p>Детальные drill-карты с кодом, нагрузкой и прогрессом.</p>
          </article>
          <article>
            <span>02</span>
            <strong>AI ассистент</strong>
            <p>Тактическая подсказка меняется по выбранному навыку.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Статистика</strong>
            <p>Показатели готовности и недельной нагрузки в одном экране.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-stage">
      <div className="phone-glow" />
      <div className="phone-frame" aria-label="Интерактивный макет интерфейса приложения">
        <div className="phone-side-button phone-side-button-left" />
        <div className="phone-side-button phone-side-button-right" />
        <div className="phone-screen">
          <div className="dynamic-island" />
          {children}
        </div>
      </div>
    </div>
  )
}

function AppInterface() {
  const [activeTab, setActiveTab] = useState<PhoneTab>('plan')
  const [selectedFocus, setSelectedFocus] = useState(0)
  const activeFocus = focusAreas[selectedFocus]

  const coachMessage = useMemo(() => {
    if (activeFocus.progress > 80) {
      return 'Зона стабильна. Добавь второй бросок после отскока и фиксируй позицию корпуса.'
    }

    if (activeFocus.progress > 70) {
      return 'Фокус недели найден. Работай короткими сериями: качество выше объема.'
    }

    return 'Вернись к базе: медленный темп, чистая посадка, затем повышение скорости.'
  }, [activeFocus])

  return (
    <div className="app-ui">
      <PhoneFrame>
        <div className="app-ui-content">
          <header className="app-header">
            <div>
              <span>COACHER OS</span>
              <strong>GAME READY PROTOCOL</strong>
            </div>
            <button className="profile-chip" type="button" aria-label="Профиль">
              82
            </button>
          </header>

          <section className="next-session">
            <div>
              <span>TODAY / 19:30</span>
              <strong>EXPLOSIVE SAVE</strong>
              <p>32 мин / зал / реакция / высокий темп</p>
            </div>
            <button type="button" onClick={() => setActiveTab('coach')}>
              START
            </button>
          </section>

          <div className="phone-tabs" role="tablist" aria-label="Разделы демо приложения">
            {(['plan', 'coach', 'stats'] as PhoneTab[]).map((tab) => (
              <button
                aria-selected={activeTab === tab}
                className={activeTab === tab ? 'active' : ''}
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                type="button"
              >
                {tab === 'plan' ? 'PLAN' : tab === 'coach' ? 'AI' : 'STATS'}
              </button>
            ))}
          </div>

          <div className="app-content">
            {activeTab === 'plan' && (
              <section className="focus-list" aria-label="Фокус тренировки">
                {focusAreas.map((item, index) => (
                  <button
                    className={selectedFocus === index ? 'focus-card selected' : 'focus-card'}
                    key={item.title}
                    onClick={() => setSelectedFocus(index)}
                    type="button"
                  >
                    <div className="focus-card-head">
                      <span>{item.code}</span>
                      <em>{item.workload}</em>
                    </div>
                    <strong>{item.title}</strong>
                    <small>{item.label}</small>
                    <b>{item.progress}%</b>
                    <i style={{ width: `${item.progress}%` }} />
                  </button>
                ))}
              </section>
            )}

            {activeTab === 'coach' && (
              <section className="coach-panel">
                <span>AI TACTICAL NOTE</span>
                <p>{coachMessage}</p>
                <button
                  type="button"
                  onClick={() => setSelectedFocus((selectedFocus + 1) % focusAreas.length)}
                >
                  NEXT FOCUS
                </button>
              </section>
            )}

            {activeTab === 'stats' && (
              <section className="stats-panel">
                <div className="score-ring">
                  <span>{activeFocus.progress}</span>
                </div>
                <div>
                  <strong>{activeFocus.title}</strong>
                  <p>{activeFocus.detail}</p>
                  <dl>
                    <div>
                      <dt>LOAD</dt>
                      <dd>{activeFocus.workload}</dd>
                    </div>
                    <div>
                      <dt>CODE</dt>
                      <dd>{activeFocus.code}</dd>
                    </div>
                  </dl>
                </div>
              </section>
            )}
          </div>

          <footer className="app-footer">
            <span>WEEKLY LOAD</span>
            <strong>4 / 5 SESSIONS</strong>
          </footer>
        </div>
      </PhoneFrame>
    </div>
  )
}

export default App
