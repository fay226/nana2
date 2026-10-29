(() => {
 const root=document.getElementById("about-flipbook");
 if(!root)return;
 const pages=[...root.querySelectorAll(".about-page")];
 const prev=document.querySelector(".about-prev"),next=document.querySelector(".about-next"),counter=document.querySelector(".about-spread-count");
 const reduce=matchMedia("(prefers-reduced-motion: reduce)");
 let book=null,index=0;
 function render(n){index=Math.max(0,Math.min(2,n));prev.disabled=index===0;next.disabled=index===2;counter.textContent=`Spread ${index+1} of 3`;}
 function fallback(n){root.classList.add("is-fallback");pages.forEach((p,i)=>p.classList.toggle("is-visible",i===n*2||i===n*2+1));render(n)}
 if(window.St?.PageFlip && !reduce.matches){
   try{
    book=new window.St.PageFlip(root,{width:375,height:500,size:"stretch",minWidth:100,maxWidth:375,minHeight:134,maxHeight:500,showCover:false,usePortrait:false,autoSize:true,drawShadow:true,maxShadowOpacity:.25,flippingTime:700,clickEventForward:false,mobileScrollSupport:false});
    book.loadFromHTML(pages);
    book.on("flip",e=>render(Math.floor(e.data/2)));
   }catch(err){console.warn("PageFlip could not initialize; using static spreads.",err);book=null}
 }
 if(!book)fallback(0);
 prev.addEventListener("click",()=>{if(book)book.flipPrev();else fallback(index-1)});
 next.addEventListener("click",()=>{if(book)book.flipNext();else fallback(index+1)});
 render(0);
})();
