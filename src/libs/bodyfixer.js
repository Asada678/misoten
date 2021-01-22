
const bodyfixer = (condition) => {
  const body = document.querySelector("body");
  // console.log('condition:', condition);
  // console.log('body.classList:', body.classList);
  if (condition) {
    if(body.classList.contains('fixed')) return;
    const scrollY = window.scrollY;
    body.style.top = `-${scrollY}px`;
    body.classList.add("fixed");
  } else {
    const scrollY = body.style.top;
    body.classList.remove("fixed");
    body.style.top = 0;
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    // document.querySelector('.stretch').classList.remove('stretch');
  }
}

export default bodyfixer;