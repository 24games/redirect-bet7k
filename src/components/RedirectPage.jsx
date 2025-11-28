import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield } from 'lucide-react'

const DESTINATION_URL = "https://24games.cl/register?token=seioeqvovmirpgcrktkbmpkkli&affiliateId=503785&"

const RedirectPage = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animação da barra de progresso (4 segundos)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1.25 // ~100% em 4 segundos (80 frames)
      })
    }, 50)

    // Redirecionamento após 4 segundos
    const redirectTimer = setTimeout(() => {
      window.location.href = DESTINATION_URL
    }, 4000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradient Radial */}
      <div className="absolute inset-0 bg-gradient-radial from-green-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      {/* Logo com Glow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8 md:mb-12 z-10"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl bg-neon-green/30 rounded-full scale-150" />
          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="24Games Logo"
            className="relative w-20 h-20 md:w-28 md:h-28 object-contain"
            onError={(e) => {
              // Fallback caso a imagem não seja encontrada
              e.target.src = "https://via.placeholder.com/120x120/00FF88/0a0a0a?text=24G"
            }}
          />
        </div>
      </motion.div>

      {/* Roleta Supercharged com Sparks */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 md:mb-12 z-10 relative"
      >
        <CasinoWheel />
        <Sparks />
      </motion.div>

      {/* Card Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-md mx-4 z-10"
      >
        <div className="bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Brilho sutil no card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />
          
          <div className="space-y-4">
            {/* Título */}
            <h1 className="text-white text-xl md:text-2xl font-semibold text-center">
              Conectando al servidor...
            </h1>
            
            {/* Subtítulo */}
            <p className="text-gray-400 text-sm md:text-base text-center">
              Estás siendo redirigido al entorno seguro.
            </p>
            
            {/* Barra de Progresso */}
            <div className="pt-4">
              <div className="w-full h-1 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-green to-green-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 md:mt-12 z-10"
      >
        <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
          <Shield className="w-4 h-4" />
          <span>Conexión Segura 24Games</span>
        </div>
      </motion.div>
    </div>
  )
}

// Componente Roleta de Cassino
const CasinoWheel = () => {
  const segments = 16 // Número de segmentos na roleta
  const radius = 50
  const centerX = 50
  const centerY = 50

  // Criar segmentos alternados (verde e preto)
  const createSegments = () => {
    const angleStep = 360 / segments
    const segmentsArray = []

    for (let i = 0; i < segments; i++) {
      const startAngle = (i * angleStep - 90) * (Math.PI / 180)
      const endAngle = ((i + 1) * angleStep - 90) * (Math.PI / 180)
      
      const x1 = centerX + radius * Math.cos(startAngle)
      const y1 = centerY + radius * Math.sin(startAngle)
      const x2 = centerX + radius * Math.cos(endAngle)
      const y2 = centerY + radius * Math.sin(endAngle)

      const isGreen = i % 2 === 0
      
      segmentsArray.push(
        <path
          key={i}
          d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
          fill={isGreen ? '#00FF88' : '#0a0a0a'}
          stroke={isGreen ? '#00FF88' : '#1a1a1a'}
          strokeWidth="0.5"
        />
      )
    }
    return segmentsArray
  }

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      {/* Roleta com Motion Blur (atrás) - Camada 1 */}
      <motion.svg
        className="absolute inset-0 blur-md opacity-40"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {createSegments()}
        <circle cx={centerX} cy={centerY} r="8" fill="#0a0a0a" stroke="#00FF88" strokeWidth="1" />
      </motion.svg>

      {/* Roleta com Motion Blur (atrás) - Camada 2 */}
      <motion.svg
        className="absolute inset-0 blur-sm opacity-60"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 0.28,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {createSegments()}
        <circle cx={centerX} cy={centerY} r="8" fill="#0a0a0a" stroke="#00FF88" strokeWidth="1" />
      </motion.svg>

      {/* Roleta Principal */}
      <motion.svg
        className="absolute inset-0 relative z-10"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {createSegments()}
        {/* Círculo central com brilho */}
        <circle cx={centerX} cy={centerY} r="8" fill="#0a0a0a" stroke="#00FF88" strokeWidth="1.5" />
        <circle cx={centerX} cy={centerY} r="3" fill="#00FF88" opacity="0.9" />
        {/* Glow no centro */}
        <circle cx={centerX} cy={centerY} r="5" fill="#00FF88" opacity="0.3" />
      </motion.svg>
    </div>
  )
}

// Componente de Partículas (Sparks)
const Sparks = () => {
  const [sparks, setSparks] = useState([])

  useEffect(() => {
    // Criar novas faíscas continuamente
    const createSpark = () => {
      const angle = Math.random() * Math.PI * 2
      const distance = 40 + Math.random() * 60 // Distância da borda da roleta
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      
      const randomX = (Math.random() - 0.5) * 200
      const randomY = (Math.random() - 0.5) * 200
      
      const id = Date.now() + Math.random()
      
      return {
        id,
        x,
        y,
        targetX: randomX,
        targetY: randomY,
        delay: Math.random() * 0.3,
      }
    }

    // Gerar faíscas periodicamente
    const interval = setInterval(() => {
      const newSparks = Array.from({ length: 3 }, () => createSpark())
      setSparks((prev) => [...prev, ...newSparks].slice(-20)) // Manter máximo de 20
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-green rounded-full"
            style={{
              boxShadow: '0 0 6px #00FF88, 0 0 12px #00FF88',
            }}
            initial={{
              x: spark.x,
              y: spark.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: spark.targetX,
              y: spark.targetY,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.2,
              delay: spark.delay,
              ease: 'easeOut',
            }}
            onAnimationComplete={() => {
              setSparks((prev) => prev.filter((s) => s.id !== spark.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default RedirectPage

