# Fuga — Landing page (waitlist)

Landing de Fuga hecha con Next.js + Tailwind + shadcn/ui (formato v0.dev).
El formulario guarda los registros en Supabase (tabla `waitlist`) y avisa por email con Resend.

## Puesta en marcha

### 1. Base de datos en Supabase
1. Entrá a [supabase.com](https://supabase.com) → **New project** (región recomendada: São Paulo).
2. Abrí **SQL Editor** → **New query**, pegá el contenido de `scripts/000-supabase-esquema-completo.sql` y tocá **Run**.
3. (Opcional) Para traer los registros viejos: **Table Editor** → `waitlist` → **Insert** → **Import data from CSV** y subí `waitlist_rows.csv`.
   Ese CSV **no** está en el repo porque tiene datos personales y el repo es público.
4. En **Project Settings → API** copiá la **Project URL** y la **anon public key**.

### 2. Proyecto en v0.dev
1. Entrá a [v0.dev](https://v0.dev) → **New** → **Import from GitHub**.
2. Elegí el repo `huevosfuga-lgtm/Content` y la rama `main`.
3. En el sidebar, **Vars**, cargá:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
   - `RESEND_API_KEY` = tu clave de Resend (ver `RESEND_SETUP.md`)
4. Listo: lo que edites en v0 se guarda en GitHub y **Publish** lo despliega en Vercel.

### Desarrollo local (opcional)
```bash
cp .env.example .env.local   # completar los valores
pnpm install
pnpm dev
```
