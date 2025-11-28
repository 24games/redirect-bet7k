import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const DESTINATION_URL = "https://24games.cl/register?token=seioeqvovmirpgcrktkbmpkkli&affiliateId=503785&"

const RedirectPage = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animação da barra de progresso (3 segundos)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1.67 // ~100% em 3 segundos (60 frames)
      })
    }, 50)

    // Redirecionamento após 3 segundos
    const redirectTimer = setTimeout(() => {
      window.location.href = DESTINATION_URL
    }, 3000)

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
          {/* Logo placeholder */}
          <img
            src="https://via.placeholder.com/120x120/00FF88/0a0a0a?text=24G"
            alt="24Games Logo"
            className="relative w-20 h-20 md:w-28 md:h-28 rounded-lg object-contain"
          />
        </div>
      </motion.div>

      {/* Loader Customizado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 md:mb-12 z-10"
      >
        <LoaderAnimation />
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
              Conectando ao servidor...
            </h1>
            
            {/* Subtítulo */}
            <p className="text-gray-400 text-sm md:text-base text-center">
              Você está sendo redirecionado para o ambiente seguro.
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
          <span>Conexão Segura 24Games</span>
        </div>
      </motion.div>
    </div>
  )
}

// Componente Loader Customizado
const LoaderAnimation = () => {
  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      {/* Anel externo */}
      <motion.svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#00FF88"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset="70"
          opacity="0.6"
        />
      </motion.svg>
      
      {/* Anel interno (gira no sentido contrário) */}
      <motion.svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        initial={{ rotate: 360 }}
        animate={{ rotate: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#00FF88"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="220"
          strokeDashoffset="55"
          opacity="0.8"
        />
      </motion.svg>
      
      {/* Ponto central pulsante */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-neon-green rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default RedirectPage

