import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please select a category.'],
      enum: ['Shoes', "Men's Clothing", "Women's Clothing", 'iPhones', 'Electronic Accessories'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price.'],
      min: [0, 'Price cannot be negative.'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare-at price cannot be negative.'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity.'],
      default: 0,
      min: [0, 'Stock cannot be negative.'],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/500x500?text=Product+Image',
    },
    variants: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      enum: ['New Drop', 'Low Stock', 'Sale', ''],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
