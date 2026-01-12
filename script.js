// Данные номеров отеля "Северное Сияние"
const rooms = [
    {
        id: 1,
        name: "Стандарт",
        nameEn: "Standard Room",
        type: "standard",
        description: "Уютный номер в стиле северного минимализма с одной двуспальной кроватью, рабочей зоной и ванной комнатой с подогреваемым полом. Панорамное окно с видом на город.",
        descriptionEn: "Cozy room in northern minimalist style with one double bed, work area and bathroom with heated floor. Panoramic window with city view.",
        price: 8500,
        capacity: 2,
        area: "25 м²",
        features: ["Бесплатный Wi-Fi", "Кондиционер", "Smart TV", "Сейф", "Чайник", "Фен", "Подогреваемый пол", "Вид на город"],
        featuresEn: ["Free Wi-Fi", "Air Conditioning", "Smart TV", "Safe", "Kettle", "Hair Dryer", "Heated Floor", "City View"],
        images: [
            "images/room-standard.jpg",
            "images/room-standard1.jpg",
            "images/room-standard2.jpg"
        ],
        mainImage: "images/room-standard.jpg",
        available: true,
        rating: 4.5
    },
    {
        id: 2,
        name: "Джуниор Сюит",
        nameEn: "Junior Suite",
        type: "junior",
        description: "Просторный сьют с отдельной гостиной зоной, панорамным окном для наблюдения за северным сиянием, мини-баром и угловой ванной. Включен завтрак 'шведский стол'.",
        descriptionEn: "Spacious suite with separate living area, panoramic window for aurora borealis viewing, mini-bar and corner bath. Breakfast buffet included.",
        price: 12500,
        capacity: 2,
        area: "35 м²",
        features: ["Wi-Fi Premium", "Кондиционер", "Большой Smart TV", "Мини-бар", "Гидромассажная ванна", "Сейф", "Завтрак включен", "Халаты и тапочки", "Балкон", "Вид на северное сияние"],
        featuresEn: ["Premium Wi-Fi", "Air Conditioning", "Large Smart TV", "Mini-bar", "Jacuzzi", "Safe", "Breakfast Included", "Bathrobes & Slippers", "Balcony", "Aurora View"],
        images: [
            "images/junior-suite.jpg",
            "images/junior-suite1.jpg",
            "images/junior-suite2.jpg"
        ],
        mainImage: "images/junior-suite.jpg",
        available: true,
        rating: 4.8
    },
    {
        id: 3,
        name: "Люкс 'Северное Сияние'",
        nameEn: "'Northern Lights' Luxury Suite",
        type: "luxe",
        description: "Роскошный номер с панорамными окнами для наблюдения за северным сиянием, двуспальной кроватью King Size, отдельной гостиной зоной и ванной комнатой с джакузи.",
        descriptionEn: "Luxury room with panoramic windows for aurora borealis viewing, King Size bed, separate living area and bathroom with jacuzzi.",
        price: 15000,
        capacity: 2,
        area: "45 м²",
        features: ["Wi-Fi Premium", "Кондиционер", "2 Smart TV", "Мини-бар", "Джакузи", "Сейф", "Завтрак включен", "Халаты и тапочки", "Балкон", "Вид на северное сияние", "Камин"],
        featuresEn: ["Premium Wi-Fi", "Air Conditioning", "2 Smart TVs", "Mini-bar", "Jacuzzi", "Safe", "Breakfast Included", "Bathrobes & Slippers", "Balcony", "Aurora View", "Fireplace"],
        images: [
            "images/luxe.jpg",
            "images/luxe1.jpg",
            "images/luxe2.jpg"
        ],
        mainImage: "images/luxe.jpg",
        available: true,
        rating: 4.9
    },
    {
        id: 4,
        name: "Пентхаус 'Аврора'",
        nameEn: "'Aurora' Penthouse",
        type: "penthouse",
        description: "Эксклюзивный двухуровневый пентхаус с частной террасой, панорамными окнами на 360°, персональным дворецким, домашним кинотеатром и эксклюзивным доступом в лаунж-зону.",
        descriptionEn: "Exclusive two-level penthouse with private terrace, 360° panoramic windows, personal butler, home theater and exclusive lounge access.",
        price: 25000,
        capacity: 4,
        area: "80 м²",
        features: ["Wi-Fi Premium", "Кондиционер", "Домашний кинотеатр", "Бар с барменом", "Гидромассажная ванна", "Сейф", "Завтрак включен", "Персональный дворецкий", "Лаунж доступ", "Терраса", "Камин", "Вид на 360°"],
        featuresEn: ["Premium Wi-Fi", "Air Conditioning", "Home Theater", "Bar with Bartender", "Jacuzzi", "Safe", "Breakfast Included", "Personal Butler", "Lounge Access", "Terrace", "Fireplace", "360° View"],
        images: [
            "images/room-suite.jpg",
            "images/room-suite1.jpg",
            "images/room-suite2.jpg"
        ],
        mainImage: "images/room-suite.jpg",
        available: true,
        rating: 5.0
    }
];

// Бронирования из LocalStorage
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
let selectedRoom = null;
let cancelBookingId = null;
let currentLanguage = 'ru';

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Установка языка
    const savedLang = localStorage.getItem('hotel_lang') || 'ru';
    setLanguage(savedLang);
    
    displayRooms();
    setupEventListeners();
    setupDates();
    loadBookings();
    populateRoomSelect();
    updateStats();
    setupGallery();
});

// Установка языка
function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('hotel_lang', lang);
    
    // Обновление текста переключателя
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.innerHTML = lang === 'ru' ? '<i class="fas fa-language"></i> EN' : '<i class="fas fa-language"></i> RU';
    }
    
    // Обновление всех текстов
    updateAllTexts();
}

// Обновление всех текстов на странице
function updateAllTexts() {
    // Обновляем данные формы бронирования при смене языка
    if (selectedRoom) {
        updateRoomInBookingForm();
    }
    
    // Перезагружаем бронирования
    loadBookings();
}

// Обновление данных номера в форме бронирования
function updateRoomInBookingForm() {
    const roomSelect = document.getElementById('roomSelect');
    if (roomSelect && selectedRoom) {
        roomSelect.value = selectedRoom.id;
        calculatePrice();
    }
}

// Функция для обработки ошибок загрузки изображений
function handleImageError(img) {
    console.log("Ошибка загрузки изображения:", img.src);
    
    // Пробуем загрузить запасное изображение
    const imageName = img.src.split('/').pop();
    
    if (imageName.includes('джуниор')) {
        img.src = 'images/room-suite.jpg';
    } else if (imageName.includes('luxe')) {
        img.src = 'images/room-suite.jpg';
    } else if (imageName.includes('standard')) {
        img.src = 'images/hotel-lobby.jpg';
    } else {
        // Если ничего не помогло, используем заглушку
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9IiNmNWY1ZjUiPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIi8+PHRleHQgeD0iMjAwIiB5PSIxMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiPk9URUwgU0VWRVJOT0UgU0lZTklFPC90ZXh0Pjwvc3ZnPg==';
    }
    
    img.onerror = null; // Предотвращаем бесконечный цикл
}

// Отображение номеров
function displayRooms() {
    const grid = document.getElementById('roomsGrid');
    grid.innerHTML = '';
    
    rooms.forEach(room => {
        const card = document.createElement('div');
        card.className = 'room-card';
        
        let ratingStars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(room.rating)) {
                ratingStars += '<i class="fas fa-star" style="color: #FFD700;"></i>';
            } else if (i === Math.ceil(room.rating) && room.rating % 1 !== 0) {
                ratingStars += '<i class="fas fa-star-half-alt" style="color: #FFD700;"></i>';
            } else {
                ratingStars += '<i class="far fa-star" style="color: #FFD700;"></i>';
            }
        }
        
        const roomName = currentLanguage === 'ru' ? room.name : room.nameEn;
        const roomDesc = currentLanguage === 'ru' ? room.description : room.descriptionEn;
        const features = currentLanguage === 'ru' ? room.features : room.featuresEn;
        
        card.innerHTML = `
            <div class="room-img">
                <img src="${room.mainImage}" alt="${roomName}" onerror="handleImageError(this)">
                <div class="room-badge">${room.type === 'penthouse' ? (currentLanguage === 'ru' ? 'Премиум' : 'Premium') : 
                                          room.type === 'luxe' ? (currentLanguage === 'ru' ? 'Люкс' : 'Luxury') : 
                                          room.type === 'junior' ? (currentLanguage === 'ru' ? 'Сюит' : 'Suite') : 
                                          (currentLanguage === 'ru' ? 'Стандарт' : 'Standard')}</div>
                <button class="view-photos-btn" data-room-id="${room.id}">
                    <i class="fas fa-images"></i> ${room.images.length} ${currentLanguage === 'ru' ? 'фото' : 'photos'}
                </button>
            </div>
            <div class="room-info">
                <div class="room-header">
                    <h3 class="room-title">${roomName}</h3>
                    <div class="room-price">${room.price.toLocaleString()} <span>${currentLanguage === 'ru' ? 'руб./ночь' : 'RUB/night'}</span></div>
                </div>
                <div class="room-area">
                    <i class="fas fa-expand-arrows-alt"></i> ${room.area}
                </div>
                <div class="room-rating">
                    ${ratingStars} <span style="color: #666; margin-left: 5px;">${room.rating}</span>
                </div>
                <p class="room-desc">${roomDesc}</p>
                <div class="room-features">
                    ${features.slice(0, 4).map(feat => 
                        `<span class="feature"><i class="fas fa-check"></i>${feat}</span>`
                    ).join('')}
                    ${features.length > 4 ? 
                        `<span class="feature" style="background: #f0f0f0; color: #666;">
                            <i class="fas fa-plus"></i>${currentLanguage === 'ru' ? 'ещё ' : 'more '}${features.length - 4}
                        </span>` : ''
                    }
                </div>
                <div class="room-footer">
                    <div class="room-capacity">
                        <i class="fas fa-user-friends"></i> ${currentLanguage === 'ru' ? 'До ' : 'Up to '}${room.capacity} ${currentLanguage === 'ru' ? 'гостей' : 'guests'}
                    </div>
                    <button class="select-btn" data-id="${room.id}">
                        <i class="fas fa-check"></i> ${currentLanguage === 'ru' ? 'Выбрать' : 'Select'}
                    </button>
                </div>
            </div>
        `;
        
        // Обработчик просмотра фото номера
        card.querySelector('.view-photos-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            const roomId = this.getAttribute('data-room-id');
            showRoomPhotos(roomId);
        });
        
        card.querySelector('.select-btn').addEventListener('click', function() {
            selectRoom(room.id);
            document.getElementById('booking').scrollIntoView({behavior: 'smooth'});
        });
        
        grid.appendChild(card);
    });
}

// Показать фото номера
function showRoomPhotos(roomId) {
    const room = rooms.find(r => r.id == roomId);
    if (!room) return;
    
    const title = document.getElementById('roomPhotosTitle');
    const titleEn = document.getElementById('roomPhotosTitleEn');
    const gallery = document.getElementById('roomPhotosGallery');
    
    if (title) title.textContent = `Фотографии номера "${room.name}"`;
    if (titleEn) titleEn.textContent = `"${room.nameEn}" Room Photos`;
    if (gallery) {
        gallery.innerHTML = '';
        
        room.images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'room-photo-item';
            item.innerHTML = `<img src="${img}" alt="${currentLanguage === 'ru' ? room.name : room.nameEn} фото ${index + 1}" onerror="handleImageError(this)">`;
            item.addEventListener('click', () => {
                window.open(img, '_blank');
            });
            gallery.appendChild(item);
        });
    }
    
    document.getElementById('roomPhotosModal').style.display = 'flex';
}

// Выбор номера
function selectRoom(roomId) {
    selectedRoom = rooms.find(r => r.id == roomId);
    if (selectedRoom) {
        document.getElementById('roomSelect').value = selectedRoom.id;
        document.getElementById('nightPrice').textContent = selectedRoom.price.toLocaleString() + ' ' + (currentLanguage === 'ru' ? 'руб.' : 'RUB');
        calculatePrice();
        
        // Устанавливаем максимальное количество гостей
        const bookAdults = document.getElementById('bookAdults');
        const bookChildren = document.getElementById('bookChildren');
        const maxGuests = selectedRoom.capacity;
        
        if (parseInt(bookAdults.value) + parseInt(bookChildren.value) > maxGuests) {
            bookAdults.value = Math.min(2, maxGuests);
            bookChildren.value = Math.max(0, maxGuests - parseInt(bookAdults.value));
        }
        
        bookAdults.max = maxGuests;
    }
}

// Настройка дат
function setupDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);
    
    const format = d => d.toISOString().split('T')[0];
    
    // Устанавливаем минимальную дату (сегодня)
    const todayStr = format(today);
    
    // Поиск
    document.getElementById('checkin').value = todayStr;
    document.getElementById('checkout').value = format(tomorrow);
    document.getElementById('checkin').min = todayStr;
    document.getElementById('checkout').min = todayStr;
    
    // Бронирование
    document.getElementById('bookCheckin').value = todayStr;
    document.getElementById('bookCheckout').value = format(tomorrow);
    document.getElementById('bookCheckin').min = todayStr;
    document.getElementById('bookCheckout').min = todayStr;
    
    // Минимальная дата для всех date inputs
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = todayStr;
    });
}

// Настройка обработчиков
function setupEventListeners() {
    // Переключатель языка
    document.getElementById('langSwitch').addEventListener('click', function() {
        const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
        setLanguage(newLang);
        displayRooms(); // Перерисовываем номера с новым языком
    });
    
    // Поиск
    document.getElementById('searchBtn').addEventListener('click', function() {
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        
        const message = currentLanguage === 'ru' 
            ? `Поиск номеров с ${checkin} по ${checkout} для ${adults} взрослых и ${children} детей`
            : `Search rooms from ${checkin} to ${checkout} for ${adults} adults and ${children} children`;
        
        alert(message);
        document.getElementById('rooms').scrollIntoView({behavior: 'smooth'});
    });
    
    // Бронирование
    document.getElementById('bookBtn').addEventListener('click', makeBooking);
    
    // Расчет цены при изменении
    document.getElementById('bookCheckin').addEventListener('change', calculatePrice);
    document.getElementById('bookCheckout').addEventListener('change', calculatePrice);
    document.getElementById('roomSelect').addEventListener('change', function() {
        selectRoom(this.value);
    });
    
    document.getElementById('bookAdults').addEventListener('change', validateGuests);
    document.getElementById('bookChildren').addEventListener('change', validateGuests);
    
    // Галерея отеля
    document.querySelectorAll('.thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            document.getElementById('mainGalleryImage').src = imageUrl;
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Модальные окна
    document.querySelectorAll('.close, .btn-ok, .btn-cancel-no').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
            cancelBookingId = null;
        });
    });
    
    document.querySelectorAll('.btn-cancel-yes').forEach(btn => {
        btn.addEventListener('click', cancelBooking);
    });
    
    // Печать бронирований
    document.getElementById('printBookings').addEventListener('click', printBookings);
    
    // Отправка бронирований на email
    document.getElementById('emailBookings').addEventListener('click', emailBookings);
    
    // Клик вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            cancelBookingId = null;
        }
    });
    
    // Навигация
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({behavior: 'smooth'});
                }
            }
        });
    });
    
    // Подписка на рассылку
    document.querySelector('.subscribe-form button').addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.previousElementSibling.value;
        if (email && validateEmail(email)) {
            const message = currentLanguage === 'ru'
                ? 'Спасибо за подписку! Мы отправили вам письмо с подтверждением.'
                : 'Thank you for subscribing! We have sent you a confirmation email.';
            alert(message);
            this.previousElementSibling.value = '';
        } else {
            const message = currentLanguage === 'ru'
                ? 'Пожалуйста, введите корректный email адрес.'
                : 'Please enter a valid email address.';
            alert(message);
        }
    });
}

// Валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валидация количества гостей
function validateGuests() {
    if (!selectedRoom) return;
    
    const adults = parseInt(document.getElementById('bookAdults').value);
    const children = parseInt(document.getElementById('bookChildren').value);
    const totalGuests = adults + children;
    const maxGuests = selectedRoom.capacity;
    
    if (totalGuests > maxGuests) {
        const message = currentLanguage === 'ru'
            ? `Максимальное количество гостей для этого номера: ${maxGuests}`
            : `Maximum guests for this room: ${maxGuests}`;
        alert(message);
        
        document.getElementById('bookAdults').value = Math.min(adults, maxGuests);
        document.getElementById('bookChildren').value = Math.max(0, maxGuests - parseInt(document.getElementById('bookAdults').value));
    }
}

// Расчет цены
function calculatePrice() {
    const checkin = new Date(document.getElementById('bookCheckin').value);
    const checkout = new Date(document.getElementById('bookCheckout').value);
    
    if (!checkin || !checkout || !selectedRoom || checkin >= checkout) {
        document.getElementById('totalPrice').textContent = '0 ' + (currentLanguage === 'ru' ? 'руб.' : 'RUB');
        document.getElementById('nightsCount').textContent = '0';
        return;
    }
    
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    const total = selectedRoom.price * nights;
    
    document.getElementById('nightsCount').textContent = nights;
    document.getElementById('totalPrice').textContent = total.toLocaleString() + ' ' + (currentLanguage === 'ru' ? 'руб.' : 'RUB');
}

// Заполнение выпадающего списка
function populateRoomSelect() {
    const select = document.getElementById('roomSelect');
    select.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = currentLanguage === 'ru' ? 'Выберите номер...' : 'Select room...';
    select.appendChild(defaultOption);
    
    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        const roomName = currentLanguage === 'ru' ? room.name : room.nameEn;
        option.textContent = `${roomName} - ${room.price.toLocaleString()} ${currentLanguage === 'ru' ? 'руб./ночь' : 'RUB/night'}`;
        select.appendChild(option);
    });
}

// Создание бронирования
function makeBooking() {
    // Валидация
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const checkin = document.getElementById('bookCheckin').value;
    const checkout = document.getElementById('bookCheckout').value;
    const adults = document.getElementById('bookAdults').value;
    const children = document.getElementById('bookChildren').value;
    const checkinTime = document.getElementById('checkinTime').value;
    const checkoutTime = document.getElementById('checkoutTime').value;
    const breakfast = document.getElementById('breakfast').checked;
    const specialRequests = document.getElementById('specialRequests').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!fullName || !email || !phone || !selectedRoom || !checkin || !checkout) {
        const message = currentLanguage === 'ru'
            ? 'Пожалуйста, заполните все обязательные поля (отмечены *)'
            : 'Please fill in all required fields (marked with *)';
        alert(message);
        return;
    }
    
    if (!validateEmail(email)) {
        const message = currentLanguage === 'ru'
            ? 'Пожалуйста, введите корректный email адрес.'
            : 'Please enter a valid email address.';
        alert(message);
        return;
    }
    
    const totalGuests = parseInt(adults) + parseInt(children);
    if (totalGuests > selectedRoom.capacity) {
        const message = currentLanguage === 'ru'
            ? `Превышено максимальное количество гостей для этого номера (${selectedRoom.capacity})`
            : `Maximum guests exceeded for this room (${selectedRoom.capacity})`;
        alert(message);
        return;
    }
    
    // Расчет
    const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    const total = selectedRoom.price * nights;
    
    // Создание брони
    const booking = {
        id: 'B' + Date.now() + Math.floor(Math.random() * 1000),
        roomId: selectedRoom.id,
        roomName: currentLanguage === 'ru' ? selectedRoom.name : selectedRoom.nameEn,
        roomType: selectedRoom.type,
        guestName: fullName,
        guestEmail: email,
        guestPhone: phone,
        checkin: checkin,
        checkout: checkout,
        checkinTime: checkinTime,
        checkoutTime: checkoutTime,
        nights: nights,
        adults: adults,
        children: children,
        breakfast: breakfast,
        specialRequests: specialRequests,
        paymentMethod: paymentMethod,
        totalPrice: total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        bookingDate: new Date().toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US')
    };
    
    // Сохранение
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Обновление
    loadBookings();
    updateStats();
    
    // Показ уведомления
    const modalMessage = document.getElementById('modalMessage');
    const modalMessageEn = document.getElementById('modalMessageEn');
    
    if (modalMessage) {
        modalMessage.textContent = `Номер "${selectedRoom.name}" успешно забронирован!`;
    }
    if (modalMessageEn) {
        modalMessageEn.textContent = `Room "${selectedRoom.nameEn}" successfully booked!`;
    }
    
    const bookingDetails = document.getElementById('bookingDetails');
    bookingDetails.innerHTML = `
        <p><strong>${currentLanguage === 'ru' ? 'Детали бронирования:' : 'Booking Details:'}</strong></p>
        <p>${currentLanguage === 'ru' ? 'ID:' : 'ID:'} ${booking.id}</p>
        <p>${currentLanguage === 'ru' ? 'Гость:' : 'Guest:'} ${fullName}</p>
        <p>${currentLanguage === 'ru' ? 'Номер:' : 'Room:'} ${currentLanguage === 'ru' ? selectedRoom.name : selectedRoom.nameEn}</p>
        <p>${currentLanguage === 'ru' ? 'Даты:' : 'Dates:'} ${checkin} - ${checkout} (${nights} ${currentLanguage === 'ru' ? 'ночей' : 'nights'})</p>
        <p>${currentLanguage === 'ru' ? 'Время заезда:' : 'Check-in Time:'} ${checkinTime}</p>
        <p>${currentLanguage === 'ru' ? 'Время выезда:' : 'Check-out Time:'} ${checkoutTime}</p>
        <p>${currentLanguage === 'ru' ? 'Гости:' : 'Guests:'} ${adults} ${currentLanguage === 'ru' ? 'взрослых' : 'adults'}, ${children} ${currentLanguage === 'ru' ? 'детей' : 'children'}</p>
        <p>${currentLanguage === 'ru' ? 'Питание:' : 'Meals:'} ${breakfast ? (currentLanguage === 'ru' ? 'Завтрак включен (09:00-11:00)' : 'Breakfast included (09:00-11:00)') : (currentLanguage === 'ru' ? 'Без питания' : 'No meals')}</p>
        <p>${currentLanguage === 'ru' ? 'Сумма:' : 'Total:'} ${total.toLocaleString()} ${currentLanguage === 'ru' ? 'руб.' : 'RUB'}</p>
        <p>${currentLanguage === 'ru' ? 'Способ оплаты:' : 'Payment Method:'} ${getPaymentMethodName(paymentMethod)}</p>
        <p>${currentLanguage === 'ru' ? 'Статус:' : 'Status:'} ${currentLanguage === 'ru' ? 'Подтверждено ✓' : 'Confirmed ✓'}</p>
        ${specialRequests ? `<p>${currentLanguage === 'ru' ? 'Особые пожелания:' : 'Special Requests:'} ${specialRequests}</p>` : ''}
    `;
    
    document.getElementById('successModal').style.display = 'flex';
    
    // Очистка формы
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('specialRequests').value = '';
    document.getElementById('roomSelect').value = '';
    document.getElementById('bookAdults').value = '2';
    document.getElementById('bookChildren').value = '0';
    selectedRoom = null;
    document.getElementById('totalPrice').textContent = '0 ' + (currentLanguage === 'ru' ? 'руб.' : 'RUB');
    document.getElementById('nightsCount').textContent = '0';
    document.getElementById('nightPrice').textContent = '0 ' + (currentLanguage === 'ru' ? 'руб.' : 'RUB');
}

// Получить название метода оплаты
function getPaymentMethodName(method) {
    if (currentLanguage === 'ru') {
        switch(method) {
            case 'card': return 'Банковская карта';
            case 'qr': return 'SBP / QR-код';
            case 'cash': return 'Оплата при заселении';
            default: return 'Не указан';
        }
    } else {
        switch(method) {
            case 'card': return 'Credit Card';
            case 'qr': return 'SBP / QR Code';
            case 'cash': return 'Payment on Arrival';
            default: return 'Not specified';
        }
    }
}

// Загрузка бронирований
function loadBookings() {
    const container = document.getElementById('bookingsContainer');
    
    if (bookings.length === 0) {
        const emptyRu = container.querySelector('.ru-text.empty');
        const emptyEn = container.querySelector('.en-text.empty');
        if (emptyRu) emptyRu.style.display = currentLanguage === 'ru' ? 'block' : 'none';
        if (emptyEn) emptyEn.style.display = currentLanguage === 'en' ? 'block' : 'none';
        return;
    }
    
    container.innerHTML = '';
    
    // Сортировка по дате (новые сверху)
    const sorted = [...bookings].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    sorted.forEach(booking => {
        const item = document.createElement('div');
        item.className = 'booking-item';
        
        const roomName = booking.roomName;
        const badgeText = getBookingBadge(booking.roomType);
        
        item.innerHTML = `
            <div class="booking-badge">${badgeText}</div>
            <div class="booking-header">
                <div class="booking-room">${roomName}</div>
                <div class="booking-dates">${booking.checkin} - ${booking.checkout}</div>
            </div>
            <div class="booking-guest">
                <div><i class="fas fa-user"></i> ${booking.guestName}</div>
                <div><i class="fas fa-phone"></i> ${booking.guestPhone}</div>
                <div><i class="fas fa-users"></i> ${booking.adults} ${currentLanguage === 'ru' ? 'взр.' : 'adults'}, ${booking.children} ${currentLanguage === 'ru' ? 'дет.' : 'children'}</div>
            </div>
            <div class="booking-price">
                <i class="fas fa-ruble-sign"></i> ${booking.totalPrice.toLocaleString()} ${currentLanguage === 'ru' ? 'руб.' : 'RUB'} (${booking.nights} ${currentLanguage === 'ru' ? 'ночей' : 'nights'})
            </div>
            <div style="font-size: 12px; color: #999; margin-bottom: 15px;">
                ID: ${booking.id} | ${currentLanguage === 'ru' ? 'Оплата:' : 'Payment:'} ${getPaymentMethodName(booking.paymentMethod)}
            </div>
            <button class="cancel-btn" data-id="${booking.id}">
                <i class="fas fa-times"></i> ${currentLanguage === 'ru' ? 'Отменить бронирование' : 'Cancel Booking'}
            </button>
        `;
        
        container.appendChild(item);
    });
    
    // Обработчики отмены
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            cancelBookingId = this.getAttribute('data-id');
            document.getElementById('cancelModal').style.display = 'flex';
        });
    });
}

// Получить бейдж для типа номера
function getBookingBadge(roomType) {
    if (currentLanguage === 'ru') {
        switch(roomType) {
            case 'penthouse': return 'Пентхаус';
            case 'luxe': return 'Люкс';
            case 'junior': return 'Сюит';
            case 'standard': return 'Стандарт';
            default: return 'Номер';
        }
    } else {
        switch(roomType) {
            case 'penthouse': return 'Penthouse';
            case 'luxe': return 'Luxury';
            case 'junior': return 'Suite';
            case 'standard': return 'Standard';
            default: return 'Room';
        }
    }
}

// Отмена бронирования
function cancelBooking() {
    if (!cancelBookingId) return;
    
    const index = bookings.findIndex(b => b.id === cancelBookingId);
    if (index !== -1) {
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
        updateStats();
        document.getElementById('cancelModal').style.display = 'none';
        cancelBookingId = null;
        
        const message = currentLanguage === 'ru'
            ? 'Бронирование успешно отменено'
            : 'Booking successfully cancelled';
        alert(message);
    }
}

// Печать бронирований
function printBookings() {
    if (bookings.length === 0) {
        const message = currentLanguage === 'ru'
            ? 'Нет бронирований для печати'
            : 'No bookings to print';
        alert(message);
        return;
    }
    
    const printWindow = window.open('', '_blank');
    const title = currentLanguage === 'ru' ? 'Бронирования - Отель Северное Сияние' : 'Bookings - Northern Lights Hotel';
    const totalText = currentLanguage === 'ru' ? 'Всего бронирований:' : 'Total bookings:';
    const totalSumText = currentLanguage === 'ru' ? 'Общая сумма:' : 'Total amount:';
    
    printWindow.document.write(`
        <html>
            <head>
                <title>${title}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #1a2980; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .total { font-weight: bold; margin-top: 20px; }
                    .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                    .logo { font-size: 24px; font-weight: bold; color: #1a2980; }
                    .date { color: #666; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">${currentLanguage === 'ru' ? 'Отель "Северное Сияние"' : 'Hotel "Northern Lights"'}</div>
                    <div class="date">${currentLanguage === 'ru' ? 'Распечатано:' : 'Printed:'} ${new Date().toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US')}</div>
                </div>
                <h1>${currentLanguage === 'ru' ? 'Ваши бронирования' : 'Your Bookings'}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>${currentLanguage === 'ru' ? 'Номер' : 'Room'}</th>
                            <th>${currentLanguage === 'ru' ? 'Даты' : 'Dates'}</th>
                            <th>${currentLanguage === 'ru' ? 'Гости' : 'Guests'}</th>
                            <th>${currentLanguage === 'ru' ? 'Сумма' : 'Amount'}</th>
                            <th>${currentLanguage === 'ru' ? 'Статус' : 'Status'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bookings.map(booking => `
                            <tr>
                                <td>${booking.id}</td>
                                <td>${booking.roomName}</td>
                                <td>${booking.checkin} - ${booking.checkout}</td>
                                <td>${booking.adults + booking.children} ${currentLanguage === 'ru' ? 'чел.' : 'persons'}</td>
                                <td>${booking.totalPrice.toLocaleString()} ${currentLanguage === 'ru' ? 'руб.' : 'RUB'}</td>
                                <td>${booking.status === 'confirmed' ? (currentLanguage === 'ru' ? 'Подтверждено' : 'Confirmed') : (currentLanguage === 'ru' ? 'Отменено' : 'Cancelled')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="total">
                    ${totalText} ${bookings.length}<br>
                    ${totalSumText} ${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()} ${currentLanguage === 'ru' ? 'руб.' : 'RUB'}
                </div>
                <script>
                    window.onload = function() { window.print(); window.close(); }
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

// Отправка бронирований на email (симуляция)
function emailBookings() {
    if (bookings.length === 0) {
        const message = currentLanguage === 'ru'
            ? 'Нет бронирований для отправки'
            : 'No bookings to send';
        alert(message);
        return;
    }
    
    const promptText = currentLanguage === 'ru'
        ? 'Введите ваш email адрес для отправки бронирований:'
        : 'Enter your email address to send bookings:';
    
    const email = prompt(promptText);
    if (email && validateEmail(email)) {
        // В реальном приложении здесь был бы AJAX запрос на сервер
        const message = currentLanguage === 'ru'
            ? `Бронирования отправлены на email: ${email}\n\nЭто демо-версия. В реальном приложении письмо было бы отправлено автоматически.`
            : `Bookings sent to email: ${email}\n\nThis is a demo version. In the real application, the email would be sent automatically.`;
        alert(message);
    } else if (email) {
        const message = currentLanguage === 'ru'
            ? 'Пожалуйста, введите корректный email адрес.'
            : 'Please enter a valid email address.';
        alert(message);
    }
}

// Обновление статистики
function updateStats() {
    // Обновляем счетчик бронирований в шапке
    const adminBtn = document.querySelector('.admin-btn');
    if (adminBtn) {
        const countText = currentLanguage === 'ru' 
            ? `Броней: ${bookings.length}` 
            : `Bookings: ${bookings.length}`;
        adminBtn.innerHTML = `<i class="fas fa-user"></i> ${countText}`;
    }
}

// Настройка галереи
function setupGallery() {
    // Предзагрузка изображений для галереи
    const galleryImages = [
        'images/hotel-exterior.jpg',
        'images/hotel-lobby.jpg',
        'images/restaurant1.jpg',
        'images/spa-center.jpg',
        'images/pool.jpg'
    ];
    
    galleryImages.forEach(img => {
        const image = new Image();
        image.src = img;
    });
}

// Инициализация галереи при загрузке
window.onload = function() {
    // Инициализируем галерею отеля
    const thumbs = document.querySelectorAll('.thumb');
    if (thumbs.length > 0) {
        thumbs[0].classList.add('active');
    }
};