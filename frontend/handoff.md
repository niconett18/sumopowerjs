# SumoPower — Next.js + Tailwind Build Prompt

Copy this entire document into Claude Code / Cursor / v0 as a single prompt. It is self-contained: design tokens, folder structure, every page/component spec, integration points for your existing Prisma backend, and verbatim Indonesian copy.

---

## 1. STACK & SETUP

**Required:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS v3.4+
- Prisma (already set up by user — assume `@/lib/prisma` exports a `PrismaClient` instance)
- `lucide-react` for icons
- `clsx` + `tailwind-merge` for class utilities (combine into a `cn()` helper)

**Fonts:** Poppins (300, 400, 500, 600, 700) + JetBrains Mono (400, 500) — loaded via `next/font/google` in `app/layout.tsx`.

```ts
// app/layout.tsx
import { Poppins, JetBrains_Mono } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${mono.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
```

---

## 2. DESIGN TOKENS

### Colors (extend Tailwind `colors`)
```js
ink:        '#0F1115',  // primary text, primary buttons, dark surfaces
'ink-2':    '#1A1D24',  // hover state for ink
'ink-3':    '#4B5160',  // secondary text
'ink-mute': '#8A8F9A',  // tertiary text, meta, hairline numbers
hairline:   '#E6E8EC',  // primary borders
'hairline-2': '#EFF1F4', // soft dividers
paper:      '#FAFAFA',  // page background
'paper-2':  '#F3F4F6',  // recessed surfaces (card stage, recess fills)
surface:    '#FFFFFF',  // cards, modal
yellow:     '#F5B800',  // PRIMARY ACCENT — use sparingly
'yellow-2': '#E5A800',  // hover state for yellow
'yellow-ink': '#1A1300', // text on yellow buttons
success:    '#16A34A',
danger:     '#B83A26',
```

### Typography rules (CRITICAL — do NOT deviate)
- **Display** (h1, hero, section heads): `font-poppins font-light tracking-tight` at large sizes, or `font-medium` for tighter heads. NEVER italic. NEVER serif.
- **Body**: `font-poppins font-normal text-[15px] leading-[1.55]`
- **Eyebrow labels**: `text-[11px] tracking-[0.14em] uppercase font-semibold text-ink-3` — preceded by a 24px × 1px hairline (use a `::before` pseudo or a `<span className="block w-6 h-px bg-current opacity-70 mr-2.5" />`)
- **Mono**: only for product codes, SKUs, console-style metadata, dimensions

### Spacing & radius
- Border radius scale: `rounded-[4px]` (sm), `rounded-[6px]` (md, default for cards), `rounded-[10px]` (lg), `rounded-[16px]` (xl, modals/hero card)
- Section padding: `py-24` desktop, `py-16` mobile
- Container: `max-w-[1320px] mx-auto px-10` desktop, `px-5` mobile

### Shadows
- `shadow-soft`: `0 1px 2px rgba(15,17,21,.04), 0 8px 24px -12px rgba(15,17,21,.08)`
- `shadow-pop`: `0 20px 48px -20px rgba(15,17,21,.18), 0 4px 12px -6px rgba(15,17,21,.08)`

---

## 3. FOLDER STRUCTURE

```
app/
  layout.tsx
  page.tsx                    // Home
  produk/
    page.tsx                  // Product listing (server component, reads from Prisma)
    [slug]/
      page.tsx                // Optional product detail page (or use modal only)
  tentang/
    page.tsx                  // About
  admin/
    login/page.tsx
    dashboard/page.tsx        // Protected, lists products + add new
  api/
    products/route.ts         // GET ?category=&q=&sort= → Product[]
    auth/login/route.ts       // POST { email, password }

components/
  layout/
    Nav.tsx
    Footer.tsx
    Container.tsx
  ui/
    Button.tsx                // variants: primary | yellow | ghost
    Eyebrow.tsx
    BatteryIllo.tsx           // placeholder battery SVG-style box
  home/
    Hero.tsx
    BrandGrid.tsx
    WhyUs.tsx
    Guide.tsx
  products/
    ProductGrid.tsx           // client (filtering, sort)
    ProductCard.tsx
    FilterPanel.tsx
    ProductModal.tsx          // client, opens on card click
  admin/
    LoginForm.tsx

lib/
  prisma.ts                   // assume exists
  cn.ts                       // clsx + tailwind-merge helper
  format.ts                   // formatIDR(n: number): string

types/
  product.ts                  // Product type (mirror Prisma model)
```

---

## 4. PRISMA SCHEMA (suggested — adapt to your existing schema)

```prisma
model Product {
  id        String   @id @default(cuid())
  brand     String   // 'Samsung' | 'Xiaomi' | 'Oppo' | 'Vivo' | 'iPhone' | 'Nokia' | 'Infinix' | 'Asus' | 'Charger'
  model     String   // e.g. "Galaxy A52"
  code      String   @unique  // e.g. "EB-BA526ABY"
  mAh       Int      // capacity
  voltage   String   // "3.85V"
  dimension String   // "74 × 65 × 4.5 mm"
  type      String   @default("Li-ion")
  warranty  String   @default("12 bulan")
  origin    String   @default("Original Sumo")
  price     Int      // in IDR rupiah (no decimals)
  stock     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Admin {
  id       String @id @default(cuid())
  email    String @unique
  password String  // hashed (bcrypt)
}
```

**Brand → category-id mapping** (used in filter URLs `/produk?category=samsung`):
```ts
const CATEGORIES = [
  { id: 'all',     name: 'Semua Produk',    brand: null },
  { id: 'charger', name: 'Charger / Saver', brand: 'Charger' },
  { id: 'asus',    name: 'Baterai Asus',    brand: 'Asus' },
  { id: 'infinix', name: 'Baterai Infinix', brand: 'Infinix' },
  { id: 'samsung', name: 'Baterai Samsung', brand: 'Samsung' },
  { id: 'xiaomi',  name: 'Baterai Xiaomi',  brand: 'Xiaomi' },
  { id: 'vivo',    name: 'Baterai Vivo',    brand: 'Vivo' },
  { id: 'oppo',    name: 'Baterai Oppo',    brand: 'Oppo' },
  { id: 'iphone',  name: 'Baterai iPhone',  brand: 'iPhone' },
  { id: 'nokia',   name: 'Baterai Nokia',   brand: 'Nokia' },
];
```

---

## 5. PAGE SPECS

### 5.1 `app/page.tsx` — HOME

Sections in order: `<Nav />` → `<Hero />` → `<BrandGrid />` → `<WhyUs />` → `<Guide />` → `<Footer />`

#### `<Hero />` — `components/home/Hero.tsx`
- Two-column grid `lg:grid-cols-[1.15fr_1fr] gap-20`, stacks on `<lg`
- **Left:**
  - Eyebrow: `Spesialis baterai HP · Sejak 2014`
  - h1 (use `<h1 className="text-[44px] md:text-6xl lg:text-[80px] font-light tracking-[-0.03em] leading-[1.02] mt-7 mb-6">`):
    > Baterai HP original<br/>untuk **setiap merek**,<br/>**setiap model.**
    
    (the bold portions use `<strong className="font-semibold">`)
  - Lede paragraph (`text-base text-ink-3 max-w-[480px] leading-relaxed mb-9`):
    > SumoPower menyediakan baterai pengganti original untuk Samsung, Xiaomi, Oppo, Vivo, iPhone, dan merek lainnya. Setiap unit diuji kapasitas sebelum dikirim, dilengkapi garansi tukar 12 bulan.
  - Two buttons: primary yellow "Lihat katalog produk" → `/produk`, ghost "Tentang SumoPower" → `/tentang`
  - Below, a horizontal stat strip `flex gap-14 mt-14 pt-7 border-t border-hairline max-w-[560px]`:
    - `211+` / "Tipe baterai tersedia"
    - `9` / "Merek HP didukung"
    - `12 bln` / "Garansi resmi tukar"
- **Right:** `<BatteryIllo />` framed in a `rounded-2xl border border-hairline bg-surface shadow-soft overflow-hidden aspect-[4/5] max-w-[420px] flex flex-col`:
  - Top: stage area (`flex-1 bg-paper-2 relative grid place-items-center`) with the battery component and a faint grid background (`background-image: linear-gradient(border 1px, transparent 1px) ...; background-size: 40px 40px; mask-image: radial-gradient(...)` — opacity 0.5)
  - Bottom: thin footer bar (`px-5 py-4 border-t border-hairline flex justify-between text-xs`): left `SP-BN5A / Redmi Note 11` in mono, right green-dot pill "Tersedia"

#### `<BrandGrid />` — `components/home/BrandGrid.tsx`
- Section head split: left has eyebrow `Katalog` + h2 `Pilih merek HP Anda untuk melihat baterai yang tersedia.` (max 16ch), right has 380px description text
- Grid: `grid grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline bg-surface`
- Each cell: `border-r border-b border-hairline p-8 min-h-[180px] flex flex-col justify-between relative cursor-pointer hover:bg-paper-2 transition`
  - Top: mono count `09 produk`
  - Bottom: small uppercase sub-label `Baterai` (or `Aksesoris` for charger) + brand name in `font-poppins font-medium text-2xl tracking-tight`
  - Hover-revealed arrow button top-right: `<ArrowUpRight />` in a `w-7 h-7 rounded-full bg-ink text-paper grid place-items-center opacity-0 group-hover:opacity-100 transition`
- Click → router.push(`/produk?category=${id}`)

#### `<WhyUs />` — `components/home/WhyUs.tsx`
- Two-column: `grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20`
- Left column: eyebrow `Mengapa SumoPower` + h2 "Tiga komitmen yang konsisten kami pegang." (font-medium, ~48px) + supporting paragraph
- Right column: vertical list with top border `border-t border-ink`. Each row `grid grid-cols-[56px_1fr] gap-6 py-7 border-b border-hairline`:
  - Mono number `01` / `02` / `03`
  - Title (font-medium, 19px) + description (text-sm text-ink-3 leading-relaxed)

Three items verbatim:
1. **Baterai original, bukan replika.** — "Setiap unit melewati pengetesan kapasitas sesuai standar pabrik. Kami tidak menjual baterai replika atau remanufactured."
2. **Garansi tukar 12 bulan.** — "Jika unit mengalami penurunan performa dalam masa garansi, lakukan klaim tukar tanpa biaya tambahan. Cukup tunjukkan invoice pembelian."
3. **Pengiriman hari yang sama.** — "Pesanan yang masuk sebelum pukul 15.00 WIB diproses dan dikirim di hari yang sama melalui JNE, J&T, atau Anteraja."

#### `<Guide />` — `components/home/Guide.tsx`
- Full dark card: `bg-ink text-paper rounded-2xl p-14 lg:p-18`
- Eyebrow `Panduan` (variant: light hairline + ink-mute text)
- h2 "Cara menemukan tipe baterai yang sesuai dengan HP Anda." (text-paper, font-light, ~56px max, max-w-[16ch])
- 3-column grid `mt-14`. Each step:
  - Top border `border-t border-[#2c2f36]`, `pt-6`
  - Mono yellow `LANGKAH 01` / `02` / `03`
  - Title (white, font-medium, 19px, `mt-3.5 mb-2`)
  - Description (text-ink-mute, text-sm, leading-relaxed)
- Two CTAs at bottom: yellow primary "Cari di katalog" + transparent-ghost (border `#2c2f36`) with WhatsApp icon "Hubungi via WhatsApp"

Steps verbatim:
1. **Buka tutup belakang HP** — "Untuk HP dengan baterai removable seperti Samsung J-series atau Nokia. Untuk HP non-removable, lewati ke langkah 03."
2. **Catat kode part number** — "Format umumnya 4–8 karakter, contoh `BN5A`, `EB-BA526`, atau `BLP817`." (code samples wrapped in `<code>` with mono font, color paper)
3. **Cari di katalog kami** — "Gunakan filter merek atau cari berdasarkan kode di kolom pencarian. Tim kami siap membantu via WhatsApp jika diperlukan."

---

### 5.2 `app/produk/page.tsx` — PRODUCT LISTING

**Server component** — reads from Prisma with search params:
```ts
export default async function ProdukPage({ searchParams }: { searchParams: { category?: string; q?: string; sort?: string } }) {
  const { category = 'all', q = '', sort = 'terbaru' } = searchParams;
  const where: any = {};
  const cat = CATEGORIES.find(c => c.id === category);
  if (cat?.brand) where.brand = cat.brand;
  if (q) where.OR = [
    { brand: { contains: q, mode: 'insensitive' } },
    { model: { contains: q, mode: 'insensitive' } },
    { code:  { contains: q, mode: 'insensitive' } },
  ];
  const orderBy =
    sort === 'harga-naik'  ? { price: 'asc' as const } :
    sort === 'harga-turun' ? { price: 'desc' as const } :
    { createdAt: 'desc' as const };
  const products = await prisma.product.findMany({ where, orderBy });
  return <ProductsLayout products={products} activeCategory={category} />;
}
```

**Layout:**
- `<ProductsHero />` — `bg-surface border-b border-hairline py-12`: eyebrow `Katalog · ${activeCategory.name}`, h1 (font-medium ~56px) "Baterai {brand} original" or fallback "Katalog lengkap baterai HP", meta row: `${count} produk tersedia · Semua dalam stok · Garansi resmi 12 bulan`
- Two-column body `grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-14 py-12`:
  - **`<FilterPanel />`** (client component — uses `useRouter()` + `useSearchParams()`):
    - Search box `border border-hairline rounded-[4px] px-3.5 py-3 mb-6 flex gap-2.5` with magnifier icon
    - Filter header: uppercase "Kategori" + clickable "Reset"
    - Category list: each item `flex justify-between py-2.5 text-[13px] cursor-pointer border-b border-hairline-2`. Active state: `font-semibold text-ink + 2px yellow underline (bottom border replaces hairline)`
    - Below: dark help card `bg-ink text-paper rounded-md p-4.5`: yellow eyebrow "Butuh bantuan", title "Tidak yakin tipe baterai HP Anda?", yellow text link "Hubungi tim kami →"
  - **`<ProductGrid />`** (client component if you want filter state without re-fetching, otherwise server):
    - Toolbar: count on left, "Urutkan" + select (`Terbaru | Harga terendah | Harga tertinggi`) on right
    - Grid `grid grid-cols-2 lg:grid-cols-3 gap-5`
    - Empty state if no results: large "Tidak ada hasil" + helper text

#### `<ProductCard />` — `components/products/ProductCard.tsx`
Card: `bg-surface border border-hairline rounded-md overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:border-ink hover:shadow-soft transition relative group`

- **Stage** (`aspect-square bg-paper-2 grid place-items-center relative border-b border-hairline`):
  - Faint grid background (mask radial-gradient)
  - `<BatteryIllo />` at `w-[44%]`
  - **Hover overlay** — absolute inset, `bg-ink/95 text-paper p-5.5 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between`:
    - Top: yellow uppercase "Spesifikasi" label
    - List of 5 spec rows in mono `text-[11px]`: Kapasitas / Voltase / Dimensi / Tipe sel / Garansi — each row `flex justify-between border-b border-[#2c2f36] py-1`
    - Bottom: mono SKU + yellow "Lihat detail →"
- **Body** (`p-4.5`):
  - Top row: uppercase brand label + mono code
  - Model name `font-medium text-base mb-2.5 leading-tight`
  - Bottom row: `border-t border-hairline-2 pt-2.5`, price (font-semibold) on left + mono `${mAh} mAh` on right

Click → open `<ProductModal product={p} />`

#### `<ProductModal />` — `components/products/ProductModal.tsx`
- Render via portal or simple fixed overlay. Lock body scroll. Esc closes.
- Overlay: `fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm grid place-items-center p-6`
- Panel: `bg-surface rounded-2xl w-full max-w-[1000px] max-h-[92vh] overflow-hidden grid grid-cols-1 md:grid-cols-[1.05fr_1fr] shadow-pop` with entrance animation (fade + translate-y-3.5)
- Close button: absolute top-right, white circular with hairline border, hover inverts
- **Left stage** (`bg-paper-2 grid place-items-center min-h-[460px] relative border-r border-hairline`):
  - Top-left absolute mono `SKU · ${code}`
  - `<BatteryIllo />` at `w-[48%]`
  - Bottom-right absolute mono `${brand} · ${model}`
- **Right info** (`p-9 overflow-y-auto flex flex-col`):
  - Brandline: brand label + dark "Original" pill + auto-margin "Tersedia" with green dot
  - h2: `${brand} ${model}` (font-medium 32px) + smaller sub "Baterai pengganti — ${type}"
  - Mono code row
  - Price row `border-t border-b border-hairline py-4.5`: large price + mono "IDR · sudah termasuk PPN"
  - 2-col spec grid (6 cells: Kapasitas, Voltase, Dimensi, Tipe sel, Garansi, Keaslian)
  - Bottom actions: yellow "Pesan via WhatsApp" + ghost "Tambah ke wishlist"
  - Trust strip with bullets: "Garansi 12 bulan" · "Kirim hari ini" · "COD tersedia" · "Original 100%"

---

### 5.3 `app/tentang/page.tsx` — ABOUT

Static page. Sections:
1. **Hero** (`bg-surface border-b border-hairline py-20`):
   - Eyebrow "Tentang Kami"
   - h1: "Penyedia baterai HP **original** dan aksesoris pengisian daya untuk seluruh Indonesia." (font-light, bold portion font-semibold, max-w-[20ch])
2. **Two-col grid** (`grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 py-16`):
   - **Left:** large lede paragraph (22px, font-normal, leading-[1.4]) + 3-col stat strip (`2014` / "Tahun berdiri", `211+` / "Tipe baterai tersedia", `34` / "Kota jangkauan kirim")
   - **Right:** 3 body paragraphs (text-base text-ink-2 leading-[1.7] max-w-[60ch])
3. **Values list** (`border-t border-ink`):
   - 4 rows: `grid grid-cols-1 lg:grid-cols-[60px_1.2fr_1.5fr] gap-8 py-7 border-b border-hairline`
   - Each: mono number, title (font-medium 20px), description (text-ink-3 leading-relaxed)
4. CTAs at bottom: yellow "Lihat katalog produk" + ghost "Hubungi tim kami"

**Lede:**
> Beroperasi sejak 2014, SumoPower melayani teknisi HP, toko service, dan pengguna individu yang membutuhkan baterai pengganti original dengan kualitas terjamin.

**Body paragraphs (verbatim):**
1. SumoPower didirikan dengan tujuan menjawab kebutuhan pasar terhadap baterai HP original yang sulit ditemukan di jalur distribusi umum. Beredarnya baterai replika berkualitas rendah merugikan pengguna akhir maupun teknisi yang mengandalkan komponen original untuk menjaga reputasi layanannya.
2. Kami membangun rantai pasok langsung dengan distributor pabrikan, sehingga setiap produk yang masuk gudang kami dapat ditelusuri keasliannya. Setiap unit melewati pengetesan kapasitas dan voltase sebelum dikemas — memastikan spesifikasi yang tertera sesuai dengan performa di lapangan.
3. Saat ini SumoPower melayani permintaan dari teknisi independen, jaringan toko service, hingga pelanggan retail di seluruh Indonesia. Kami fokus pada satu kategori produk dengan standar kualitas yang tidak kami kompromikan.

**Four principles:**
1. **Hanya menjual produk original** — "Kami tidak menyediakan baterai replika, refurbish, atau remanufactured. Supplier yang menawarkan produk non-original tidak kami terima."
2. **Pengetesan sebelum pengiriman** — "Setiap baterai diuji kapasitas dan voltasenya. Unit yang tidak memenuhi spesifikasi pabrik tidak akan disertakan dalam paket pesanan."
3. **Garansi tukar tanpa biaya** — "Selama masa garansi 12 bulan, klaim tukar baru dilakukan tanpa biaya tambahan. Cukup melampirkan invoice asli pembelian."
4. **Harga wajar dan transparan** — "Kami tidak bersaing pada harga termurah karena harga terlalu rendah seringkali mengindikasikan produk non-original. Kami menetapkan harga wajar sesuai biaya operasional dan jaminan kualitas."

---

### 5.4 `app/admin/login/page.tsx` — ADMIN LOGIN

Two-column split: `grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-68px)]`

**Left (`bg-ink text-paper p-14 relative`):**
- Faint grid background mask
- Top: eyebrow "Panel Admin SumoPower" (on-dark variant) + h2 "Kelola katalog produk dan **informasi stok**." (font-light, ~48px) + supporting paragraph
- Bottom: console box `border border-[#22252c] rounded-md p-4.5 font-mono text-[12px]`:
  - Header "sumopower-admin / sistem"
  - Rows: versi · v2.6.4, produk aktif · 211, menunggu review · 3, sinkronisasi terakhir · 2 menit lalu, status · `● operasional` (yellow)

**Right (`bg-surface grid place-items-center p-12`):**
- Form max-w-[380px]
- Eyebrow with lock icon "Masuk ke akun admin"
- h3 "Selamat datang kembali" (font-semibold 28px)
- Sub paragraph
- Email field + Password field
- Row: "Tetap masuk" checkbox + "Lupa password?" link
- Status alert (success or error styling)
- Full-width primary button "Masuk ke dasbor"
- Demo hint box (bg-paper-2 rounded-sm p-3.5 text-xs)
- Bottom link: "Bukan admin? Kembali ke beranda"

**Submit handler:** POST to `/api/auth/login` with `{ email, password }`. On 200, set cookie + push to `/admin/dashboard`.

---

## 6. SHARED COMPONENTS

### `<Nav />` — `components/layout/Nav.tsx`
- `sticky top-0 z-50 bg-paper/92 backdrop-blur-md border-b border-hairline`
- Inner: `h-[68px] flex items-center justify-between gap-12`
- Brand left: `w-6 h-6 bg-ink rounded-[4px] grid place-items-center` (with `w-2 h-2 bg-yellow rounded-[2px]` inside) + "SumoPower" (font-semibold 17px) + ".id" (font-normal text-ink-3)
- Nav links center/right: `Beranda`, `Produk`, `Tentang` (active state: `text-ink + 2px bottom underline border-ink`)
- Faded "ADMIN" link (uppercase letter-spacing 0.12em text-xs text-ink-mute)
- Right CTA button (dark): "Lihat katalog" with arrow

### `<Footer />` — `components/layout/Footer.tsx`
- `border-t border-hairline py-16 bg-paper`
- 4-col grid (`1.6fr 1fr 1fr 1fr`):
  - Brand block + tagline "Penyedia baterai HP original dan aksesoris pengisian daya untuk seluruh Indonesia. Beroperasi sejak 2014."
  - Katalog list (Baterai Samsung, Baterai Xiaomi, Baterai iPhone, Charger Mobil)
  - Layanan list (Cek tipe baterai, Klaim garansi, Pengiriman, Program reseller)
  - Kontak list (WhatsApp: 0812-xxxx-xxxx, halo@sumopower.id, Senin–Sabtu 09–17 WIB, Jakarta)
- Bottom bar: copyright "© 2014 – 2026 PT Sumo Power Indonesia. Seluruh hak cipta dilindungi." + "Kebijakan Privasi" + "Syarat & Ketentuan"

### `<BatteryIllo />` — `components/ui/BatteryIllo.tsx`
Pure CSS placeholder, sized via `w-[X%]` from parent. Props: `{ label, sub, code, mAh, vol }`.

Structure:
- Wrapper: `relative aspect-[5/8]` with subtle drop-shadow filter
- Top tab: 6px tall ink-colored stub centered, slightly above top
- Body: rounded-md border with `bg-gradient-to-b from-white to-[#f5f5f5]`, `p-3.5 pt-4 flex flex-col`
- Label box at top: `bg-ink text-paper rounded-sm p-2.5` showing label (font-bold 1.3em uppercase) + sub label + yellow bolt icon on the right
- Specs at bottom: mono `text-[7.5px]` 4 rows (`CODE | CAP | VOL | TYPE`) each `flex justify-between` with hairline divider above
- Two small `w-[14%] h-1 bg-ink-mute rounded-b-sm` "feet" at bottom-left/right

### `<Button />` — `components/ui/Button.tsx`
Variants:
```ts
const variants = {
  primary: 'bg-ink text-paper hover:bg-ink-2',
  yellow:  'bg-yellow text-yellow-ink font-semibold hover:bg-yellow-2',
  ghost:   'bg-transparent text-ink border border-hairline hover:border-ink',
};
```
Base: `inline-flex items-center gap-2.5 px-5.5 py-3.5 rounded-[4px] text-sm font-medium transition`

Children should be rendered with `<span>` text + optional `<ArrowRight className="transition group-hover:translate-x-0.5">` (use `group` on the button).

---

## 7. INTERACTIONS & STATES

- **Card hover:** translate-y(-2px), border becomes ink, soft shadow, spec overlay fades in
- **Filter active:** yellow 2px bottom border, font-semibold
- **Modal:** Esc closes, click outside closes, body scroll locked while open. Use `useEffect` cleanup.
- **Animations:** prefer Tailwind's built-in `transition` + `duration-200/300` over Framer Motion. The only custom animation is modal entry (fade + translate-y) — define as keyframes in `tailwind.config.ts`.

```js
// tailwind.config.ts — animations
keyframes: {
  fade: { from: { opacity: '0' }, to: { opacity: '1' } },
  rise: {
    from: { opacity: '0', transform: 'translateY(14px)' },
    to:   { opacity: '1', transform: 'translateY(0)' },
  },
},
animation: {
  fade: 'fade .2s ease',
  rise: 'rise .3s cubic-bezier(.2,.8,.2,1)',
},
```

---

## 8. CRITICAL DESIGN RULES (do not violate)

1. **No italics anywhere.** No `<em>`, no `font-style: italic`. Strict.
2. **No serifs.** Poppins only for body and display.
3. **No emoji.** No decorative icons beyond the listed lucide-react icons (ArrowRight, ArrowUpRight, Search, X, Check, Shield, Truck, Lock, MessageCircle for whatsapp).
4. **No gradient backgrounds.** Only solid colors. Single subtle gradient allowed inside the BatteryIllo label.
5. **Yellow is an accent, not a wash.** Apply only to: primary CTA, active filter underline, eyebrow accent dot, spec overlay label, hero stat highlight if needed, guide step labels on dark background.
6. **No "stat slop."** Only show numbers that are real and meaningful. Don't pad with `99%` / `1M users` fake stats.
7. **Hover states on cards are subtle:** -2px lift max, no scale transforms, no glows.
8. **Border radius is small.** Default is 6px. Only modals and hero card use 16px. No `rounded-full` except for status dots and the small arrow circle.
9. **Indonesian copy uses "Anda" (formal), not "kamu" (casual).**

---

## 9. UTILITIES

```ts
// lib/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// lib/format.ts
export const formatIDR = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
```

---

## 10. BUILD ORDER

Tackle in this order to keep work shippable at each step:

1. `tailwind.config.ts` + `globals.css` + `layout.tsx` with fonts
2. `<Nav />`, `<Footer />`, `<Container />`, `<Button />`, `<Eyebrow />`, `<BatteryIllo />`
3. `app/page.tsx` (home) — static, no DB
4. `app/tentang/page.tsx` — static
5. `app/produk/page.tsx` — Prisma read + `<FilterPanel />` + `<ProductGrid />`
6. `<ProductModal />` — client component
7. `app/admin/login/page.tsx` + `/api/auth/login`
8. `app/admin/dashboard/page.tsx` — list + add-product form

When done, the site should match the HTML mockup precisely in spacing, typography, and color application. The mockup file is `index.html` in the same project — refer to its rendered output for any visual ambiguity.
