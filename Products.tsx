import { useState } from 'react';
import { Tag, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  pharmacy: string;
  inStock: boolean;
  prescription: boolean;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 9.99,
    pharmacy: 'MediCare Pharmacy',
    inStock: true,
    prescription: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 24.99,
    pharmacy: 'HealthPlus',
    inStock: true,
    prescription: true,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    name: 'Vitamin C 1000mg',
    category: 'Vitamins & Supplements',
    price: 14.99,
    pharmacy: 'City Pharmacy',
    inStock: true,
    prescription: false,
    image: 'https://via.placeholder.com/150'
  }
];

const categories = [
  'All Products',
  'Pain Relief',
  'Antibiotics',
  'Vitamins & Supplements',
  'First Aid',
  'Personal Care'
];

export const Products = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'popularity'>('price');

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      pharmacy: product.pharmacy,
      price: product.price,
      prescription: product.prescription,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  const filteredAndSortedProducts = mockProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.pharmacy.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our wide range of healthcare products</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'name' | 'popularity')}
            className="px-4 py-2 rounded-xl bg-neu-base dark:bg-dark-neu-base shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          >
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
            <option value="popularity">Sort by Popularity</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all whitespace-nowrap 
              ${selectedCategory === category 
                ? 'text-indigo-600 dark:text-indigo-400 shadow-neu-pressed-sm dark:shadow-dark-neu-pressed-sm' 
                : 'text-gray-700 dark:text-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
                  {product.prescription && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Prescription
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{product.pharmacy}</span>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all text-indigo-600 dark:text-indigo-400"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};