// document.getElementById('mobileNav').addEventListener('click', function() {
//     console.log("clicked")
//     document.getElementById('slidingNav').classList.add('open');
//   });



navButton = document.querySelector('pancake-menu');
console.log(navButton)

navButton.addEventListener('click', function(){
    console.log("Nav Button Clicked")
})
  
  document.getElementById('closeNavButton').addEventListener('click', function() {
    document.getElementById('slidingNav').classList.remove('open');
  });
