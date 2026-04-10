import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Form elemanını seçiyoruz
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault(); // Sayfanın yenilenmesini durdurur

  // Formdaki değerleri alıyoruz
  const delay = Number(event.currentTarget.elements.delay.value);
  const state = event.currentTarget.elements.state.value;

  // Promise üreten fonksiyonu çağırıyoruz
  createPromise(delay, state)
    .then(delay => {
      // Başarılı (Fulfilled) durumu
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      // Başarısız (Rejected) durumu
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  // Formu sıfırla (Kullanıcı yeni bildirim ekleyebilsin)
  form.reset();
});

// Promise üreten ana fonksiyon
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    // Kullanıcının girdiği 'delay' süresi kadar beklet
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // then() bloğuna gider
      } else {
        reject(delay); // catch() bloğuna gider
      }
    }, delay);
  });
}
