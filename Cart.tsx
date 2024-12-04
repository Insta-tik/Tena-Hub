import { Minus, Plus, Trash2, ShoppingBag, Tag, AlertCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    toast.success('Proceeding to checkout...');
    clearCart();
    navigate('/dashboard');
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      } else {
        removeItem(itemId);
      }
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast.success('Item removed from cart');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Shopping Cart</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and update your cart before checkout</p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-neu-base dark:bg-dark-neu-base rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat">
          <ShoppingBag size={48} className="text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add items to your cart to get started</p>
          <button 
            onClick={() => navigate('/dashboard/products')}
            className="px-6 py-2 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.pharmacy}</p>
                      </div>
                      {item.prescription && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Prescription
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1 rounded-lg bg-neu-base dark:bg-dark-neu-base shadow-neu-flat-sm dark:shadow-dark-neu-flat-sm hover:shadow-neu-pressed-sm dark:hover:shadow-dark-neu-pressed-sm transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-neu-base dark:bg-dark-neu-base rounded-2xl p-6 shadow-neu-flat dark:shadow-dark-neu-flat">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-neu-base dark:bg-dark-neu-base rounded-xl shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-all text-indigo-600 dark:text-indigo-400"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Prescription Notice */}
            {items.some(item => item.prescription) && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 dark:text-yellow-400 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Prescription Required</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Some items in your cart require a valid prescription. Please upload your prescription during checkout.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};