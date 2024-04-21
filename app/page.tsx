import Chat from '@/components/chat'
import Footer from '@/components/footer'

export const runtime = 'edge'

export default function Home() {
  return (
    <div>
      <Chat />
      <Footer />
    </div>
  )
}