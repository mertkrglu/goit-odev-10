import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 1. Arayüz elemanlarını seçiyoruz
const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minutesVal = document.querySelector('[data-minutes]');
const secondsVal = document.querySelector('[data-seconds]');

// 2. Global değişkenler
let userSelectedDate = null;
let timerId = null;

// 3. Flatpickr ayarları (Ödev dökümanındaki nesne baz alınmıştır)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    // Tarih doğrulama: Şimdiki zamandan küçükse hata ver
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      // Geçerli tarihse Start butonunu aktif et
      startBtn.disabled = false;
    }
  },
};

// Flatpickr'ı başlat
flatpickr(datetimePicker, options);

// 4. Start butonuna tıklandığında geri sayımı başlat
startBtn.addEventListener('click', () => {
  // Başlatıldığında buton ve input pasif olmalı
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const msDifference = userSelectedDate - currentTime;

    // Zaman bittiyse durdur
    if (msDifference <= 0) {
      clearInterval(timerId);
      updateTimerInterface(0, 0, 0, 0);
      return;
    }

    // Kalan zamanı hesapla ve arayüzü güncelle
    const { days, hours, minutes, seconds } = convertMs(msDifference);
    updateTimerInterface(days, hours, minutes, seconds);
  }, 1000);
});

// 5. Arayüzü güncelleyen fonksiyon
function updateTimerInterface(d, h, m, s) {
  daysVal.textContent = addLeadingZero(d);
  hoursVal.textContent = addLeadingZero(h);
  minutesVal.textContent = addLeadingZero(m);
  secondsVal.textContent = addLeadingZero(s);
}

// 6. Zaman Biçimlendirme (Başına 0 ekleme)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// 7. Zaman Hesaplama (Ödev dökümanındaki hazır fonksiyon)
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
