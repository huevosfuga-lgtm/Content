import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WaitlistForm } from '@/components/waitlist-form'
import { FaqSection } from '@/components/faq-section'
import { WhatsappButton } from '@/components/whatsapp-button'
import { SITE, whatsappUrl } from '@/lib/site-config'
import { Sun, Leaf, Heart, Egg, MapPin, Instagram, Mail, MessageCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F3ECDA]">
      {/* Header */}
      <header className="sticky top-0 bg-[#F3ECDA]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F3ECDA]/80 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/fuga-logo.svg" 
              alt="Fuga Logo" 
              width={100} 
              height={50}
              className="object-contain h-[45px] w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#productos" className="text-sm font-medium text-[#1a1a1a] hover:text-[#4E5A2B] transition-colors uppercase tracking-wide">
              Productos
            </Link>
            <Link href="#nosotros" className="text-sm font-medium text-[#1a1a1a] hover:text-[#4E5A2B] transition-colors uppercase tracking-wide">
              Nosotros
            </Link>
            <Link href="#waitlist" className="text-sm font-medium text-[#1a1a1a] hover:text-[#4E5A2B] transition-colors uppercase tracking-wide">
              Comunidad
            </Link>
            <Link href="#preguntas" className="text-sm font-medium text-[#1a1a1a] hover:text-[#4E5A2B] transition-colors uppercase tracking-wide">
              Preguntas
            </Link>
          </nav>
          <Button asChild className="bg-[#4E5A2B] hover:bg-[#3d4722] text-white font-bold uppercase tracking-wide">
            <Link href="#waitlist">Unite</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-widest text-[#4E5A2B]">Huevos Pastoriles</p>
              <h1 className="text-[1.875rem] sm:text-4xl md:text-[2.125rem] lg:text-[2.875rem] xl:text-[3.5rem] font-black text-[#1a1a1a] leading-none uppercase">
                <span className="whitespace-nowrap">Importa un huevo</span><br />
                <span className="text-[#4E5A2B]">de dónde</span>{' '}
                <span className="text-[#FFC300]">viene.</span>
              </h1>
              <p className="text-lg text-[#4E5A2B] font-semibold uppercase tracking-wide">
                Gallinas libres de jaula.<br />
                Más sabor.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild className="bg-[#4E5A2B] hover:bg-[#3d4722] text-white font-bold uppercase tracking-wide h-12 px-8">
                  <Link href="#waitlist">Unite a la Comunidad</Link>
                </Button>
                <Button variant="outline" asChild className="border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white font-bold uppercase tracking-wide h-12 px-8">
                  <Link href="#productos">Ver Productos</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden">
              <video
                src="/images/hero-gallinas.mp4"
                poster="/images/hero-gallinas-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Gallinas Fuga caminando sobre pasto fresco dentro del gallinero móvil"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 rounded-full px-4 py-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] text-center">
                  Gallinas<br />Libres de Jaula<br />
                  <span className="text-[#4E5A2B]">Literal</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section id="zonas" className="scroll-mt-20 py-14 md:py-16 bg-[#4E5A2B]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="flex items-center justify-center gap-2 text-2xl md:text-4xl font-black text-white uppercase leading-tight mb-8 md:mb-10">
            <MapPin className="h-6 w-6 md:h-9 md:w-9 text-[#FFC300]" />
            Zonas de entrega
          </h2>
          <ul className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6 md:gap-0 md:divide-x-2 md:divide-white/20">
            {SITE.zonasEntrega.map(({ zona, detalle }) => (
              <li key={zona} className="md:px-12">
                <p className="text-3xl md:text-5xl font-black text-[#FFC300] uppercase leading-none">{zona}</p>
                {detalle && (
                  <p className="mt-2 text-sm md:text-base font-bold text-white/80 uppercase tracking-wide">{detalle}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#4E5A2B] p-8 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight mb-4">
                Agroecológicos.<br />
                <span className="text-[#FFC300]">Alto en nutrientes.</span>
              </h3>
              <Image 
                src="/images/fuga-logo.svg"
                alt="Fuga"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
            
            {/* Card 2 */}
            <div className="relative min-h-[260px] rounded-lg overflow-hidden border-2 border-[#1a1a1a]">
              <Image
                src="/images/fuga-movil.webp"
                alt="Fuga Móvil, el gallinero móvil de Fuga en el campo al atardecer"
                fill
                sizes="(min-width: 768px) 450px, 100vw"
                className="object-cover object-[center_62%]"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 rounded-full px-4 py-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">Fuga Móvil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-12 border-y-2 border-[#d4cfc0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Sun className="w-8 h-8 mx-auto mb-3 text-[#FFC300]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#1a1a1a]">Libres</p>
            </div>
            <div className="text-center">
              <Leaf className="w-8 h-8 mx-auto mb-3 text-[#4E5A2B]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#1a1a1a]">Alimentación<br />natural</p>
            </div>
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-3 text-[#4E5A2B]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#1a1a1a]">Acceso<br />a pasto</p>
            </div>
            <div className="text-center">
              <Egg className="w-8 h-8 mx-auto mb-3 text-[#1a1a1a]" />
              <p className="text-sm font-bold uppercase tracking-wide text-[#1a1a1a]">Más sabor.<br />Más color.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="scroll-mt-20 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase mb-4">Nuestros Productos</h2>
            <p className="text-[#4E5A2B] font-medium">
              Disponibles pronto en tu zona. Unite a la comunidad.
            </p>
            {SITE.zonas.length > 0 && (
              <p className="mt-4 inline-flex items-center gap-2 bg-white border-2 border-[#1a1a1a] rounded-full px-4 py-2 text-sm font-bold text-[#1a1a1a]">
                <MapPin className="h-4 w-4 text-[#4E5A2B]" />
                Llegamos a: {SITE.zonas.join(', ')}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Maple 30 */}
            <div className="bg-white rounded-lg overflow-hidden border-2 border-[#1a1a1a]">
              <div className="relative h-[280px] bg-white flex items-center justify-center">
                <Image 
                  src="/images/maple-30.webp"
                  alt="Maple de 30 huevos Fuga"
                  fill
                  className="object-contain px-4 pt-10 pb-2"
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-xl font-black text-[#1a1a1a] uppercase">Maple 30 Huevos</h3>
                  {SITE.precios.maple_30 && (
                    <div className="text-right whitespace-nowrap">
                      <p className="text-xl font-black text-[#1a1a1a] leading-none">{SITE.precios.maple_30}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#4E5A2B]">{SITE.precioNota}</p>
                    </div>
                  )}
                </div>
                <p className="text-[#4E5A2B] text-sm mb-4">
                  Perfecto para familias. 30 huevos frescos de gallinas que viven afuera, comen natural y ponen huevos con más sabor.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase bg-[#FFC300] text-[#1a1a1a] px-3 py-1 rounded-full">Pastoriles</span>
                  <span className="text-xs font-bold uppercase bg-[#4E5A2B] text-white px-3 py-1 rounded-full">Sin jaulas</span>
                </div>
              </div>
            </div>

            {/* Maple 6 */}
            <div className="bg-white rounded-lg overflow-hidden border-2 border-[#1a1a1a]">
              <div className="relative h-[280px] bg-white flex items-center justify-center">
                <Image 
                  src="/images/maple-30-real.png"
                  alt="Maple de 6 huevos Fuga"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-xl font-black text-[#1a1a1a] uppercase">Maple 6 Huevos</h3>
                  {SITE.precios.maple_6 && (
                    <div className="text-right whitespace-nowrap">
                      <p className="text-xl font-black text-[#1a1a1a] leading-none">{SITE.precios.maple_6}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#4E5A2B]">{SITE.precioNota}</p>
                    </div>
                  )}
                </div>
                <p className="text-[#4E5A2B] text-sm mb-4">
                  Ideal para probar la calidad Fuga. 6 huevos premium de gallinas libres.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase bg-[#FFC300] text-[#1a1a1a] px-3 py-1 rounded-full">Pastoriles</span>
                  <span className="text-xs font-bold uppercase bg-[#4E5A2B] text-white px-3 py-1 rounded-full">Sin jaulas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="scroll-mt-20 py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#4E5A2B] mb-2">Nuestra filosofía</p>
                  <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] uppercase leading-tight">
                    Transparente.<br />
                    Honesta.<br />
                    Responsable.<br />
                    Irónica.<br />
                    Eficiente.
                  </h2>
                </div>
                <p className="text-[#4E5A2B] leading-relaxed mb-4">
                  No seguimos modas. Seguimos a nuestras gallinas. Viven afuera, comen natural y ponen huevos con más sabor, más color y más carácter.
                </p>
                <p className="text-[#1a1a1a] font-bold text-lg">Así de simple.</p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <Image 
                  src="/images/logo-fuga-white.png"
                  alt="Fuga - Gallina escapando"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <div className="text-center text-sm text-[#4E5A2B] space-y-1">
                  <p className="font-bold uppercase">Bienestar animal</p>
                  <p className="font-bold uppercase">Sabor real</p>
                  <p className="font-bold uppercase">Origen transparente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

      {/* Waitlist Section */}
      <section id="waitlist" className="scroll-mt-20 py-16 md:py-20 bg-[#4E5A2B]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">Unite a la Comunidad</h2>
              <p className="text-white/90">
                Estamos preparando todo para empezar a distribuir. Dejanos tus datos y te avisamos cuando estemos listos.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Image 
              src="/images/fuga-logo.svg" 
              alt="Fuga Logo" 
              width={100} 
              height={50}
              className="object-contain h-[45px] w-auto"
            />
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              {whatsappUrl() && (
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFC300] transition-colors">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              )}
              {SITE.instagram && (
                <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFC300] transition-colors">
                  <Instagram className="h-4 w-4" /> @{SITE.instagram}
                </a>
              )}
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-[#FFC300] transition-colors">
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
            </div>
          </div>
          <p className="mt-8 text-center md:text-right text-xs text-white/50">
            © {new Date().getFullYear()} Fuga. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <WhatsappButton />
    </div>
  )
}
