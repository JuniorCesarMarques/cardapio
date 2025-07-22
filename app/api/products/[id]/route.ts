import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {

  const {id} = await params;

  if(!id) {
    return new Response(JSON.stringify({ error: "ID é obrigatório" }), {
      status: 400,
    });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: { select: { name: true } }
      }
    });

    console.log("PRODUTO VINDO DO BACKEND", product)

    if (!product) {
      return new NextResponse("Produto não encontrado", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[GET_PRODUCT]", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: body.id },
      data: {
        name: body.name,
        type: body.type,
        description: body.description,
        price: Number(body.price),
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
        barcode: body.barcode,
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("[UPDATE_PRODUCT]", error);
    return new NextResponse("Erro ao atualizar produto", { status: 500 });
  }
}



