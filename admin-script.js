// Данные для админ-панели
let adminBookings = JSON.parse(localStorage.getItem('bookings')) || [];
const adminRooms = [
    {
        id: 1,
        name: "Стандарт",
        nameEn: "Standard Room",
        type: "standard",
        price: 8500,
        capacity: 2,
        area: "25 м²",
        features: ["Бесплатный Wi-Fi", "Кондиционер", "Smart TV", "Сейф", "Чайник", "Фен", "Подогреваемый пол"],
        featuresEn: ["Free Wi-Fi", "Air Conditioning", "Smart TV", "Safe", "Kettle", "Hair Dryer", "Heated Floor"],
        images: [
            "images/room-standard.jpg",
            "images/room-standard1.jpg",
            "images/room-standard2.jpg"
        ],
        mainImage: "images/room-standard.jpg",
        available: true
    },
    {
        id: 2,
        name: "Джуниор Сюит",
        nameEn: "Junior Suite",
        type: "junior",
        price: 12500,
        capacity: 2,
        area: "35 м²",
        features: ["Wi-Fi Premium", "Кондиционер", "Большой Smart TV", "Мини-бар", "Гидромассажная ванна", "Сейф", "Завтрак включен", "Халаты и тапочки", "Балкон"],
        featuresEn: ["Premium Wi-Fi", "Air Conditioning", "Large Smart TV", "Mini-bar", "Jacuzzi", "Safe", "Breakfast Included", "Bathrobes & Slippers", "Balcony"],
        images: [
            "images/джуниор сюит.jpg",
            "images/джуниор сюит1.jpg",
            "images/джуниор сюит2.jpg"
        ],
        mainImage: "images/джуниор сюит.jpg",
        available: true
    },
    {
        id: 3,
        name: "Люкс 'Северное Сияние'",
        nameEn: "'Northern Lights' Luxury Suite",
        type: "luxe",
        price: 15000,
        capacity: 2,
        area: "45 м²",
        features: ["Wi-Fi Premium", "Кондиционер", "2 Smart TV", "Мини-бар", "Джакузи", "Сейф", "Завтрак включен", "Халаты и тапочки", "Балкон"],
        featuresEn: ["Premium Wi-Fi", "Air Conditioning", "2 Smart TVs", "Mini-bar", "Jacuzzi", "Safe", "Breakfast Included", "Bathrobes & Slippers", "Balcony"],
        images: [
            "images/luxe.jpg",
            "images/luxe1.jpg",
            "images/luxe2.jpg"
        ],
        mainImage: "images/luxe.jpg",
        available: true
    },
    {
        id: 4,
        name: "Пентхаус 'Аврора'",
        nameEn: "'Aurora' Penthouse",
        type: "penthouse",
        price: 25000,
        capacity: 4,
        area: "80 м²",
        features: ["Wi-Fi Premium", "Кондиционер", "Домашний кинотеатр", "Бар с барменом", "Гидромассажная ванна", "Сейф", "Завтрак включен", "Персональный дворецкий", "Лаунж доступ", "Терраса"],
        featuresEn: ["Premium Wi-Fi", "Air Conditioning", "Home Theater", "Bar with Bartender", "Jacuzzi", "Safe", "Breakfast Included", "Personal Butler", "Lounge Access", "Terrace"],
        images: [
            "images/room-suite.jpg",
            "images/room-suite1.jpg",
            "images/room-suite2.jpg"
        ],
        mainImage: "images/room-suite.jpg",
        available: true
    }
];

// Данные для авторизации
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin"
};

// Состояние авторизации
let isAuthenticated = false;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли сохраненная сессия
    checkSavedSession();
    
    // Настройка обработчиков формы авторизации
    setupAuthEventListeners();
    
    // Если пользователь уже авторизован, показываем админку
    if (isAuthenticated) {
        showAdminPanel();
        setupAdminFeatures();
    } else {
        // Показываем форму авторизации
        showLoginForm();
    }
});

// Проверка сохраненной сессии
function checkSavedSession() {
    const savedSession = localStorage.getItem('admin_session');
    
    if (savedSession === 'authenticated') {
        isAuthenticated = true;
        updateLastLoginDisplay();
    }
}

// Показать форму авторизации
function showLoginForm() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('adminWrapper').style.display = 'none';
    document.getElementById('loginError').style.display = 'none';
    
    // Очищаем поля формы
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    // Фокус на поле логина
    setTimeout(() => {
        document.getElementById('username').focus();
    }, 100);
}

// Показать админ-панель
function showAdminPanel() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('adminWrapper').style.display = 'flex';
}

// Настройка обработчиков авторизации
function setupAuthEventListeners() {
    // Форма авторизации
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Выход из системы
    document.getElementById('logoutBtn').addEventListener('click', function() {
        handleLogout();
    });
    
    // Быстрый вход по Enter в поле пароля
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // Закрытие модальных окон
    document.querySelectorAll('.close, .cancel-btn, .btn-ok').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Клик вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Обработка входа
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Проверка учетных данных
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Успешная авторизация
        isAuthenticated = true;
        
        // Сохраняем сессию если нужно
        if (rememberMe) {
            localStorage.setItem('admin_session', 'authenticated');
            localStorage.setItem('admin_last_login', new Date().toISOString());
        }
        
        // Обновляем отображение последнего входа
        updateLastLoginDisplay();
        
        // Показываем админ-панель
        showAdminPanel();
        
        // Настраиваем функции админ-панели
        setupAdminFeatures();
        
        // Скрываем сообщение об ошибке
        document.getElementById('loginError').style.display = 'none';
    } else {
        // Неудачная попытка входа
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').textContent = 'Неверный логин или пароль';
        
        // Очищаем поле пароля
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

// Обработка выхода
function handleLogout() {
    if (confirm('Вы уверены, что хотите выйти из админ-панели?')) {
        // Удаляем данные сессии
        localStorage.removeItem('admin_session');
        localStorage.removeItem('admin_last_login');
        
        // Сбрасываем состояние
        isAuthenticated = false;
        
        // Показываем форму авторизации
        showLoginForm();
    }
}

// Обновление отображения последнего входа
function updateLastLoginDisplay() {
    const lastLogin = localStorage.getItem('admin_last_login');
    const now = new Date();
    
    if (lastLogin) {
        const loginDate = new Date(lastLogin);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedTime = loginDate.toLocaleDateString('ru-RU', options);
        document.getElementById('lastLogin').textContent = formattedTime;
    } else {
        const options = { 
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedTime = now.toLocaleTimeString('ru-RU', options);
        document.getElementById('lastLogin').textContent = `Сегодня, ${formattedTime}`;
    }
}

// Настройка функций админ-панели
function setupAdminFeatures() {
    setupAdminNavigation();
    loadAdminDashboard();
    loadAllBookings();
    displayAdminRooms();
    setupAdminEventListeners();
    
    // Показываем дашборд по умолчанию
    showSection('dashboard');
}

// Навигация
function setupAdminNavigation() {
    document.querySelectorAll('.admin-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Если ссылка ведет на главную страницу
            if (href === 'index.html') {
                window.location.href = 'index.html';
                return;
            }
            
            const sectionId = href.substring(1);
            showSection(sectionId);
            
            // Активная ссылка
            document.querySelectorAll('.admin-menu a').forEach(a => {
                a.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Показать секцию
function showSection(sectionId) {
    // Скрыть все секции
    document.querySelectorAll('.admin-main section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Показать выбранную
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        
        // Обновить данные если нужно
        if (sectionId === 'dashboard') {
            loadAdminDashboard();
        } else if (sectionId === 'bookings') {
            loadAllBookings();
        } else if (sectionId === 'rooms') {
            displayAdminRooms();
        }
    }
}

// Загрузка дашборда
function loadAdminDashboard() {
    // Общее количество бронирований
    document.getElementById('totalBookingsCount').textContent = adminBookings.length;
    
    // Общая выручка
    const totalRevenue = adminBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString() + ' руб.';
    
    // Заполняемость (демо)
    const occupancy = Math.min(100, Math.floor((adminBookings.length / 10) * 100));
    document.getElementById('occupancyRate').textContent = occupancy + '%';
    
    // Количество номеров
    document.getElementById('totalRooms').textContent = adminRooms.length;
    
    // Последние бронирования
    loadRecentBookings();
    
    // Статус номеров
    loadRoomsStatus();
}

// Последние бронирования
function loadRecentBookings() {
    const tbody = document.getElementById('recentBookings');
    tbody.innerHTML = '';
    
    if (adminBookings.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" style="text-align: center; color: #666; padding: 20px;">
                Нет бронирований
            </td>
        `;
        tbody.appendChild(row);
        return;
    }
    
    // Последние 5 бронирований
    const recent = [...adminBookings]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    
    recent.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>${booking.roomName}</td>
            <td>${booking.checkin} - ${booking.checkout}</td>
            <td>${booking.adults || 2} / ${booking.children || 0}</td>
            <td>${booking.totalPrice.toLocaleString()} руб.</td>
            <td><span class="status-badge status-confirmed">Подтверждено</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Статус номеров
function loadRoomsStatus() {
    const container = document.getElementById('roomsStatus');
    container.innerHTML = '';
    
    const today = new Date().toISOString().split('T')[0];
    
    adminRooms.forEach(room => {
        // Проверяем занятость
        const isOccupied = adminBookings.some(booking => 
            booking.roomId == room.id && 
            booking.checkin <= today && 
            booking.checkout >= today
        );
        
        const card = document.createElement('div');
        card.className = `room-status-card ${isOccupied ? 'occupied' : ''}`;
        card.innerHTML = `
            <h3>${room.name}</h3>
            <p>Тип: ${room.type === 'penthouse' ? 'Пентхаус' : 
                      room.type === 'luxe' ? 'Люкс' : 
                      room.type === 'junior' ? 'Джуниор Сюит' : 'Стандарт'}</p>
            <p>Площадь: ${room.area}</p>
            <p>Цена: ${room.price.toLocaleString()} руб./ночь</p>
            <p>Вместимость: ${room.capacity} чел.</p>
            <p>Статус: <strong>${isOccupied ? 'Занят' : 'Свободен'}</strong></p>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">
                Фото: ${room.images ? room.images.length : 0} шт.
            </p>
        `;
        
        container.appendChild(card);
    });
}

// Все бронирования
function loadAllBookings() {
    const tbody = document.getElementById('allBookings');
    const totalCount = document.getElementById('totalCount');
    tbody.innerHTML = '';
    
    if (adminBookings.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="13" style="text-align: center; color: #666; padding: 30px;">
                Нет бронирований для отображения
            </td>
        `;
        tbody.appendChild(row);
        totalCount.textContent = '0';
        return;
    }
    
    totalCount.textContent = adminBookings.length;
    
    adminBookings.forEach(booking => {
        const row = document.createElement('tr');
        const paymentMethod = booking.paymentMethod === 'card' ? 'Карта' : 
                             booking.paymentMethod === 'qr' ? 'SBP/QR' : 
                             'При заселении';
        
        row.innerHTML = `
            <td><input type="checkbox" class="booking-checkbox" data-id="${booking.id}"></td>
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>${booking.guestPhone}<br>${booking.guestEmail}</td>
            <td>${booking.roomName}</td>
            <td>${booking.checkin} - ${booking.checkout}<br>${booking.nights} ночей</td>
            <td>${booking.adults || 2} / ${booking.children || 0}</td>
            <td>${booking.checkinTime || '14:00'} / ${booking.checkoutTime || '12:00'}</td>
            <td>${booking.breakfast ? 'Завтрак' : 'Нет'}</td>
            <td>${booking.totalPrice.toLocaleString()} руб.</td>
            <td>${paymentMethod}</td>
            <td><span class="status-badge status-confirmed">Подтверждено</span></td>
            <td>
                <button class="action-btn delete-btn" data-id="${booking.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Обработчики действий
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            if (confirm('Удалить это бронирование?')) {
                deleteBooking(bookingId);
            }
        });
    });
    
    // Обработчики чекбоксов
    setupCheckboxHandlers();
}

// Настройка обработчиков чекбоксов
function setupCheckboxHandlers() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.booking-checkbox');
    const selectedCount = document.getElementById('selectedCount');
    
    selectAll.addEventListener('change', function() {
        const isChecked = this.checked;
        checkboxes.forEach(cb => cb.checked = isChecked);
        updateSelectedCount();
    });
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateSelectedCount);
    });
    
    function updateSelectedCount() {
        const selected = document.querySelectorAll('.booking-checkbox:checked').length;
        selectedCount.textContent = selected;
    }
}

// Удаление бронирования
function deleteBooking(bookingId) {
    const index = adminBookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
        adminBookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(adminBookings));
        loadAllBookings();
        loadAdminDashboard();
        alert('Бронирование удалено');
    }
}

// Отображение номеров в админке
function displayAdminRooms() {
    const grid = document.getElementById('adminRoomsGrid');
    grid.innerHTML = '';
    
    adminRooms.forEach(room => {
        const card = document.createElement('div');
        card.className = 'admin-room-card';
        card.innerHTML = `
            <div class="room-card-header">
                <h3>${room.name} (${room.nameEn})</h3>
                <div class="room-actions">
                    <button class="action-btn edit-btn" data-id="${room.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn view-photos-btn" data-id="${room.id}">
                        <i class="fas fa-images"></i> ${room.images ? room.images.length : 0}
                    </button>
                    <button class="action-btn delete-btn" data-id="${room.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="room-card-body">
                <div class="room-details">
                    <p><strong>Тип:</strong> ${room.type === 'penthouse' ? 'Пентхаус' : 
                                           room.type === 'luxe' ? 'Люкс' : 
                                           room.type === 'junior' ? 'Джуниор Сюит' : 'Стандарт'}</p>
                    <p><strong>Цена:</strong> ${room.price.toLocaleString()} руб./ночь</p>
                    <p><strong>Площадь:</strong> ${room.area}</p>
                    <p><strong>Вместимость:</strong> ${room.capacity} чел.</p>
                    <p><strong>Статус:</strong> ${room.available ? 'Доступен' : 'Не доступен'}</p>
                    <p><strong>Фотографии:</strong> ${room.images ? room.images.length : 0} шт.</p>
                </div>
                <div class="room-features-list">
                    ${room.features.slice(0, 5).map(feat => 
                        `<span class="feature-badge">${feat}</span>`
                    ).join('')}
                    ${room.features.length > 5 ? 
                        `<span class="feature-badge">+${room.features.length - 5}</span>` : ''
                    }
                </div>
                <div class="room-preview-images">
                    <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                        ${room.images ? room.images.slice(0, 3).map((img, index) => 
                            `<img src="${img}" alt="Фото ${index + 1}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 5px; border: 1px solid #ddd;" onerror="this.style.display='none'">`
                        ).join('') : ''}
                        ${room.images && room.images.length > 3 ? 
                            `<div style="width: 80px; height: 60px; background: #f0f0f0; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #666; font-size: 12px;">
                                +${room.images.length - 3}
                            </div>` : ''
                        }
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Обработчики
    document.querySelectorAll('.admin-room-card .edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const roomId = this.getAttribute('data-id');
            editRoom(roomId);
        });
    });
    
    document.querySelectorAll('.admin-room-card .view-photos-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const roomId = this.getAttribute('data-id');
            viewRoomPhotos(roomId);
        });
    });
    
    document.querySelectorAll('.admin-room-card .delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const roomId = this.getAttribute('data-id');
            if (confirm('Удалить этот номер?')) {
                alert('В демо-версии удаление номеров не реализовано');
            }
        });
    });
}

// Просмотр фото номера
function viewRoomPhotos(roomId) {
    const room = adminRooms.find(r => r.id == roomId);
    if (!room) return;
    
    alert(`Просмотр фото номера: ${room.name}\n\nВсего фото: ${room.images ? room.images.length : 0}\n\nВ полной версии будет открыта галерея фотографий.`);
}

// Редактирование номера
function editRoom(roomId) {
    const room = adminRooms.find(r => r.id == roomId);
    if (!room) return;
    
    document.getElementById('modalTitle').textContent = 'Редактировать номер';
    document.getElementById('roomName').value = room.name;
    document.getElementById('roomNameEn').value = room.nameEn;
    document.getElementById('roomType').value = room.type;
    document.getElementById('roomPrice').value = room.price;
    document.getElementById('roomCapacity').value = room.capacity;
    document.getElementById('roomArea').value = room.area;
    document.getElementById('roomImage').value = room.mainImage;
    document.getElementById('roomStatus').value = room.available ? 'available' : 'unavailable';
    
    // Чекбоксы
    const checkboxes = document.querySelectorAll('#roomForm input[name]');
    checkboxes.forEach(cb => {
        if (room.features && room.features.includes(cb.parentElement.textContent.trim())) {
            cb.checked = true;
        }
    });
    
    document.getElementById('roomModal').style.display = 'flex';
}

// Настройка обработчиков админ-панели
function setupAdminEventListeners() {
    // Добавление номера
    document.getElementById('addRoomBtn').addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Добавить номер';
        document.getElementById('roomForm').reset();
        document.getElementById('roomStatus').value = 'available';
        document.getElementById('roomModal').style.display = 'flex';
    });
    
    // Закрытие модального окна номера
    document.querySelectorAll('#roomModal .close, #roomModal .cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('roomModal').style.display = 'none';
        });
    });
    
    // Сохранение номера
    document.getElementById('roomForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('В демо-версии сохранение номеров не реализовано');
        document.getElementById('roomModal').style.display = 'none';
    });
    
    // Экспорт
    document.getElementById('exportBtn').addEventListener('click', exportBookings);
    
    // Экспорт выбранных
    document.getElementById('exportSelectedBtn').addEventListener('click', exportSelectedBookings);
    
    // Экспорт номеров
    document.getElementById('exportRoomsBtn').addEventListener('click', exportRooms);
    
    // Быстрые кнопки экспорта
    document.querySelectorAll('.quick-export-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            quickExport(type);
        });
    });
    
    // Кнопки экспорта разделов
    document.querySelectorAll('.export-section-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            exportSection(section);
        });
    });
    
    // Кнопки экспорта отчетов
    document.querySelectorAll('.export-report-btn, .generate-report-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const report = this.getAttribute('data-report');
            generateReport(report);
        });
    });
    
    // Поиск
    document.querySelector('.search-box button').addEventListener('click', function() {
        const query = document.getElementById('searchBooking').value.toLowerCase();
        if (query) {
            alert(`Поиск: ${query}\nВ полной версии будет реализован поиск по бронированиям`);
        }
    });
    
    // Фильтры
    document.getElementById('filterStatus').addEventListener('change', function() {
        loadAllBookings();
    });
    
    document.getElementById('filterDate').addEventListener('change', function() {
        loadAllBookings();
    });
    
    // Генерация пользовательского отчета
    document.getElementById('generateCustomReportBtn').addEventListener('click', generateCustomReport);
    
    // Клик вне модальных окон
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Экспорт в Excel
function exportToExcel(data, fileName) {
    try {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Данные");
        XLSX.writeFile(wb, fileName);
    } catch (error) {
        console.error('Ошибка экспорта в Excel:', error);
        alert('Ошибка при экспорте данных');
    }
}

// Быстрый экспорт
function quickExport(type) {
    let dataToExport = [...adminBookings];
    let fileName = '';
    
    switch(type) {
        case 'today':
            const today = new Date().toISOString().split('T')[0];
            dataToExport = adminBookings.filter(b => b.checkin === today);
            fileName = `бронирования_${today}.xlsx`;
            break;
        case 'month':
            const month = new Date().getMonth() + 1;
            const year = new Date().getFullYear();
            dataToExport = adminBookings.filter(b => {
                const bookingMonth = new Date(b.checkin).getMonth() + 1;
                return bookingMonth === month;
            });
            fileName = `бронирования_${month}_${year}.xlsx`;
            break;
        case 'all':
            fileName = `все_бронирования.xlsx`;
            break;
    }
    
    if (dataToExport.length === 0) {
        alert('Нет данных для экспорта');
        return;
    }
    
    exportToExcel(dataToExport, fileName);
}

// Экспорт раздела
function exportSection(section) {
    let data = [];
    let fileName = '';
    
    switch(section) {
        case 'recent':
            const recent = [...adminBookings]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);
            data = recent;
            fileName = 'последние_бронирования.xlsx';
            break;
        case 'rooms':
            data = adminRooms.map(room => ({
                'Название (RU)': room.name,
                'Название (EN)': room.nameEn,
                'Тип': room.type === 'penthouse' ? 'Пентхаус' : 
                      room.type === 'luxe' ? 'Люкс' : 
                      room.type === 'junior' ? 'Джуниор Сюит' : 'Стандарт',
                'Цена': `${room.price} руб./ночь`,
                'Площадь': room.area,
                'Вместимость': `${room.capacity} чел.`,
                'Статус': room.available ? 'Доступен' : 'Не доступен',
                'Количество фото': room.images ? room.images.length : 0,
                'Удобства': room.features ? room.features.join(', ') : ''
            }));
            fileName = 'номера.xlsx';
            break;
    }
    
    if (data.length === 0) {
        alert('Нет данных для экспорта');
        return;
    }
    
    exportToExcel(data, fileName);
}

// Экспорт бронирований
function exportBookings() {
    if (adminBookings.length === 0) {
        alert('Нет данных для экспорта');
        return;
    }
    
    const formattedBookings = adminBookings.map(booking => ({
        'ID': booking.id,
        'Гость': booking.guestName,
        'Email': booking.guestEmail,
        'Телефон': booking.guestPhone,
        'Номер': booking.roomName,
        'Тип номера': booking.roomType,
        'Заезд': booking.checkin,
        'Выезд': booking.checkout,
        'Ночей': booking.nights,
        'Взрослые': booking.adults || 2,
        'Дети': booking.children || 0,
        'Время заезда': booking.checkinTime || '14:00',
        'Время выезда': booking.checkoutTime || '12:00',
        'Питание': booking.breakfast ? 'Завтрак (09:00-11:00)' : 'Нет',
        'Сумма': `${booking.totalPrice} руб.`,
        'Способ оплаты': booking.paymentMethod === 'card' ? 'Карта' : 
                        booking.paymentMethod === 'qr' ? 'SBP/QR-код' : 'При заселении',
        'Статус': booking.status === 'confirmed' ? 'Подтверждено' : 'Отменено',
        'Дата бронирования': new Date(booking.createdAt).toLocaleDateString('ru-RU'),
        'Особые пожелания': booking.specialRequests || 'Нет'
    }));
    
    exportToExcel(formattedBookings, `бронирования_отель_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Экспорт выбранных бронирований
function exportSelectedBookings() {
    const selectedCheckboxes = document.querySelectorAll('.booking-checkbox:checked');
    
    if (selectedCheckboxes.length === 0) {
        alert('Выберите бронирования для экспорта');
        return;
    }
    
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.getAttribute('data-id'));
    const selectedBookings = adminBookings.filter(booking => selectedIds.includes(booking.id));
    
    const formattedBookings = selectedBookings.map(booking => ({
        'ID': booking.id,
        'Гость': booking.guestName,
        'Номер': booking.roomName,
        'Даты': `${booking.checkin} - ${booking.checkout}`,
        'Взрослые/Дети': `${booking.adults || 2}/${booking.children || 0}`,
        'Ночей': booking.nights,
        'Сумма': `${booking.totalPrice} руб.`,
        'Статус': booking.status === 'confirmed' ? 'Подтверждено' : 'Отменено'
    }));
    
    exportToExcel(formattedBookings, `выбранные_бронирования_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Экспорт номеров
function exportRooms() {
    const data = adminRooms.map(room => ({
        'Название (RU)': room.name,
        'Название (EN)': room.nameEn,
        'Тип': room.type === 'penthouse' ? 'Пентхаус' : 
              room.type === 'luxe' ? 'Люкс' : 
              room.type === 'junior' ? 'Джуниор Сюит' : 'Стандарт',
        'Цена': `${room.price} руб./ночь`,
        'Площадь': room.area,
        'Вместимость': `${room.capacity} чел.`,
        'Статус': room.available ? 'Доступен' : 'Не доступен',
        'Количество фото': room.images ? room.images.length : 0,
        'Удобства (RU)': room.features ? room.features.join(', ') : '',
        'Удобства (EN)': room.featuresEn ? room.featuresEn.join(', ') : '',
        'Описание (RU)': room.description || '',
        'Описание (EN)': room.descriptionEn || ''
    }));
    
    exportToExcel(data, `номера_отеля_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Генерация отчета
function generateReport(reportType) {
    alert(`Генерация отчета: ${reportType}\nВ демо-версии создается файл Excel с примером данных`);
    
    let data = [];
    let fileName = '';
    
    switch(reportType) {
        case 'revenue':
            data = generateRevenueReport();
            fileName = 'отчет_по_выручке.xlsx';
            break;
        case 'occupancy':
            data = generateOccupancyReport();
            fileName = 'отчет_по_заполняемости.xlsx';
            break;
        case 'popularity':
            data = generatePopularityReport();
            fileName = 'отчет_популярность_номеров.xlsx';
            break;
        case 'cancellations':
            data = generateCancellationsReport();
            fileName = 'анализ_отмен.xlsx';
            break;
    }
    
    if (data.length > 0) {
        exportToExcel(data, fileName);
    }
}

// Генерация пользовательского отчета
function generateCustomReport() {
    const startDate = document.getElementById('customStartDate').value;
    const endDate = document.getElementById('customEndDate').value;
    const format = document.getElementById('customReportFormat').value;
    
    if (!startDate || !endDate) {
        alert('Пожалуйста, выберите период отчета');
        return;
    }
    
    // Фильтрация бронирований по дате
    const filteredBookings = adminBookings.filter(booking => {
        const bookingDate = new Date(booking.checkin);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return bookingDate >= start && bookingDate <= end;
    });
    
    if (filteredBookings.length === 0) {
        alert('Нет данных за выбранный период');
        return;
    }
    
    let data = [];
    
    switch(format) {
        case 'detailed':
            data = filteredBookings.map(booking => ({
                'ID': booking.id,
                'Гость': booking.guestName,
                'Номер': booking.roomName,
                'Заезд': booking.checkin,
                'Выезд': booking.checkout,
                'Ночей': booking.nights,
                'Взрослые/Дети': `${booking.adults || 2}/${booking.children || 0}`,
                'Питание': booking.breakfast ? 'Завтрак' : 'Нет',
                'Сумма': `${booking.totalPrice} руб.`,
                'Оплата': booking.paymentMethod === 'card' ? 'Карта' : 
                         booking.paymentMethod === 'qr' ? 'SBP/QR' : 'При заселении',
                'Статус': booking.status === 'confirmed' ? 'Подтверждено' : 'Отменено'
            }));
            break;
            
        case 'summary':
            const summary = {
                'Период': `${startDate} - ${endDate}`,
                'Всего бронирований': filteredBookings.length,
                'Подтверждено': filteredBookings.filter(b => b.status === 'confirmed').length,
                'Отменено': filteredBookings.filter(b => b.status === 'cancelled').length,
                'Общая выручка': `${filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()} руб.`,
                'Средняя цена бронирования': `${Math.round(filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0) / filteredBookings.length).toLocaleString()} руб.`,
                'Средняя продолжительность': `${Math.round(filteredBookings.reduce((sum, b) => sum + b.nights, 0) / filteredBookings.length)} ночей`
            };
            data = [summary];
            break;
            
        case 'analytics':
            const roomStats = {};
            filteredBookings.forEach(booking => {
                if (!roomStats[booking.roomName]) {
                    roomStats[booking.roomName] = {
                        'Номер': booking.roomName,
                        'Количество бронирований': 0,
                        'Общая выручка': 0
                    };
                }
                roomStats[booking.roomName]['Количество бронирований']++;
                roomStats[booking.roomName]['Общая выручка'] += booking.totalPrice;
            });
            
            data = Object.values(roomStats).map(stat => ({
                ...stat,
                'Общая выручка': `${stat['Общая выручка'].toLocaleString()} руб.`,
                'Средняя выручка за бронирование': `${Math.round(stat['Общая выручка'] / stat['Количество бронирований']).toLocaleString()} руб.`
            }));
            break;
    }
    
    exportToExcel(data, `пользовательский_отчет_${startDate}_${endDate}.xlsx`);
}

// Вспомогательные функции для отчетов
function generateRevenueReport() {
    // Генерация отчета по выручке на основе реальных данных
    const monthlyRevenue = {};
    
    adminBookings.forEach(booking => {
        const month = booking.checkin.substring(0, 7); // YYYY-MM
        if (!monthlyRevenue[month]) {
            monthlyRevenue[month] = 0;
        }
        monthlyRevenue[month] += booking.totalPrice;
    });
    
    const data = Object.keys(monthlyRevenue).map(month => {
        const [year, monthNum] = month.split('-');
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        return {
            'Месяц': monthNames[parseInt(monthNum) - 1] + ' ' + year,
            'Выручка': `${monthlyRevenue[month].toLocaleString()} руб.`,
            'Бронирования': adminBookings.filter(b => b.checkin.startsWith(month)).length
        };
    });
    
    return data.length > 0 ? data : [
        { 'Месяц': 'Январь 2024', 'Выручка': '450,000 руб.', 'Бронирования': 45 },
        { 'Месяц': 'Февраль 2024', 'Выручка': '520,000 руб.', 'Бронирования': 52 },
        { 'Месяц': 'Март 2024', 'Выручка': '610,000 руб.', 'Бронирования': 61 }
    ];
}

function generateOccupancyReport() {
    // Расчет заполняемости на основе реальных данных
    const roomStats = {};
    
    adminRooms.forEach(room => {
        const bookingsCount = adminBookings.filter(b => b.roomId == room.id).length;
        roomStats[room.name] = {
            'Номер': room.name,
            'Тип': room.type === 'penthouse' ? 'Пентхаус' : 
                  room.type === 'luxe' ? 'Люкс' : 
                  room.type === 'junior' ? 'Джуниор Сюит' : 'Стандарт',
            'Количество бронирований': bookingsCount,
            'Процент заполняемости': `${Math.min(100, Math.floor((bookingsCount / 30) * 100))}%`
        };
    });
    
    return Object.values(roomStats);
}

function generatePopularityReport() {
    const roomStats = {};
    
    adminBookings.forEach(booking => {
        if (!roomStats[booking.roomName]) {
            roomStats[booking.roomName] = 0;
        }
        roomStats[booking.roomName]++;
    });
    
    const data = Object.keys(roomStats).map(roomName => ({
        'Номер': roomName,
        'Количество бронирований': roomStats[roomName],
        'Процент от общего количества': `${Math.round((roomStats[roomName] / adminBookings.length) * 100)}%`
    }));
    
    return data.length > 0 ? data : [
        { 'Номер': 'Стандарт', 'Количество бронирований': 45, 'Процент от общего количества': '45%' },
        { 'Номер': 'Джуниор Сюит', 'Количество бронирований': 30, 'Процент от общего количества': '30%' },
        { 'Номер': 'Люкс', 'Количество бронирований': 20, 'Процент от общего количества': '20%' },
        { 'Номер': 'Пентхаус', 'Количество бронирований': 5, 'Процент от общего количества': '5%' }
    ];
}

function generateCancellationsReport() {
    // В демо-версии считаем, что 10% бронирований отменены
    const total = adminBookings.length;
    const cancelled = Math.floor(total * 0.1);
    
    return [
        { 'Показатель': 'Всего бронирований', 'Значение': total },
        { 'Показатель': 'Отменено бронирований', 'Значение': cancelled },
        { 'Показатель': 'Процент отмен', 'Значение': `${Math.round((cancelled / total) * 100)}%` },
        { 'Показатель': 'Основная причина отмен', 'Значение': 'Изменение планов' },
        { 'Показатель': 'Среднее время до отмены', 'Значение': '3 дня' }
    ];
}