window.onload = function () {
  let a = document.querySelector('div');
  console.log(a);
  a.addEventListener('click', function (event) {
    let wave = document.createElement('span');
    wave.style.left =event.clientX +'px';
    wave.style.top =event.clientY +'px';
    wave.classList = "wave";
    wave.style.backgroundColor=`#${Math.floor(Math.pow(16,3)*Math.random()).toString(16)}`
    console.log(`#${Math.floor(Math.pow(16,3)*Math.random()).toString(16)}`)
    a.appendChild(wave);
    setTimeout(function(){
      let spanList = document.querySelectorAll('span')
      console.log(spanList[0])
      // spanList[0].remove()
    },3000)
  });
  

}