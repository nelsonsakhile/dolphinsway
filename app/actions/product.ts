'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { revalidatePath } from 'next/cache';

interface ProductInput {
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  description?: string;
  image?: string;
  variants?: string[];
  badge?: string;
}

export async function createProduct(data: ProductInput) {
  try {
    await dbConnect();

    // Input Validation
    if (!data.name || data.name.trim() === '') {
      return { success: false, error: 'Product name is required.' };
    }
    if (!data.category) {
      return { success: false, error: 'Product category is required.' };
    }

    // Save product to database
    const newProduct = new Product({
      name: data.name.trim(),
      category: data.category,
      price: Number(data.price),
      compareAtPrice: data.compareAtPrice !== undefined ? Number(data.compareAtPrice) : undefined,
      stock: Number(data.stock),
      description: data.description?.trim(),
      image: data.image || 'https://via.placeholder.com/500x500?text=Product+Image',
      variants: data.variants || [],
      badge: data.badge || '',
    });

    const savedProduct = await newProduct.save();

    // Revalidate relevant pages so cached components pull new data
    revalidatePath('/admin/inventory');
    revalidatePath('/category/[id]', 'page');
    revalidatePath('/');

    // Serialize MongoDB document safely for Next.js Client Components
    return {
      success: true,
      data: JSON.parse(JSON.stringify(savedProduct)),
    };
  } catch (error: any) {
    console.error('Error creating product in Server Action:', error);
    return {
      success: false,
      error: error.message || 'Failed to create product in database.',
    };
  }
}
