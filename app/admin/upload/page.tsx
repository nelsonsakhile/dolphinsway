'use client';

import { useRef, useState } from 'react';
import { useProductStore, Product } from '@/lib/store/productStore';
import { Upload, X, Plus } from 'lucide-react';
import { createProduct } from '@/app/actions/product';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

const categories: Product['category'][] = [
  'Shoes',
  "Men's Clothing",
  "Women's Clothing",
  'iPhones',
  'Electronic Accessories',
];

const defaultVariants = {
  'Shoes': ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11', 'Size 12'],
  "Men's Clothing": ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  "Women's Clothing": ['XS', 'S', 'M', 'L', 'XL'],
  'iPhones': ['128GB', '256GB', '512GB', '1TB'],
  'Electronic Accessories': ['Black', 'Silver', 'White', 'Gold'],
};

export default function UploadProductPage() {
  const addProduct = useProductStore((state) => state.addProduct);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Shoes' as Product['category'],
    price: 0,
    compareAtPrice: 0,
    stock: 0,
    description: '',
    image: 'https://via.placeholder.com/500x500?text=Product+Image',
    variants: [] as string[],
    badge: '' as 'New Drop' | 'Low Stock' | 'Sale' | '',
  });

  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [newVariant, setNewVariant] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' || name === 'compareAtPrice' 
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Product['category'];
    setFormData((prev) => ({
      ...prev,
      category: newCategory,
    }));
    setSelectedVariants(defaultVariants[newCategory] || []);
  };

  const addVariant = () => {
    if (newVariant.trim() && !selectedVariants.includes(newVariant)) {
      setSelectedVariants([...selectedVariants, newVariant]);
      setNewVariant('');
    }
  };

  const removeVariant = (variant: string) => {
    setSelectedVariants(selectedVariants.filter((v) => v !== variant));
  };

  const processImageFile = async (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      alert('Please upload a PNG, JPG, or WEBP image.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert('Image must be 10MB or smaller.');
      return;
    }

    setIsUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setFormData((prev) => ({
        ...prev,
        image: result.image || result.url,
      }));
    } catch (error: unknown) {
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void processImageFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void processImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productPayload = {
        name: formData.name || 'Untitled Product',
        category: formData.category,
        price: formData.price,
        compareAtPrice: formData.compareAtPrice || undefined,
        stock: formData.stock,
        description: formData.description,
        image: formData.image,
        variants: selectedVariants,
        badge: (formData.badge as 'New Drop' | 'Low Stock' | 'Sale') || undefined,
      };

      const result = await createProduct(productPayload);

      if (result.success) {
        // Sync local client-side state
        const savedProduct: Product = {
          id: result.data._id,
          name: result.data.name,
          category: result.data.category,
          price: result.data.price,
          compareAtPrice: result.data.compareAtPrice,
          stock: result.data.stock,
          description: result.data.description,
          image: result.data.image,
          variants: result.data.variants,
          badge: result.data.badge,
          createdAt: result.data.createdAt,
        };
        addProduct(savedProduct);

        // Reset form
        setFormData({
          name: '',
          category: 'Shoes',
          price: 0,
          compareAtPrice: 0,
          stock: 0,
          description: '',
          image: 'https://via.placeholder.com/500x500?text=Product+Image',
          variants: [],
          badge: '',
        });
        setSelectedVariants(defaultVariants['Shoes']);
        alert('✓ Product added successfully to MongoDB!');
      } else {
        alert('❌ Error adding product: ' + result.error);
      }
    } catch (error: any) {
      alert('❌ Unexpected error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload New Product</h1>
        <p className="text-text-secondary">
          Add a new product to your inventory
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="input-dark"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="input-dark"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-dark-card">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="input-dark"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Compare-At Price</label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice || ''}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="input-dark"
                  step="0.01"
                />
              </div>
            </div>

            {/* Stock & Badge */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ''}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="input-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Badge</label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  className="input-dark"
                >
                  <option value="">None</option>
                  <option value="New Drop">New Drop</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description..."
                rows={4}
                className="input-dark resize-none"
              />
            </div>

            {/* Variants */}
            <div>
              <label className="block text-sm font-semibold mb-3">Product Variants</label>
              <p className="text-text-secondary text-sm mb-3">
                Default variants for {formData.category}:
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newVariant}
                  onChange={(e) => setNewVariant(e.target.value)}
                  placeholder="Add custom variant"
                  className="input-dark flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())}
                />
                <button
                  type="button"
                  onClick={addVariant}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {/* Selected Variants */}
              <div className="flex flex-wrap gap-2">
                {selectedVariants.map((variant) => (
                  <div
                    key={variant}
                    className="flex items-center gap-2 bg-accent-blue/10 border border-accent-blue px-3 py-2 rounded-full"
                  >
                    <span className="text-sm text-accent-blue">{variant}</span>
                    <button
                      type="button"
                      onClick={() => removeVariant(variant)}
                      className="text-accent-blue hover:text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Preview & Upload */}
          <div className="lg:col-span-1">
            <div className="card-dark sticky top-4">
              <h3 className="font-semibold mb-4">Product Image</h3>

              {/* Image Preview */}
              <div className="mb-4">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full aspect-square object-cover rounded-lg border border-dark-border"
                />
              </div>

              {/* Upload Area */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-accent-blue bg-accent-blue/10'
                    : 'border-dark-border hover:border-accent-blue'
                } ${isUploadingImage ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Upload className="w-8 h-8 text-accent-blue mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  {isUploadingImage ? 'Uploading image...' : 'Drag and drop or click to upload'}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>

              {/* Form Summary */}
              <div className="mt-6 p-4 bg-dark-bg rounded-lg text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Category:</span>
                  <span className="font-semibold">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Price:</span>
                  <span className="font-semibold text-accent-blue">
                    R{formData.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Stock:</span>
                  <span className="font-semibold">{formData.stock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Variants:</span>
                  <span className="font-semibold">{selectedVariants.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex gap-4">
          <button type="submit" className="btn-primary px-12" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Product'}
          </button>
          <button type="reset" className="btn-secondary px-12" disabled={isSubmitting}>
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
