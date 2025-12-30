// Mock Data for Professionals
const professionals = [
    {
        id: 1,
        name: "محمد أحمد",
        specialty: "سباك",
        rating: 4.8,
        reviewsCount: 124,
        price: "50 - 150",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "خبرة 10 سنوات في صيانة السباكة المنزلية وتركيب الشبكات الحديثة. دقيق في المواعيد.",
        location: "الرياض، حي الملز",
        reviews: [
            { user: "خالد ع.", comment: "ممتاز جداً وسريع في العمل", rating: 5 },
            { user: "سارة م.", comment: "شغل نظيف وأخلاق عالية", rating: 4.5 }
        ]
    },
    {
        id: 2,
        name: "علي حسن",
        specialty: "كهربائي",
        rating: 4.5,
        reviewsCount: 89,
        price: "70 - 200",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        bio: "متخصص في التمديدات الكهربائية الذكية وصيانة الأعطال المستعصية. شهادة معتمدة.",
        location: "الرياض، حي العليا",
        reviews: [
            { user: "فهد س.", comment: "حل المشكلة بسرعة", rating: 4 }
        ]
    },
    {
        id: 3,
        name: "يوسف العمري",
        specialty: "نجار",
        rating: 4.9,
        reviewsCount: 210,
        price: "100 - 500",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        bio: "تصميم وتنفيذ غرف النوم والمطابخ، صيانة الأبواب والشبابيك بدقة متناهية.",
        location: "جدة، حي الروضة",
        reviews: [
            { user: "أميرة ك.", comment: "فنان بمعنى الكلمة", rating: 5 },
            { user: "عمر ج.", comment: "أسعار مناسبة جداً", rating: 5 }
        ]
    },
    {
        id: 4,
        name: "سعيد القحطاني",
        specialty: "تكييف",
        rating: 4.3,
        reviewsCount: 56,
        price: "80 - 250",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        bio: "غسيل وصيانة مكيفات سبليت وشباك. تعبئة فريون أصلي.",
        location: "الدمام، حي الشاطئ",
        reviews: [
            { user: "نايف ر.", comment: "تأخر قليلاً لكن شغله ممتاز", rating: 4 }
        ]
    },
    {
        id: 5,
        name: "إبراهيم السيد",
        specialty: "سباك",
        rating: 4.6,
        reviewsCount: 42,
        price: "60 - 180",
        image: "https://randomuser.me/api/portraits/men/64.jpg",
        bio: "معالجة التسريبات وتركيب الأدوات الصحية. متوفر للطوارئ.",
        location: "الرياض، حي النسيم",
        reviews: []
    }
];

let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProfessionals();
    
    // Close modal on backdrop click
    document.getElementById('modalBackdrop').addEventListener('click', (e) => {
        if (e.target.id === 'modalBackdrop') {
            closeModal();
        }
    });
});

// Render Cards Function
function renderProfessionals(filter = 'all', searchQuery = '') {
    const grid = document.getElementById('professionalsGrid');
    const emptyState = document.getElementById('emptyState');
    
    grid.innerHTML = '';
    
    const filteredData = professionals.filter(pro => {
        const matchesCategory = filter === 'all' || pro.specialty === filter;
        const matchesSearch = pro.name.includes(searchQuery) || 
                              pro.specialty.includes(searchQuery) || 
                              pro.bio.includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filteredData.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    filteredData.forEach(pro => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col';
        card.innerHTML = `
            <div class="relative h-32 bg-gray-100">
               <div class="absolute inset-0 bg-indigo-50"></div>
               <div class="absolute -bottom-10 right-4">
                    <img src="${pro.image}" alt="${pro.name}" class="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover">
               </div>
               <div class="absolute top-4 left-4 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold text-indigo-600">
                    ${pro.specialty}
               </div>
            </div>
            <div class="pt-12 px-6 pb-6 flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900">${pro.name}</h3>
                        <p class="text-gray-500 text-sm flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            ${pro.location}
                        </p>
                    </div>
                    <div class="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                        <span class="text-yellow-500 font-bold ml-1">★</span>
                        <span class="text-gray-700 font-bold text-sm">${pro.rating}</span>
                    </div>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">${pro.bio}</p>
                
                <div class="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                    <div>
                        <span class="text-xs text-gray-400 block">سعر الزيارة</span>
                        <span class="font-bold text-indigo-600">${pro.price} ر.س</span>
                    </div>
                    <button onclick="openProfile(${pro.id})" class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition">
                        عرض الملف
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Handlers
function setCategory(category) {
    currentFilter = category;
    // Update UI active state
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.innerText.includes(category) || (category === 'all' && btn.innerText.includes('الكل'))) {
            btn.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-50');
            btn.classList.add('bg-indigo-600', 'text-white');
        } else {
            btn.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-50');
            btn.classList.remove('bg-indigo-600', 'text-white');
        }
    });
    
    // Apply filter
    const searchQuery = document.getElementById('searchInput').value;
    renderProfessionals(currentFilter, searchQuery);
}

function filterProfessionals() {
    const searchQuery = document.getElementById('searchInput').value;
    renderProfessionals(currentFilter, searchQuery);
}

// Modal Functions
function openProfile(id) {
    const pro = professionals.find(p => p.id === id);
    if (!pro) return;

    const modalContent = document.getElementById('modalContent');
    const reviewsHtml = pro.reviews.length > 0 
        ? pro.reviews.map(r => `
            <div class="bg-gray-50 p-3 rounded-lg mb-2">
                <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-sm">${r.user}</span>
                    <div class="text-yellow-500 text-xs">${'★'.repeat(Math.floor(r.rating))}</div>
                </div>
                <p class="text-gray-600 text-sm">${r.comment}</p>
            </div>
          `).join('')
        : '<p class="text-gray-400 text-sm">لا توجد تقييمات بعد.</p>';

    modalContent.innerHTML = `
        <div class="p-0">
            <div class="bg-indigo-600 h-24 relative">
                <button onclick="closeModal()" class="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-1 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="px-6 -mt-12 mb-6 flex justify-between items-end">
                <img src="${pro.image}" class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-white">
                <div class="mb-2 text-left">
                    <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">${pro.specialty}</span>
                </div>
            </div>
            
            <div class="px-6 pb-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-1">${pro.name}</h2>
                <p class="text-gray-500 text-sm mb-4 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    ${pro.location}
                </p>
                
                <div class="flex gap-4 mb-6">
                    <div class="text-center bg-gray-50 p-2 rounded-lg flex-1">
                        <div class="font-bold text-gray-900">${pro.rating}</div>
                        <div class="text-xs text-gray-500">التقييم العام</div>
                    </div>
                    <div class="text-center bg-gray-50 p-2 rounded-lg flex-1">
                        <div class="font-bold text-gray-900">${pro.reviewsCount}</div>
                        <div class="text-xs text-gray-500">مهمة مكتملة</div>
                    </div>
                    <div class="text-center bg-gray-50 p-2 rounded-lg flex-1">
                        <div class="font-bold text-gray-900">${pro.price}</div>
                        <div class="text-xs text-gray-500">ريال / زيارة</div>
                    </div>
                </div>

                <h3 class="font-bold text-lg mb-2">عن الحرفي</h3>
                <p class="text-gray-600 mb-6 leading-relaxed text-sm">${pro.bio}</p>

                <h3 class="font-bold text-lg mb-3">آراء العملاء</h3>
                <div class="max-h-40 overflow-y-auto mb-6 pr-1 custom-scroll">
                    ${reviewsHtml}
                </div>

                <button onclick="showBookingForm(${pro.id})" class="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg transform active:scale-95">
                    حجز موعد الآن
                </button>
            </div>
        </div>
    `;
    
    toggleModal(true);
}

function showBookingForm(id) {
    const pro = professionals.find(p => p.id === id);
    const modalContent = document.getElementById('modalContent');
    
    // Today's date for min attribute
    const today = new Date().toISOString().split('T')[0];

    modalContent.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">حجز موعد مع ${pro.name}</h2>
                <button onclick="openProfile(${pro.id})" class="text-gray-400 hover:text-gray-600">
                    عودة
                </button>
            </div>
            
            <form onsubmit="handleBooking(event)" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">اختر التاريخ</label>
                    <input type="date" required min="${today}" class="w-full border-gray-300 rounded-lg shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">من الساعة</label>
                        <select class="w-full border-gray-300 rounded-lg shadow-sm border p-2">
                            <option>09:00 ص</option>
                            <option>10:00 ص</option>
                            <option>04:00 م</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">نوع المشكلة</label>
                        <select class="w-full border-gray-300 rounded-lg shadow-sm border p-2">
                            <option>صيانة عامة</option>
                            <option>حالة طارئة</option>
                            <option>تركيب جديد</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">وصف المشكلة (اختياري)</label>
                    <textarea rows="3" class="w-full border-gray-300 rounded-lg shadow-sm border p-2" placeholder="اشرح المشكلة باختصار..."></textarea>
                </div>

                <div class="pt-4">
                    <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg">
                        تأكيد الحجز
                    </button>
                </div>
            </form>
        </div>
    `;
}

function handleBooking(e) {
    e.preventDefault();
    // Simulate API call
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    
    btn.disabled = true;
    btn.innerText = 'جاري الحجز...';
    
    setTimeout(() => {
        closeModal();
        showToast('تم إرسال طلب الحجز بنجاح! سيتواصل معك الحرفي قريباً.');
    }, 1500);
}

// UI Helpers
function toggleModal(show) {
    const backdrop = document.getElementById('modalBackdrop');
    const content = document.getElementById('modalContent');
    
    if (show) {
        backdrop.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }, 10);
    } else {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            backdrop.classList.add('hidden');
        }, 300);
    }
}

function closeModal() {
    toggleModal(false);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMessage');
    msg.innerText = message;
    
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 4000);
}