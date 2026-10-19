import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Resend es opcional: sin RESEND_API_KEY se guarda el registro pero no se manda el email
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

type ProductoSeleccionado = {
  producto: string
  cantidad: number
}

type WaitlistData = {
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

export async function POST(request: Request) {
  try {
    const data: WaitlistData = await request.json()

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert([{
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        direccion_completa: data.direccion_completa,
        calle: data.calle,
        numero: data.numero,
        piso_depto: data.piso_depto,
        ciudad: data.ciudad,
        provincia: data.provincia,
        codigo_postal: data.codigo_postal,
        lat: data.lat,
        lon: data.lon,
        productos: data.productos,
        entregas_por_mes: data.entregas_por_mes,
        cantidad_por_entrega: data.cantidad_por_entrega,
        total_mensual: data.total_mensual,
      }])

    if (dbError) {
      console.error('Supabase error:', dbError)
      if (dbError.code === '23505') {
        return NextResponse.json({ error: 'Email ya registrado' }, { status: 400 })
      }
      return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
    }

    // Format products for email
    const productosTexto = data.productos
      .filter(p => p.cantidad > 0)
      .map(p => {
        const nombreProducto = p.producto === 'maple_30' ? 'Maple 30 huevos' : 'Maple 6 huevos'
        return `- ${nombreProducto}: ${p.cantidad} unidad(es)`
      })
      .join('\n')

    const frecuenciaTexto = data.entregas_por_mes === 1 ? 'Una vez al mes' : 'Dos veces al mes'
    
    const direccionCompleta = [
      data.calle,
      data.numero,
      data.piso_depto,
      data.ciudad,
      data.provincia,
      data.codigo_postal ? `CP ${data.codigo_postal}` : ''
    ].filter(Boolean).join(', ')

    const googleMapsUrl = data.lat && data.lon 
      ? `https://www.google.com/maps?q=${data.lat},${data.lon}` 
      : null

    // Send email notification
    if (resend) try {
      await resend.emails.send({
        from: 'Fuga Waitlist <onboarding@resend.dev>',
        to: 'huevos.fuga@gmail.com',
        subject: `Nueva suscripcion: ${data.nombre} - ${data.ciudad}`,
        html: `
          <h2>Nuevo registro en la waitlist de Fuga</h2>
          
          <h3>Datos del cliente:</h3>
          <table style="border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Nombre:</td><td style="padding: 5px 0;"><strong>${data.nombre}</strong></td></tr>
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Email:</td><td style="padding: 5px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Telefono:</td><td style="padding: 5px 0;"><a href="tel:${data.telefono}">${data.telefono}</a></td></tr>
          </table>

          <h3>Direccion de entrega:</h3>
          <table style="border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Direccion:</td><td style="padding: 5px 0;"><strong>${direccionCompleta}</strong></td></tr>
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Calle:</td><td style="padding: 5px 0;">${data.calle} ${data.numero}</td></tr>
            ${data.piso_depto ? `<tr><td style="padding: 5px 15px 5px 0; color: #666;">Piso/Depto:</td><td style="padding: 5px 0;">${data.piso_depto}</td></tr>` : ''}
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Ciudad:</td><td style="padding: 5px 0;">${data.ciudad}</td></tr>
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Provincia:</td><td style="padding: 5px 0;">${data.provincia}</td></tr>
            ${data.codigo_postal ? `<tr><td style="padding: 5px 15px 5px 0; color: #666;">Codigo Postal:</td><td style="padding: 5px 0;">${data.codigo_postal}</td></tr>` : ''}
          </table>
          
          ${googleMapsUrl ? `<p><a href="${googleMapsUrl}" style="color: #4285f4;">Ver en Google Maps</a></p>` : ''}

          <h3>Pedido solicitado:</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <pre style="margin: 0; font-family: sans-serif;">${productosTexto || 'No selecciono productos'}</pre>
          </div>

          <h3>Frecuencia de entrega:</h3>
          <table style="border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Entregas por mes:</td><td style="padding: 5px 0;"><strong>${frecuenciaTexto}</strong></td></tr>
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Cantidad por entrega:</td><td style="padding: 5px 0;">${data.cantidad_por_entrega} producto(s)</td></tr>
            <tr><td style="padding: 5px 15px 5px 0; color: #666;">Total mensual:</td><td style="padding: 5px 0;"><strong>${data.total_mensual} producto(s)</strong></td></tr>
          </table>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Registro realizado el ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request if email fails - data is already saved
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in waitlist API:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
