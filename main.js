const tabs = document.querySelectorAll('.tabs .tab');
const eventCards = document.querySelectorAll('.event-card');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        eventCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'flex';
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

const acceptAiBtn = document.getElementById('acceptAiBtn');
const dismissAiBtn = document.getElementById('dismissAiBtn');
const aiBannerBox = document.getElementById('aiBannerBox');

acceptAiBtn.addEventListener('click', () => {
    alert('Đã chấp thuận đề xuất AI! Lịch uống thuốc tẩy giun ngày 18/11/2025 đã được thêm vào hệ thống.');
    aiBannerBox.style.display = 'none';
});

dismissAiBtn.addEventListener('click', () => {
    aiBannerBox.style.display = 'none';
});

const modal = document.getElementById('appointmentModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

const saveAppointmentBtn = document.getElementById('saveAppointmentBtn');
const eventsContainer = document.getElementById('eventsContainer');

saveAppointmentBtn.addEventListener('click', () => {
    const title = document.getElementById('inputTitle').value.trim();
    const pet = document.getElementById('inputPet').value;
    const time = document.getElementById('inputTime').value;
    const type = document.getElementById('inputType').value;

    if (!title) {
        alert('Vui lòng nhập tên lịch hẹn!');
        return;
    }

    const newCard = document.createElement('div');
    newCard.className = type === 'home' ? 'event-card orange-border' : 'event-card';
    newCard.setAttribute('data-category', type);

    newCard.innerHTML = `
        <div class="event-top">
            <div class="event-info">
                <div class="event-title">
                    <h3>${title}</h3>
                    <p>Dành cho: ${pet}</p>
                </div>
            </div>
            <span class="status-badge ${type === 'home' ? 'status-orange' : 'status-green'}">${type === 'home' ? 'Tự động tại nhà' : 'Mới đặt'}</span>
        </div>
        <div class="event-details-grid">
            <div><b>Thời gian:</b> ${time ? time : 'Sắp diễn ra'}</div>
            <div><b>Địa điểm:</b> Theo yêu cầu</div>
            <div><b>Trạng thái:</b> Đã tạo thành công</div>
        </div>
        <div class="event-actions">
            <button class="btn-sm cancel-btn">Hủy lịch</button>
            <button class="btn-sm btn-sm-primary">Xem chi tiết</button>
        </div>
    `;

  
    document.getE  eventsContainer.prepend(newCard);
    modal.classList.remove('active');
    lementById('inputTitle').value = '';
    alert('Tạo lịch nhắc / đặt hẹn thành công!');
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cancel-btn')) {
        if (confirm('Bạn có chắc chắn muốn hủy lịch hẹn này không?')) {
            e.target.closest('.event-card').remove();
        }
    }
    if (e.target.classList.contains('done-alarm')) {
        const card = e.target.closest('.event-card');
        const badge = card.querySelector('.status-badge');
        badge.textContent = 'Đã hoàn thành hôm nay';
        badge.className = 'status-badge status-green';
        e.target.textContent = 'Đã uống';
        e.target.disabled = true;
    }
    if (e.target.classList.contains('dismiss-alarm')) {
        e.target.closest('.event-card').style.opacity = '0.5';
        alert('Đã tắt chuông nhắc nhở trong hôm nay.');
    }
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    eventCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(keyword)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});