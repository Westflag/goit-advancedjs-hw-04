import{a as h,S as p,i as c}from"./assets/vendor-KnZd4sWe.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="49152661-7859b232d7a733d1d995afa08",g="https://pixabay.com/api/";async function u(a,s=1){const o=await h.get(g,{params:{key:m,q:a,image_type:"photo",per_page:15,page:s}});if(o.data.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please, try again!");return{hits:o.data.hits,totalHits:o.data.totalHits}}function f(a,s,o=!1){o||(s.innerHTML=""),a.forEach(r=>{const e=document.createElement("div");e.classList.add("image-card"),e.innerHTML=`
            <a href="${r.largeImageURL}" data-lightbox="gallery">
                 <img src="${r.webformatURL}" alt="${r.tags}" class="thumbnail" />
            </a>
            <div class="image-info">
                <div class="info-field">
                  <h3>Likes</h3>
                  <p>${r.likes}</p>
                </div>

                <div class="info-field">
                  <h3>Views</h3>
                  <p>${r.views}</p>
                </div>
                <div class="info-field">
                  <h3>Comments</h3>
                  <p> ${r.comments}</p>
                </div>
                <div class="info-field">
                  <h3>Downloads</h3>
                  <p>${r.downloads}</p>
                </div>
            </div>
        `,s.appendChild(e)}),new p("[data-lightbox='gallery']").refresh()}function v(){const a=document.querySelector(".image-card");if(a){const s=a.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#search-form"),s=document.querySelector("#search-input"),o=document.querySelector("#gallery"),r=document.querySelector("#loader"),e=document.querySelector("#load-more");let t="",i=1,d=0;a.addEventListener("submit",async n=>{if(n.preventDefault(),t=s.value.trim(),!t){c.error({title:"Error",message:"Search query cannot be empty!"});return}i=1,r.style.display="block",e.style.display="none";try{const{hits:l,totalHits:y}=await u(t,i);d=y,f(l,o),l.length<d&&(e.style.display="block")}catch(l){c.warning({title:"No Results",message:l.message}),e.style.display="none"}finally{r.style.display="none"}}),e.addEventListener("click",async()=>{i+=1,r.style.display="block";try{const{hits:n}=await u(t,i);f(n,o,!0),v(),i*15>=d&&(e.style.display="none",c.info({title:"End",message:"We're sorry, but you've reached the end of search results."}))}catch(n){c.warning({title:"No Results",message:n.message}),e.style.display="none"}finally{r.style.display="none"}})});
//# sourceMappingURL=index.js.map
