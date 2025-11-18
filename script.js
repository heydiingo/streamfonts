// Elements
const alertContainer = document.getElementById('alertContainer');
const alertVideo = document.getElementById('alertVideo');
const followerName = document.getElementById('followerName');

// Typing effect function
function typeText(element, text, speed=20){
  element.textContent = '';
  let i = 0;
  const interval = setInterval(()=>{
    element.textContent += text[i];
    i++;
    if(i >= text.length) clearInterval(interval);
  }, speed);
}

// Preload font
const pokemonGb = new FontFace('PokemonGb', 'url(https://cdn.jsdelivr.net/gh/heydiingo/streamfonts/PokemonGb-RAeo.woff)');
pokemonGb.load().then(f => {
  document.fonts.add(f);
  console.log('Font loaded');
  followerName.style.fontFamily = 'PokemonGb'; // assign after font is loaded
});

// Show follower alert
function showFollowerAlert(name, typingDelay=2000){
  // Limit name to 10 characters
  const shortName = name.length > 10 ? name.substring(0, 10) : name;

  alertContainer.style.opacity = 1;           // show container instantly
  alertVideo.currentTime = 0;
  alertVideo.play();
  
  // hide container when video ends
  alertVideo.onended = () => {
    alertContainer.style.opacity = 0;
    followerName.textContent = '';
  };

  followerName.style.fontFamily = 'PokemonGb'; // always RAeo font
  setTimeout(()=> typeText(followerName, shortName, 70), typingDelay); // delayed typing
}

// Listen for SE events
window.addEventListener('onWidgetLoad', ()=>{
  console.log('Widget loaded');
  window.addEventListener('onEventReceived', e=>{
    console.log('Event received:', e.detail);
    if(e.detail.listener === 'follower-latest'){
      const name = e.detail.event.displayName || 'Unknown';
      showFollowerAlert(name, 3200);
    }
  });
});

// Preview fallback
if(window.location.href.includes('preview=true')){
  showFollowerAlert('SampleFollower', 500);
}
