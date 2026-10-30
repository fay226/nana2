(() => {
 const root=document.getElementById("about-flipbook");
 if(!root)return;
 const pages=[...root.querySelectorAll(".about-page")];
 const prev=document.querySelector(".about-prev");
 const next=document.querySelector(".about-next");
 const status=document.querySelector(".about-spread-count");
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
 const total=Math.ceil(pages.length/2);
 let book=null,spread=0;
 // Make the illustrated book keyboard accessible as well as clickable.
 root.tabIndex=0;
 // The custom page.mp3 takes priority. Existing book.mp3 is a temporary fallback.
 const pageSound=new Audio("assets/sounds/page.mp3");
 const fallbackSound=new Audio("assets/sounds/book.mp3");
 pageSound.preload="auto";
 fallbackSound.preload="auto";
 pageSound.volume=fallbackSound.volume=0.22;
 let useFallback=false;
 pageSound.addEventListener("error",()=>{useFallback=true;});
 function playPageSound(){
   const sound=useFallback?fallbackSound:pageSound;
   sound.pause();
   sound.currentTime=0;
   sound.play().catch(()=>{
     if(!useFallback){
       useFallback=true;
       fallbackSound.currentTime=0;
       fallbackSound.play().catch(()=>{});
     }
   });
 }
 function update(page) {
   spread=Math.max(0,Math.min(total-1,Math.floor(page/2)));
   prev.disabled=spread===0;
   next.disabled=spread===total-1;
   status.textContent=`Spread ${spread+1} of ${total}`;
 }
 function staticSpread(n) {
   root.classList.add("is-fallback");
   n=Math.max(0,Math.min(total-1,n));
   pages.forEach((page,i)=>page.classList.toggle("is-visible",i===n*2||i===n*2+1));
   update(n*2);
 }
 if(window.St?.PageFlip && !reduce.matches) {
  try {
   book=new window.St.PageFlip(root,{
     width:370,height:450,size:"stretch",minWidth:100,maxWidth:370,
     minHeight:122,maxHeight:450,showCover:false,usePortrait:false,
     autoSize:false,drawShadow:true,maxShadowOpacity:.25,
     flippingTime:750,clickEventForward:true,mobileScrollSupport:false
   });
   book.loadFromHTML(pages);
   book.on("flip",e=>{update(e.data);playPageSound();});
  } catch(error) {
   console.warn("PageFlip unavailable; using static spreads.",error);
   book=null;
  }
 }
 if(!book)staticSpread(0);
 prev.addEventListener("click",()=>{if(prev.disabled)return;if(book)book.flipPrev();else {staticSpread(spread-1);playPageSound();}});
 next.addEventListener("click",()=>{if(next.disabled)return;if(book)book.flipNext();else {staticSpread(spread+1);playPageSound();}});
 // In reduced-motion/static mode, the left and right halves still work as page controls.
 root.addEventListener("click",event=>{
  if(book)return;
  const x=event.clientX-root.getBoundingClientRect().left;
  if(x<root.clientWidth/2)prev.click();else next.click();
 });
 root.addEventListener("keydown",event=>{
  if(event.key==="ArrowRight"){event.preventDefault();next.click()}
  if(event.key==="ArrowLeft"){event.preventDefault();prev.click()}
 });
 update(0);
})();
