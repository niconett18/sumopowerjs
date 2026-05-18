import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/admin-auth';
import { getAllProducts, createProduct } from '../../../../lib/db';

// GET /api/admin/products
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const brand  = searchParams.get('brand')?.toLowerCase();
  const q      = searchParams.get('q')?.toLowerCase();

  let products = getAllProducts();

  if (brand) products = products.filter((p) => p.brand.toLowerCase() === brand);
  if (q) {
    products = products.filter((p) =>
      [p.nameId, p.brand, p.code, p.model].some((f) => (f ?? '').toLowerCase().includes(q))
    );
  }

  return NextResponse.json({ products });
}

// POST /api/admin/products
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const required = ['nameId', 'brand'];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Field "${field}" is required` }, { status: 400 });
    }
  }

  const product = createProduct({
    brand:                body.brand,
    nameId:               body.nameId,
    model:                body.model ?? body.nameId,
    code:                 body.code ?? '',
    mAh:                  Number(body.mAh) || 0,
    voltage:              body.voltage ?? '',
    limitedChargeVoltage: body.limitedChargeVoltage ?? '',
    compatibleFor:        body.compatibleFor ?? '',
    dimension:            body.dimension ?? '—',
    type:                 body.type ?? 'Li-ion',
    warranty:             body.warranty ?? '12 bulan',
    origin:               body.origin ?? 'Original Sumo',
    price:                Number(body.price) || 0,
    stock:                Number(body.stock) || 1,
    image:                body.image ?? '',
    shopeeUrl:            body.shopeeUrl ?? '',
    active:               body.active !== false,
    featured:             body.featured === true,
  });

  return NextResponse.json({ product }, { status: 201 });
}
