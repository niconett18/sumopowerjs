import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '../../../../../lib/admin-auth';
import { getProductById, updateProduct, deleteProduct } from '../../../../../lib/db';

interface RouteContext { params: Promise<{ id: string }> }

// GET /api/admin/products/[id]
export async function GET(req: NextRequest, ctx: RouteContext) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await ctx.params;
  const product = getProductById(id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ product });
}

// PATCH /api/admin/products/[id]
export async function PATCH(req: NextRequest, ctx: RouteContext) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json();

  // Coerce numeric fields if provided
  if (body.price    !== undefined) body.price  = Number(body.price)  || 0;
  if (body.mAh      !== undefined) body.mAh    = Number(body.mAh)    || 0;
  if (body.stock    !== undefined) body.stock   = Number(body.stock)  || 0;

  const product = updateProduct(id, body);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ product });
}

// DELETE /api/admin/products/[id]
export async function DELETE(req: NextRequest, ctx: RouteContext) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await ctx.params;
  const ok = deleteProduct(id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
