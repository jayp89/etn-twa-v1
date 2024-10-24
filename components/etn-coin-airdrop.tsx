'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, User, Users, Trophy, Play, Send, Twitter, DollarSign } from 'lucide-react'

interface Task {
  id: string;
  title: string;
  reward: string;
  icon: React.ReactNode;
  action: 'Start' | 'Claim';
}

export function EtnCoinAirdrop() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [score, setScore] = useState(0)
  const [initialBonus, setInitialBonus] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    calculateInitialBonus()
    loadTasks()
  }, [])

  const calculateInitialBonus = async () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user
    if (user) {
      const joinDate = await simulateGetUserJoinDate(user.id)
      const accountAgeYears = (new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
      let bonus = Math.floor(accountAgeYears) * 900

      if (user.is_premium) {
        bonus += 3000
      }

      setInitialBonus(bonus)
      setScore(bonus)
    }
  }

  const simulateGetUserJoinDate = async (userId: number): Promise<Date> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const randomYearsAgo = Math.floor(Math.random() * 5) + 1
        const joinDate = new Date()
        joinDate.setFullYear(joinDate.getFullYear() - randomYearsAgo)
        resolve(joinDate)
      }, 1000)
    })
  }

  const loadTasks = () => {
    const loadedTasks: Task[] = [
      { id: '1', title: 'Join ETN Channel', reward: '+5,000 ETN', icon: <Send size={20} />, action: 'Start' },
      { id: '2', title: 'Follow our Twitter(X)', reward: '+5,000 ETN', icon: <Twitter size={20} />, action: 'Start' },
      { id: '3', title: 'Make a TON Transaction', reward: '+10,000 ETN', icon: <DollarSign size={20} />, action: 'Start' },
      { id: '4', title: 'Invite 10 friends', reward: '+20,000 ETN', icon: <Users size={20} />, action: 'Claim' },
      { id: '5', title: 'Invite 25 friends', reward: '+50,000 ETN', icon: <Users size={20} />, action: 'Claim' },
      { id: '6', title: 'Invite 50 friends', reward: '+100,000 ETN', icon: <Users size={20} />, action: 'Claim' },
    ]
    setTasks(loadedTasks)
  }

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0A2F1E] to-[#133A2A] text-[#F2C94C] p-4">
      <img src="https://etn.ethio-tech.com/brand-assets/logos/coin_full.png" alt="ETN Duck" className="mb-6 w-48 h-48" />
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to ETN Coin Airdrop!</h1>
      <Button onClick={() => setCurrentScreen('info')} className="bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#133A2A] hover:from-[#D4AF37] hover:to-[#F2C94C] w-full max-w-xs">
        Continue
      </Button>
    </div>
  )

  const InfoScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0A2F1E] to-[#133A2A] text-[#F2C94C] p-4">
      <img src="/placeholder.svg?height=200&width=200" alt="ETN Coin" className="mb-6 w-48 h-48" />
      <h2 className="text-2xl font-bold mb-4">What is ETN?</h2>
      <p className="text-center mb-6">$ETN - ET NETSA COIN is the lifeblood of the ETN Ecosystem</p>
      <Button onClick={() => setCurrentScreen('main')} className="bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#133A2A] hover:from-[#D4AF37] hover:to-[#F2C94C] w-full max-w-xs">
        Continue
      </Button>
    </div>
  )

  const MainScreen = () => (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0A2F1E] to-[#133A2A] text-[#F2C94C]">
      <div className="flex-1 p-4 overflow-y-auto">
        <Card className="bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#133A2A] mb-6">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold mb-2">{score}</h2>
            <p className="text-xl">ETN COINS</p>
            <Button className="mt-4 bg-[#133A2A] text-[#F2C94C] hover:bg-[#0A1F18] w-full">
              Withdraw to wallet
            </Button>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-[#1F5741] to-[#133A2A]">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">DAILY CHECKIN</h3>
              <p className="text-sm mb-2">Claim daily checkin rewards</p>
              <Button size="sm" variant="outline" className="w-full">
                Claim
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1F5741] to-[#133A2A]">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">ALPHA ETN</h3>
              <p className="text-sm mb-2">Join Alpha ETN group</p>
              <Button size="sm" variant="outline" className="w-full">
                Join
              </Button>
            </CardContent>
          </Card>
        </div>
        <h3 className="text-xl font-bold mb-4">Complete Tasks & Earn</h3>
        <div className="space-y-4 mb-6">
          {tasks.map(task => (
            <Card key={task.id} className="bg-gradient-to-r from-[#1F5741] to-[#133A2A]">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 bg-[#0A1F18] p-2 rounded-full">{task.icon}</div>
                  <div>
                    <h4 className="font-bold">{task.title}</h4>
                    <p className="text-sm">{task.reward}</p>
                  </div>
                </div>
                <Button size="sm">{task.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="bg-gradient-to-r from-[#1F5741] to-[#133A2A] mb-6">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold">Play ETN Game</h4>
              <p className="text-sm">Earn ETN</p>
            </div>
            <Button size="sm" onClick={() => setCurrentScreen('game')}>Start</Button>
          </CardContent>
        </Card>
        <h3 className="text-xl font-bold mb-4">Our Partners</h3>
        {/* Add partner content here */}
      </div>
      <div className="bg-[#0A1F18] p-4 flex justify-around">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('main')}>
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => alert('Mine functionality not implemented')}>
          <User className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => alert('Friends functionality not implemented')}>
          <Users className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => alert('Leaderboard functionality not implemented')}>
          <Trophy className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )

  const GameScreen = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [gameScore, setGameScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [gameOver, setGameOver] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
      if (!gameStarted) return

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const coins: Coin[] = []
      const bombs: Bomb[] = []
      const particles: Particle[] = []
      const gravity = 6

      const coinImage = new Image()
      coinImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/coin_full.png'

      const bombImage = new Image()
      bombImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/jebena1.png'

      interface Coin {
        x: number;
        y: number;
        size: number;
        tapped: boolean;
        collectAnimation: number;
      }

      interface Bomb {
        x: number;
        y: number;
        size: number;
        explode: boolean;
        explosionRadius: number;
      }

      interface Particle {
        x: number;
        y: number;
        radius: number;
        color: string;
        velocity: { x: number; y: number };
        alpha: number;
      }

      function createCoin() {
        const size = Math.random() * 40 + 10
        const x = Math.random() * (canvas.width - size)
        coins.push({ x, y: -size, size, tapped: false, collectAnimation: 0 })
      }

      function createBomb() {
        const size = 50
        const x = Math.random() * (canvas.width - size)
        bombs.push({ x, y: -size, size, explode: false, explosionRadius: 0 })
      }

      function createParticles(x: number, y: number, color: string, count: number) {
        for (let i = 0; i < count; i++) {
          particles.push({
            x,
            y,
            radius: Math.random() * 3,
            color,
            velocity: {
              x: (Math.random() - 0.5) * 5,
              y: (Math.random() - 0.5) * 5
            },
            alpha: 1
          })
        }
      }

      function drawGrid() {
        if (!ctx) return
        ctx.strokeStyle = '#F2C94C'
        ctx.lineWidth = 0.5
        const gridSize = 50

        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }
      }

      function drawCoins() {
        if (!ctx) return
        coins.forEach((coin, index) => {
          if (!coin.tapped) {
            ctx.drawImage(coinImage, coin.x, coin.y, coin.size, coin.size)
          } else {
            ctx.save()
            ctx.globalAlpha = 1 - coin.collectAnimation
            ctx.translate(coin.x + coin.size / 2, coin.y + coin.size / 2)
            ctx.scale(1 + coin.collectAnimation, 1 + coin.collectAnimation)
            ctx.drawImage(coinImage, -coin.size / 2, -coin.size / 2, coin.size, coin.size)
            ctx.restore()

            coin.collectAnimation += 0.1
            if (coin.collectAnimation >= 1) {
              coins.splice(index, 1)
            }
          }
          coin.y += gravity
          if (coin.y > canvas.height) coins.splice(index, 1)
        })
      }

      function drawBombs() {
        if (!ctx) return
        bombs.forEach((bomb, index) => {
          if (!bomb.explode) {
            ctx.drawImage(bombImage, bomb.x, bomb.y, bomb.size, bomb.size)
          } else {
            ctx.beginPath()
            ctx.arc(bomb.x + bomb.size / 2, bomb.y + bomb.size / 2, bomb.explosionRadius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 0, 0, ${1 - bomb.explosionRadius / 100})`
            ctx.fill()

            bomb.explosionRadius += 5
            if (bomb.explosionRadius >= 100) {
              bombs.splice(index, 1)
            }
          }
          bomb.y += gravity
          if (bomb.y > canvas.height) bombs.splice(index, 1)
        })
      }

      function drawParticles() {
        if (!ctx) return
        particles.forEach((particle, index) => {
          particle.alpha -= 0.01
          if (particle.alpha <= 0) {
            
            particles.splice(index, 1)
            return
          }

          ctx.save()
          ctx.globalAlpha = particle.alpha
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
          ctx.restore()

          particle.x += particle.velocity.x
          particle.y += particle.velocity.y
        })
      }

      function handleTap(e: MouseEvent | TouchEvent) {
        const x = 'clientX' in e ? e.clientX : e.touches[0].clientX
        const y = 'clientY' in e ? e.clientY : e.touches[0].clientY

        coins.forEach((coin, index) => {
          if (x >= coin.x && x <= coin.x + coin.size && y >= coin.y && y <= coin.y + coin.size) {
            setGameScore(prevScore => prevScore + 0.5)
            coin.tapped = true
            createParticles(coin.x + coin.size / 2, coin.y + coin.size / 2, '#FFD700', 20)
          }
        })

        bombs.forEach((bomb, index) => {
          if (x >= bomb.x && x <= bomb.x + bomb.size && y >= bomb.y && y <= bomb.y + bomb.size) {
            setGameScore(prevScore => prevScore - 1)
            bomb.explode = true
            createParticles(bomb.x + bomb.size / 2, bomb.y + bomb.size / 2, '#FF0000', 40)
          }
        })
      }

      function gameLoop() {
        if (gameOver) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid()
        drawCoins()
        drawBombs()
        drawParticles()
      }

      const coinInterval = setInterval(createCoin, 500)
      const bombInterval = setInterval(createBomb, 1000)
      const gameLoopInterval = setInterval(gameLoop, 30)

      canvas.addEventListener('click', handleTap)
      canvas.addEventListener('touchstart', handleTap)

      const timerInterval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setGameOver(true)
            clearInterval(coinInterval)
            clearInterval(bombInterval)
            clearInterval(gameLoopInterval)
            clearInterval(timerInterval)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => {
        clearInterval(coinInterval)
        clearInterval(bombInterval)
        clearInterval(gameLoopInterval)
        clearInterval(timerInterval)
        canvas.removeEventListener('click', handleTap)
        canvas.removeEventListener('touchstart', handleTap)
      }
    }, [gameStarted, gameOver])

    const startGame = () => {
      setGameStarted(true)
      setGameScore(0)
      setTimeLeft(60)
      setGameOver(false)
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0A2F1E] to-[#133A2A] text-[#F2C94C]">
        {!gameStarted || gameOver ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">ETN Coin Game</h1>
            <p className="mb-4">Catch coins, avoid bombs!</p>
            {gameOver && <p className="text-2xl mb-4">Final Score: {gameScore}</p>}
            <Button onClick={startGame} className="bg-gradient-to-r from-[#F2C94C] to-[#D4AF37] text-[#133A2A] hover:from-[#D4AF37] hover:to-[#F2C94C]">
              {gameOver ? 'Play Again' : 'Start Game'}
            </Button>
            <Button onClick={() => setCurrentScreen('main')} className="mt-4 bg-[#133A2A] text-[#F2C94C] hover:bg-[#0A1F18]">
              Back to Main
            </Button>
          </div>
        ) : (
          <>
            <div className="absolute top-4 left-4 text-xl">Score: {gameScore}</div>
            <div className="absolute top-4 right-4 text-xl">Time: {timeLeft}</div>
            <canvas ref={canvasRef} className="w-full h-full" />
          </>
        )}
      </div>
    )
  }

  return (
    <div className="h-screen">
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'info' && <InfoScreen />}
      {currentScreen === 'main' && <MainScreen />}
      {currentScreen === 'game' && <GameScreen />}
    </div>
  )
}
