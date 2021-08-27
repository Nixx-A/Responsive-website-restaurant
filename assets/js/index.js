/*========== show menu ==========*/
const showMenu = (toogleId, navId) => {
  const toogle = document.getElementById(toogleId);
  const nav = document.getElementById(navId);

  if (toogle && nav) {
    toogle.addEventListener('click', ()=>{
      nav.classList.toggle('show-menu')
    })
  }
}
showMenu('nav-toggle','nav-menu')


/*========== remove menu mobile ==========*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
  const nav = document.getElementById('nav-menu');

  nav.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*========== scroll section active link ==========*/
const sections = document.querySelectorAll('section[id]')
// console.log(sections);

function scrollActive(){
  const scrollY = window.pageYOffset;
  // console.log(scrollY);

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight;
    // console.log(sectionHeight);
    const sectionTop = current.offsetTop  -450;
    // console.log(sectionTop)
    const sectionId = current.getAttribute('id');
    // console.log(sectionId);

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*========== change background header ==========*/
function scrollHeader(){
  const scrollTop = document.getElementById('scroll-top');

  if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); 
  else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollHeader);

/*========== dark/light theme ==========*/
const themeButton = document.getElementById('theme-button');
const darkTheme = "dark-theme";
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'ligth';
const getCurrentIcon = () => document.body.classList.contains(darkTheme) ? 'bx-moon' : 'bx-sun';

if(selectedTheme){
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedTheme === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', ()=>{
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())

})

/*========== scroll reveal ==========*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '50px',
  duration: 800,
  reset: false
});

sr.reveal(`.home, .about, .menu__card, .comments__card, .contact, .footer__title, .footer__subtitle, .footer__btn, .footer__logo`, {
  interval: 200
})


/*========== swiper & fetch ==========*/


const fetchData = fetch('https://jsonplaceholder.typicode.com/users/1/posts')
 .then(response => response.json())
 .then(data => readFetch(data));


 let wrapper = document.querySelector('.swiper-wrapper');
let template = "";
const readFetch = data =>{
  data.forEach(item => {
    template += `<div class="swiper-slide">
                  <div class="comments__container">
                    <div class="comments__data">
                      <div class="comments__card">
                        <img src="assets/img/pexels-thgusstavo-santana-1933873.jpg" class="comments__img" alt="">
                        <div class="comments__text">${item.body}</div>
                      </div>
                    </div>
                  </div>
                </div>`
    
    
    wrapper.innerHTML = template;
    
    
    // I don't know how to read fetch apis :(
  })
}
// console.log(wrapper)

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 300,
});
