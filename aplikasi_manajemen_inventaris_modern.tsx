import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Eye, RefreshCw, Layers, Package, 
  TrendingUp, AlertTriangle, CheckCircle, ArrowUpDown, Filter, 
  X, Check, Sparkles, Heart, Tag, Download, Upload, Wand2, PlusCircle, MinusCircle
} from 'lucide-react';

// Extended Popular Oriflame Bestseller Catalog Dataset
const POPULAR_ORIFLAME_CATALOG = [
  {
    id: 'ORI-101',
    name: 'Giordani Gold MasterCreation Foundation SPF 18',
    category: 'Makeup',
    sku: 'ORI-35235',
    quantity: 24,
    price: 349000,
    status: 'In Stock',
    minStock: 5,
    lastUpdated: '2026-10-24'
  },
  {
    id: 'ORI-102',
    name: 'Tender Care Protecting Balm Original',
    category: 'Skincare',
    sku: 'ORI-12760',
    quantity: 48,
    price: 49900,
    status: 'In Stock',
    minStock: 10,
    lastUpdated: '2026-10-26'
  },
  {
    id: 'ORI-103',
    name: 'NovAge Ecollagen Wrinkle Power Serum',
    category: 'Skincare',
    sku: 'ORI-33980',
    quantity: 3,
    price: 599000,
    status: 'Low Stock',
    minStock: 5,
    lastUpdated: '2026-10-20'
  },
  {
    id: 'ORI-104',
    name: 'Possess Absolute Eau de Parfum',
    category: 'Fragrance',
    sku: 'ORI-42968',
    quantity: 18,
    price: 679000,
    status: 'In Stock',
    minStock: 4,
    lastUpdated: '2026-10-27'
  },
  {
    id: 'ORI-105',
    name: 'Love Nature Organic Tea Tree & Lime Cleanser',
    category: 'Personal Care',
    sku: 'ORI-34841',
    quantity: 0,
    price: 89900,
    status: 'Out of Stock',
    minStock: 8,
    lastUpdated: '2026-10-22'
  },
  {
    id: 'ORI-106',
    name: 'Giordani Gold Bronzing Pearls - Subtle Glow',
    category: 'Makeup',
    sku: 'ORI-34545',
    quantity: 14,
    price: 329000,
    status: 'In Stock',
    minStock: 5,
    lastUpdated: '2026-10-25'
  },
  {
    id: 'ORI-107',
    name: 'Eclat Femme Eau de Toilette',
    category: 'Fragrance',
    sku: 'ORI-42507',
    quantity: 8,
    price: 549000,
    status: 'In Stock',
    minStock: 4,
    lastUpdated: '2026-10-21'
  },
  {
    id: 'ORI-108',
    name: 'NovAge Ultimate Lift Contour Define Day Cream',
    category: 'Skincare',
    sku: 'ORI-34510',
    quantity: 4,
    price: 529000,
    status: 'Low Stock',
    minStock: 5,
    lastUpdated: '2026-10-23'
  },
  {
    id: 'ORI-109',
    name: 'Milk & Honey Gold Moisturising Hand Cream',
    category: 'Personal Care',
    sku: 'ORI-31605',
    quantity: 35,
    price: 119000,
    status: 'In Stock',
    minStock: 10,
    lastUpdated: '2026-10-26'
  },
  {
    id: 'ORI-110',
    name: 'THE ONE Wonder Lash 5-in-1 Mascara Waterproof',
    category: 'Makeup',
    sku: 'ORI-42119',
    quantity: 20,
    price: 149000,
    status: 'In Stock',
    minStock: 6,
    lastUpdated: '2026-10-24'
  },
  {
    id: 'ORI-111',
    name: 'Optimals Age Revive Serum',
    category: 'Skincare',
    sku: 'ORI-42551',
    quantity: 2,
    price: 299000,
    status: 'Low Stock',
    minStock: 5,
    lastUpdated: '2026-10-27'
  },
  {
    id: 'ORI-112',
    name: 'Wellosophy Omega 3 Food Supplement',
    category: 'Wellness',
    sku: 'ORI-29705',
    quantity: 15,
    price: 379000,
    status: 'In Stock',
    minStock: 5,
    lastUpdated: '2026-10-19'
  },
  {
    id: 'ORI-113',
    name: 'Amber Elixir Eau de Parfum',
    category: 'Fragrance',
    sku: 'ORI-11367',
    quantity: 11,
    price: 599000,
    status: 'In Stock',
    minStock: 3,
    lastUpdated: '2026-10-26'
  },
  {
    id: 'ORI-114',
    name: 'Love Nature Coconut & Oat Hair Mask',
    category: 'Personal Care',
    sku: 'ORI-41292',
    quantity: 28,
    price: 79900,
    status: 'In Stock',
    minStock: 8,
    lastUpdated: '2026-10-22'
  },
  {
    id: 'ORI-115',
    name: 'THE ONE Colour Stylist Ultimate Lipstick - Rose',
    category: 'Makeup',
    sku: 'ORI-37718',
    quantity: 0,
    price: 139000,
    status: 'Out of Stock',
    minStock: 5,
    lastUpdated: '2026-10-28'
  },
  {
    id: 'ORI-116',
    name: 'Eleo Protecting Hair Oil with Argan & Rose',
    category: 'Personal Care',
    sku: 'ORI-38601',
    quantity: 9,
    price: 249000,
    status: 'In Stock',
    minStock: 4,
    lastUpdated: '2026-10-25'
  }
];

const INITIAL_ITEMS = POPULAR_ORIFLAME_CATALOG.slice(0, 5);
const CATEGORIES = ['All', 'Skincare', 'Makeup', 'Fragrance', 'Personal Care', 'Wellness', 'Accessories'];

// Utility to format number to Rupiah IDR currency
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

export default function App() {
  // Persistence with LocalStorage
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('oriflame_inventory_data');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    localStorage.setItem('oriflame_inventory_data', JSON.stringify(items));
  }, [items]);

  // Filters & State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Skincare',
    sku: '',
    quantity: 0,
    price: 0,
    minStock: 5
  });

  // Calculate dynamic status based on quantity and minStock
  const calculateStatus = (qty, minQty) => {
    if (Number(qty) <= 0) return 'Out of Stock';
    if (Number(qty) <= Number(minQty)) return 'Low Stock';
    return 'In Stock';
  };

  // Seed / Load Popular Catalog Data
  const handleLoadPopularCatalog = (mode = 'replace') => {
    const today = new Date().toISOString().split('T')[0];
    const catalogWithDates = POPULAR_ORIFLAME_CATALOG.map(item => ({
      ...item,
      lastUpdated: today
    }));

    if (mode === 'replace') {
      setItems(catalogWithDates);
      showToast('Katalog populer Oriflame berhasil dimuat (16 Produk)!');
    } else {
      // Merge unique by SKU/ID
      const existingSkus = new Set(items.map(i => i.sku));
      const newItems = catalogWithDates.filter(i => !existingSkus.has(i.sku));
      setItems([...items, ...newItems]);
      showToast(`${newItems.length} produk baru berhasil digabungkan ke inventaris!`);
    }
    setIsSeedModalOpen(false);
  };

  // Quick Stock Adjustment (+1 / -1)
  const handleAdjustStock = (item, delta) => {
    const newQty = Math.max(0, item.quantity + delta);
    const newStatus = calculateStatus(newQty, item.minStock || 5);
    const today = new Date().toISOString().split('T')[0];

    setItems(items.map(i => 
      i.id === item.id 
        ? { ...i, quantity: newQty, status: newStatus, lastUpdated: today } 
        : i
    ));
    showToast(`Stok ${item.name} diperbarui menjadi ${newQty} unit.`, 'info');
  };

  // Export Data to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Oriflame_Inventory_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Data inventaris berhasil diunduh dalam format JSON.');
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setSelectedItem(null);
    setFormData({
      name: '',
      category: 'Skincare',
      sku: `ORI-${Math.floor(10000 + Math.random() * 90000)}`,
      quantity: 10,
      price: 149000,
      minStock: 5
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      sku: item.sku,
      quantity: item.quantity,
      price: item.price,
      minStock: item.minStock || 5
    });
    setIsFormModalOpen(true);
  };

  // Open View Details
  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  // Save (Create or Update)
  const handleSaveItem = (e) => {
    e.preventDefault();
    const computedStatus = calculateStatus(formData.quantity, formData.minStock);
    const today = new Date().toISOString().split('T')[0];

    if (selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem.id 
          ? { ...item, ...formData, quantity: Number(formData.quantity), price: Number(formData.price), status: computedStatus, lastUpdated: today } 
          : item
      ));
      showToast('Data produk berhasil diperbarui!');
    } else {
      const newItem = {
        id: `ORI-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        status: computedStatus,
        lastUpdated: today
      };
      setItems([newItem, ...items]);
      showToast('Produk Oriflame baru berhasil ditambahkan!');
    }
    setIsFormModalOpen(false);
  };

  // Delete Action
  const handleConfirmDelete = () => {
    if (selectedItem) {
      setItems(items.filter(item => item.id !== selectedItem.id));
      setIsDeleteModalOpen(false);
      showToast(`Produk ${selectedItem.name} telah dihapus.`, 'warning');
      setSelectedItem(null);
    }
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        
        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [items, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);

  // Statistics Summary
  const stats = useMemo(() => {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const lowStockCount = items.filter(item => item.status === 'Low Stock').length;
    const outOfStockCount = items.filter(item => item.status === 'Out of Stock').length;

    return { totalItems, totalValue, lowStockCount, outOfStockCount };
  }, [items]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle className="w-3.5 h-3.5" /> Tersedia</span>;
      case 'Low Stock':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20"><AlertTriangle className="w-3.5 h-3.5" /> Stok Menipis</span>;
      case 'Out of Stock':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20"><X className="w-3.5 h-3.5" /> Stok Habis</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-500 selection:text-white pb-12">
      
      {/* Toast Notification Floating */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 border border-pink-500/30 text-slate-100 rounded-xl shadow-2xl animate-bounce">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header Banner / Navigation */}
      <header className="sticky top-0 z-30 border-b border-pink-900/30 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-rose-600 via-pink-500 to-purple-600 rounded-xl shadow-lg shadow-pink-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-300 via-purple-200 to-rose-400 bg-clip-text text-transparent">
                Oriflame Inventory
              </h1>
              <p className="text-xs text-slate-400">Manajemen Stok & Inventaris Kosmetik Realtime</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Load Popular Catalog Button */}
            <button
              onClick={() => setIsSeedModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 text-pink-200 border border-pink-500/40 font-medium text-xs sm:text-sm rounded-xl transition duration-200 shadow-md active:scale-95"
            >
              <Wand2 className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>Muat Katalog Populer</span>
            </button>

            {/* Export JSON Button */}
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs sm:text-sm rounded-xl transition"
              title="Ekspor Data JSON"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Ekspor</span>
            </button>

            {/* Add Product Button */}
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-lg shadow-rose-600/30 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Dynamic Analytics / Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-inner flex items-center justify-between group hover:border-pink-500/40 transition">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Produk</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stats.totalItems}</h3>
              <p className="text-xs text-pink-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Katalog Aktif
              </p>
            </div>
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl border border-pink-500/20 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-inner flex items-center justify-between group hover:border-emerald-500/40 transition">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nilai Total Inventaris</p>
              <h3 className="text-xl font-bold text-emerald-400 mt-1">
                {formatRupiah(stats.totalValue)}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Estimasi nilai aset stok (IDR)</p>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-inner flex items-center justify-between group hover:border-amber-500/40 transition">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Stok Menipis</p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1">{stats.lowStockCount}</h3>
              <p className="text-xs text-amber-500/80 mt-1">Perlu Restock Segera</p>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-inner flex items-center justify-between group hover:border-rose-500/40 transition">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Stok Habis</p>
              <h3 className="text-2xl font-bold text-rose-400 mt-1">{stats.outOfStockCount}</h3>
              <p className="text-xs text-rose-500/80 mt-1">Tidak tersedia</p>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 group-hover:scale-110 transition-transform">
              <X className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Search, Filter & Actions Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari produk atau SKU Oriflame..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              
              {/* Category Filter */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300">
                <Tag className="w-4 h-4 text-pink-400" />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-2"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-900 text-slate-200">{cat}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300">
                <Filter className="w-4 h-4 text-pink-400" />
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-2"
                >
                  <option value="All" className="bg-slate-900 text-slate-200">Semua Status</option>
                  <option value="In Stock" className="bg-slate-900 text-slate-200">Tersedia</option>
                  <option value="Low Stock" className="bg-slate-900 text-slate-200">Stok Menipis</option>
                  <option value="Out of Stock" className="bg-slate-900 text-slate-200">Stok Habis</option>
                </select>
              </div>

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-sm rounded-xl transition"
                title="Urutkan Data"
              >
                <ArrowUpDown className="w-4 h-4 text-rose-400" />
                <span className="capitalize">{sortOrder}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table View */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Produk Oriflame</th>
                  <th className="py-4 px-6 font-semibold">Kategori</th>
                  <th className="py-4 px-6 font-semibold">Kode SKU</th>
                  <th className="py-4 px-6 font-semibold text-center">Atur Stok</th>
                  <th className="py-4 px-6 font-semibold">Harga (Rupiah)</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-4 px-6 font-medium text-slate-100 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.id}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        <span className="px-2.5 py-1 bg-slate-800 text-pink-300 rounded-md text-xs border border-pink-900/40">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">{item.sku}</td>
                      
                      {/* Interactive Stock Adjuster (+ / -) */}
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => handleAdjustStock(item, -1)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded transition"
                            title="Kurangi Stok"
                          >
                            <MinusCircle className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-slate-100">{item.quantity}</span>
                          <button
                            onClick={() => handleAdjustStock(item, 1)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 rounded transition"
                            title="Tambah Stok"
                          >
                            <PlusCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-medium text-emerald-400">
                        {formatRupiah(item.price)}
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Quick View */}
                          <button
                            onClick={() => handleOpenDetail(item)}
                            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-pink-400 rounded-lg transition"
                            title="Detail Produk"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Action */}
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 rounded-lg transition"
                            title="Edit Produk"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete Action */}
                          <button
                            onClick={() => handleOpenDelete(item)}
                            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-500">
                      <Package className="w-12 h-12 mx-auto text-slate-600 mb-3 stroke-[1.5]" />
                      <p className="text-base font-medium text-slate-400">Tidak ada produk ditemukan</p>
                      <p className="text-xs text-slate-600 mt-1 mb-4">Sesuaikan pencarian atau muat katalog populer Oriflame.</p>
                      <button
                        onClick={() => setIsSeedModalOpen(true)}
                        className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 rounded-xl text-xs font-medium transition"
                      >
                        Muat 16+ Produk Populer
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
            <div>
              Menampilkan <span className="text-slate-200 font-semibold">{filteredItems.length}</span> dari <span className="text-slate-200 font-semibold">{items.length}</span> total produk Oriflame.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span>Terhubung dengan LocalStorage Database</span>
            </div>
          </div>
        </div>

      </main>

      {/* LOAD POPULAR CATALOG MODAL */}
      {isSeedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-pink-400" /> Muat Katalog Populer Oriflame
              </h3>
              <button 
                onClick={() => setIsSeedModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-300">
                Fitur ini akan memasukkan **16 produk *bestseller* Oriflame** (NovAge, Giordani Gold, Tender Care, Possess, Eclat, dll.) lengkap dengan harga Rupiah & kategori.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => handleLoadPopularCatalog('replace')}
                  className="w-full text-left p-4 rounded-xl border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 transition group"
                >
                  <div className="font-semibold text-pink-300 group-hover:text-pink-200">Ganti Semua Data (Reset)</div>
                  <div className="text-xs text-slate-400 mt-1">Mengganti seluruh isi daftar inventaris saat ini dengan 16 katalog populer.</div>
                </button>

                <button
                  onClick={() => handleLoadPopularCatalog('merge')}
                  className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800/60 transition group"
                >
                  <div className="font-semibold text-slate-200 group-hover:text-white">Gabungkan Data (Merge)</div>
                  <div className="text-xs text-slate-400 mt-1">Menambahkan produk populer ke dalam inventaris yang sudah ada tanpa menghapus data lama.</div>
                </button>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsSeedModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-all">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {selectedItem ? <Edit2 className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5 text-pink-400" />}
                {selectedItem ? 'Edit Produk Oriflame' : 'Tambah Produk Oriflame'}
              </h3>
              <button 
                onClick={() => setIsFormModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Nama Produk Oriflame</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Giordani Gold Foundation"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Kategori Produk</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Kode SKU</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Jumlah Stok</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Batas Minimal</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Harga (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-500">
                  Pratinjau Harga: <span className="text-emerald-400 font-semibold">{formatRupiah(formData.price || 0)}</span>
                </p>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-rose-600/30"
                >
                  {selectedItem ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ITEM DETAIL MODAL */}
      {isDetailModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-pink-400" /> Detail Produk Oriflame
              </h3>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{selectedItem.name}</h2>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">ID: {selectedItem.id}</p>
                </div>
                {getStatusBadge(selectedItem.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800/60">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Kategori</span>
                  <span className="text-sm font-medium text-pink-300">{selectedItem.category}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Kode SKU</span>
                  <span className="text-sm font-mono text-slate-200">{selectedItem.sku}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Jumlah Stok</span>
                  <span className="text-base font-bold text-slate-100">{selectedItem.quantity} Unit</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block">Harga Satuan (Rp)</span>
                  <span className="text-base font-bold text-emerald-400">{formatRupiah(selectedItem.price)}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span>Terakhir Diperbarui:</span>
                <span className="text-slate-200 font-medium">{selectedItem.lastUpdated}</span>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Hapus Produk Ini?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Apakah Anda yakin ingin menghapus produk <span className="text-slate-200 font-semibold">{selectedItem.name}</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-rose-600/30"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}