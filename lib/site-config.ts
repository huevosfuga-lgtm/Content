// Datos del negocio que se muestran en la landing.
// Lo que quede vacío ('' o []) no se muestra en la página.

export const SITE = {
  // WhatsApp con código de país, solo números. Ej: '5491112345678'
  whatsapp: '',
  whatsappMensaje: 'Hola Fuga! Quiero saber más sobre los huevos',

  // Usuario de Instagram sin @. Ej: 'huevosfuga'
  instagram: '',

  email: 'huevos.fuga@gmail.com',

  // Barrios / localidades donde entregan. Ej: ['Núñez', 'Belgrano', 'Saavedra']
  zonas: [] as string[],

  // Zonas de entrega que se muestran en la franja verde. 'detalle' es opcional.
  zonasEntrega: [
    { zona: 'CABA', detalle: 'Recoleta · Palermo · Belgrano' },
    { zona: 'Pilar' },
    { zona: 'Bancalari' },
  ] as { zona: string; detalle?: string }[],

  // Precio por producto. Ej: '$12.000'. Vacío = no se muestra.
  precios: {
    maple_30: '$14.500',
    maple_6: '$4.500',
  },
  // Texto chico que va debajo del precio
  precioNota: 'Envío incluido',
}

export const FAQS: { pregunta: string; respuesta: string }[] = [
  {
    pregunta: '¿Cómo funciona?',
    respuesta:
      'Te anotás en la comunidad con tu dirección y elegís qué productos querés y cada cuánto. Cuando arrancamos a entregar en tu zona te escribimos para confirmar el pedido.',
  },
  {
    pregunta: '¿Anotarme me obliga a comprar?',
    respuesta: 'No. Anotarte es para que te avisemos cuando estemos listos. Recién ahí confirmás si querés el pedido.',
  },
  {
    pregunta: '¿Cada cuánto recibo los huevos?',
    respuesta: 'Vos elegís: una o dos veces por mes. Lo podés cambiar cuando quieras.',
  },
  {
    pregunta: '¿Qué productos tienen?',
    respuesta:
      'Maple de 30 huevos, ideal para familias, y maple de 6 huevos, ideal para probar. Todos de gallinas pastoriles, libres de jaula.',
  },
  {
    pregunta: '¿Qué tienen de distinto estos huevos?',
    respuesta:
      'Nuestras gallinas viven afuera, caminan, picotean pasto y comen natural. Eso se nota en la yema: más color, más sabor y más carácter.',
  },
]

export function whatsappUrl() {
  if (!SITE.whatsapp) return ''
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMensaje)}`
}
