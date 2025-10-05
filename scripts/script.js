
const tabRegister = document.getElementById('tab-register');
const tabLogin = document.getElementById('tab-login');
const formRegister = document.getElementById('form-register');
const formLogin = document.getElementById('form-login');
const goLogin = document.getElementById('go-login');
const goRegister = document.getElementById('go-register');

tabRegister.addEventListener('click', () => {
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  formRegister.classList.add('active');
  formLogin.classList.remove('active');
});

tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  formLogin.classList.add('active');
  formRegister.classList.remove('active');
});

goLogin.addEventListener('click', () => {
  tabLogin.click();
});

goRegister.addEventListener('click', () => {
  tabRegister.click();
});