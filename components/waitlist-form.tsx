'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Minus, Plus, MapPin, Loader2, Check } from 'lucide-react'

type DireccionNormalizada = {
  direccion_completa: string
  calle: string
  numero: string
  ciudad: string
  provincia: string
  codigo_postal: string
  lat: number
  lon: number
}

type ProductoSeleccionado = {
  producto: string
  cantidad: number
}

type FormData = {
  nombre: string
  email: string
  telefono: string
  direccion_completa: string
  calle: string
  numero: string
  piso_depto: string
  ciudad: string
  provincia: string
  codigo_postal: string
  lat: number | null
  lon: number | null
  productos: ProductoSeleccionado[]
  entregas_por_mes: number
  cantidad_por_entrega: number
  total_mensual: number
}

type NominatimResult = {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address: {
    road?: string
    house_number?: string
    city?: string
    town?: string
    village?: string
    state?: string
    postcode?: string
    suburb?: string
    neighbourhood?: string
  }
}

const PRODUCTOS = [
  { id: 'maple_30', nombre: 'Maple 30 huevos', descripcion: '30 huevos frescos' },
  { id: 'maple_6', nombre: 'Maple 6 huevos', descripcion: '6 huevos frescos' },
]

export function WaitlistForm() {
  const [loading, setLoading] = useState(false)
  const [searchingAddress, setSearchingAddress] = useState(false)
  const [addressQuery, setAddressQuery] = useState('')
  const [addressResults, setAddressResults] = useState<NominatimResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [addressValidated, setAddressValidated] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const paso1Ref = useRef<HTMLDivElement>(null)
  const [paso, setPaso] = useState<1 | 2>(1)

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    direccion_completa: '',
    calle: '',
    numero: '',
    piso_depto: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    lat: null,
    lon: null,
    productos: [
      { producto: 'maple_30', cantidad: 0 },
      { producto: 'maple_6', cantidad: 0 },
    ],
    entregas_por_mes: 1,
    cantidad_por_entrega: 1,
    total_mensual: 0,
  })

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Calculate total monthly products
  useEffect(() => {
    const totalProductos = formData.productos.reduce((sum, p) => sum + p.cantidad, 0)
    const total = totalProductos * formData.entregas_por_mes
    setFormData(prev => ({ ...prev, total_mensual: total, cantidad_por_entrega: totalProductos }))
  }, [formData.productos, formData.entregas_por_mes])

  // Search addresses with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (addressQuery.length < 4) {
      setAddressResults([])
      setShowResults(false)
      return
    }

    setSearchingAddress(true)
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        // Bounding box for Buenos Aires area (expanded to include GBA)
        // viewbox: west,south,east,north (lon,lat,lon,lat)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(addressQuery)}&` +
          `countrycodes=ar&` +
          `format=json&` +
          `addressdetails=1&` +
          `limit=5&` +
          `viewbox=-59.2,-35.0,-58.0,-34.3&` +
          `bounded=0`,
          {
            headers: {
              'Accept-Language': 'es',
            }
          }
        )
        const data: NominatimResult[] = await response.json()
        setAddressResults(data)
        setShowResults(data.length > 0)
      } catch (error) {
        console.error('Error searching address:', error)
      } finally {
        setSearchingAddress(false)
      }
    }, 500)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [addressQuery])

  const selectAddress = (result: NominatimResult) => {
    const ciudad = result.address.city || result.address.town || result.address.village || ''
    const provincia = result.address.state || ''
    const calle = result.address.road || ''
    const numero = result.address.house_number || ''
    const codigoPostal = result.address.postcode || ''

    setFormData(prev => ({
      ...prev,
      direccion_completa: result.display_name,
      calle,
      numero,
      ciudad,
      provincia,
      codigo_postal: codigoPostal,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
    }))
    setAddressQuery(result.display_name)
    setShowResults(false)
    setAddressValidated(true)
  }

  const clearAddress = () => {
    setFormData(prev => ({
      ...prev,
      direccion_completa: '',
      calle: '',
      numero: '',
      ciudad: '',
      provincia: '',
      codigo_postal: '',
      lat: null,
      lon: null,
    }))
    setAddressQuery('')
    setAddressValidated(false)
  }

  const updateProductQuantity = (productoId: string, delta: number) => {
    setFormData(prev => ({
      ...prev,
      productos: prev.productos.map(p => 
        p.producto === productoId 
          ? { ...p, cantidad: Math.max(0, p.cantidad + delta) }
          : p
      )
    }))
  }

  const irAlPaso2 = () => {
    const inputs = paso1Ref.current?.querySelectorAll('input') ?? []
    for (const input of Array.from(inputs)) {
      if (!input.checkValidity()) {
        input.reportValidity()
        return
      }
    }
    if (!addressValidated) {
      toast.error('Escribi tu direccion y hace click en una opcion de la lista de sugerencias que aparece debajo')
      document.getElementById('direccion')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setPaso(2)
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!addressValidated) {
      setPaso(1)
      toast.error('Escribi tu direccion y hace click en una opcion de la lista de sugerencias que aparece debajo')
      return
    }

    const totalProductos = formData.productos.reduce((sum, p) => sum + p.cantidad, 0)
    if (totalProductos === 0) {
      toast.error('Agrega al menos un producto usando el boton +')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        if (response.status === 400) {
          toast.error('Este email ya esta registrado en la comunidad')
        } else {
          toast.error('Hubo un error al registrarte. Intenta de nuevo.')
        }
      } else {
        toast.success('Te registramos con exito! Te avisaremos cuando estemos listos.')
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          direccion_completa: '',
          calle: '',
          numero: '',
          piso_depto: '',
          ciudad: '',
          provincia: '',
          codigo_postal: '',
          lat: null,
          lon: null,
          productos: [
            { producto: 'maple_30', cantidad: 0 },
            { producto: 'maple_6', cantidad: 0 },
          ],
          entregas_por_mes: 1,
          cantidad_por_entrega: 1,
          total_mensual: 0,
        })
        setAddressQuery('')
        setAddressValidated(false)
        setPaso(1)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Hubo un error al registrarte. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {[1, 2].map((n) => (
          <div key={n} className="flex items-center gap-2 flex-1">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${paso >= n ? 'bg-[#4E5A2B] text-white' : 'bg-[#F3ECDA] text-[#1a1a1a]/50'}`}>
              {paso > n ? <Check className="h-4 w-4" /> : n}
            </span>
            <span className={`text-xs font-bold uppercase tracking-wide ${paso >= n ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/50'}`}>
              {n === 1 ? 'Tus datos' : 'Tu pedido'}
            </span>
            {n === 1 && <span className={`h-0.5 flex-1 ${paso > 1 ? 'bg-[#4E5A2B]' : 'bg-[#F3ECDA]'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {paso === 1 && (
        <div ref={paso1Ref} className="space-y-6">
        {/* Personal Info Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-[#1a1a1a] uppercase tracking-wide border-b-2 border-[#FFC300] pb-2">Datos personales</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">
                  Nombre completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">
                Telefono <span className="text-destructive">*</span>
              </Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="+54 9 11 1234-5678"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          {/* Address Section with Autocomplete */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#1a1a1a] uppercase tracking-wide border-b-2 border-[#FFC300] pb-2">Direccion de entrega</h3>
            
            <div className="space-y-2">
              <Label htmlFor="direccion">
                Busca tu direccion <span className="text-destructive">*</span>
              </Label>
              <div className="relative" ref={resultsRef}>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="direccion"
                    type="text"
                    placeholder="Empieza a escribir tu direccion..."
                    value={addressQuery}
                    onChange={(e) => {
                      setAddressQuery(e.target.value)
                      if (addressValidated) {
                        clearAddress()
                      }
                    }}
                    disabled={loading}
                    className={`pl-10 pr-10 ${addressValidated ? 'border-green-500 bg-green-50' : ''}`}
                  />
                  {searchingAddress && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                  {addressValidated && !searchingAddress && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                
                {/* Autocomplete Results */}
                {showResults && addressResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-card border rounded-md shadow-lg max-h-60 overflow-auto">
                    {addressResults.map((result) => (
                      <button
                        key={result.place_id}
                        type="button"
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0"
                        onClick={() => selectAddress(result)}
                      >
                        <p className="text-sm font-medium truncate">{result.display_name}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!addressValidated && addressQuery.length > 0 && (
                <p className="text-xs font-medium text-[#B1251A]">
                  Importante: hace click en una direccion de la lista para confirmarla
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Escribi al menos 4 caracteres y selecciona una opcion de la lista
              </p>
            </div>

            {/* Show validated address details */}
            {addressValidated && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-green-800">Direccion seleccionada:</p>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={clearAddress}
                    className="text-green-700 hover:text-green-900"
                  >
                    Cambiar
                  </Button>
                </div>
                <div className="grid gap-2 text-sm">
                  <p><span className="text-muted-foreground">Calle:</span> {formData.calle} {formData.numero}</p>
                  <p><span className="text-muted-foreground">Ciudad:</span> {formData.ciudad}</p>
                  <p><span className="text-muted-foreground">Provincia:</span> {formData.provincia}</p>
                  {formData.codigo_postal && (
                    <p><span className="text-muted-foreground">CP:</span> {formData.codigo_postal}</p>
                  )}
                </div>
                
                {/* Optional: Piso/Depto field */}
                <div className="pt-2 border-t border-green-200">
                  <Label htmlFor="piso_depto" className="text-green-800">Piso / Departamento (opcional)</Label>
                  <Input
                    id="piso_depto"
                    type="text"
                    placeholder="Ej: 3ro B"
                    value={formData.piso_depto}
                    onChange={(e) => setFormData({ ...formData, piso_depto: e.target.value })}
                    disabled={loading}
                    className="mt-1 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          <Button type="button" onClick={irAlPaso2} className="w-full bg-[#4E5A2B] hover:bg-[#3d4722] text-white font-bold uppercase tracking-wide h-12" size="lg">
            Siguiente: elegí tu pedido
          </Button>
        </div>
        )}

        {paso === 2 && (
        <div className="space-y-6">
          {/* Products Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#1a1a1a] uppercase tracking-wide border-b-2 border-[#FFC300] pb-2">Selecciona tus productos</h3>
            
            <div className="space-y-3">
              {PRODUCTOS.map((producto) => {
                const selected = formData.productos.find(p => p.producto === producto.id)
                const cantidad = selected?.cantidad || 0
                
                return (
                  <div key={producto.id} className="flex items-center justify-between p-4 border-2 border-[#1a1a1a] rounded-lg bg-[#F3ECDA]">
                    <div>
                      <p className="font-medium">{producto.nombre}</p>
                      <p className="text-sm text-muted-foreground">{producto.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateProductQuantity(producto.id, -1)}
                        disabled={loading || cantidad === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{cantidad}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateProductQuantity(producto.id, 1)}
                        disabled={loading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Delivery Frequency Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#1a1a1a] uppercase tracking-wide border-b-2 border-[#FFC300] pb-2">Frecuencia de entrega</h3>
            
            <div className="space-y-2">
              <Label htmlFor="entregas_por_mes">Cuantas veces al mes queres recibir tu pedido?</Label>
              <Select
                value={formData.entregas_por_mes.toString()}
                onValueChange={(value) => setFormData({ ...formData, entregas_por_mes: parseInt(value) })}
                disabled={loading}
              >
                <SelectTrigger id="entregas_por_mes">
                  <SelectValue placeholder="Selecciona frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 vez al mes</SelectItem>
                  <SelectItem value="2">2 veces al mes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Summary */}
            {formData.total_mensual > 0 && (
              <div className="p-4 bg-[#FFC300]/20 rounded-lg border-2 border-[#FFC300]">
                <p className="font-bold text-[#1a1a1a] uppercase">Resumen de tu pedido mensual:</p>
                <ul className="mt-2 text-sm space-y-1">
                  {formData.productos.filter(p => p.cantidad > 0).map(p => {
                    const prod = PRODUCTOS.find(pr => pr.id === p.producto)
                    return (
                      <li key={p.producto}>
                        {prod?.nombre}: {p.cantidad} x {formData.entregas_por_mes} = {p.cantidad * formData.entregas_por_mes} por mes
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-2 font-semibold">
                  Total: {formData.total_mensual} producto(s) por mes
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full bg-[#4E5A2B] hover:bg-[#3d4722] text-white font-bold uppercase tracking-wide h-12" size="lg" disabled={loading}>
            {loading ? 'Registrando...' : 'Unite a la Comunidad'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setPaso(1)} disabled={loading} className="w-full text-[#4E5A2B]">
            Volver a mis datos
          </Button>
        </div>
        )}
        </form>
      </div>
  )
}
