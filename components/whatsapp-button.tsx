import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/site-config'

export function WhatsappButton() {
  const url = whatsappUrl()
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white font-bold shadow-lg hover:bg-[#1ebe5a] transition-colors"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline text-sm uppercase tracking-wide">Escribinos</span>
    </a>
  )
}
