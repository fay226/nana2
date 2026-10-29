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
     width:390,height:520,size:"stretch",minWidth:120,maxWidth:390,
     minHeight:160,maxHeight:520,showCover:false,usePortrait:false,
     autoSize:true,drawShadow:true,maxShadowOpacity:.25,
     flippingTime:750,clickEventForward:false,mobileScrollSupport:false
   });
   book.loadFromHTML(pages);
   book.on("flip",e=>update(e.data));
  } catch(error) {
   console.warn("PageFlip unavailable; using static spreads.",error);
   book=null;
  }
 }
 if(!book)staticSpread(0);
 prev.addEventListener("click",()=>{if(book)book.flipPrev();else staticSpread(spread-1)});
 next.addEventListener("click",()=>{if(book)book.flipNext();else staticSpread(spread+1)});
 root.addEventListener("keydown",event=>{
  if(event.key==="ArrowRight"){event.preventDefault();next.click()}
  if(event.key==="ArrowLeft"){event.preventDefault();prev.click()}
 });
 update(0);
})();
