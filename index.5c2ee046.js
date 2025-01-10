function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,i={},r={},n=t.parcelRequire94c2;null==n&&((n=function(e){if(e in i)return i[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return i[e]=n,t.call(n.exports,n,n.exports),n.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequire94c2=n),(0,n.register)("9Q56f",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>i,set:e=>i=e,enumerable:!0,configurable:!0});var i,r=new Map;i=function(e,t){for(var i=0;i<t.length-1;i+=2)r.set(t[i],{baseUrl:e,path:t[i+1]})}}),n("9Q56f").register(new URL("",import.meta.url).toString(),JSON.parse('["k6mHe","index.5c2ee046.js","eyyUD","icons.c5b0f01c.svg"]'));const s="https://forkify-api.jonas.io/api/v2/recipes/",a="fd1da89b-3292-4a2d-bdda-3cb233acaa38",o=async function(e,t){let i=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e);try{let e=await Promise.race([i,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 seconds"))},1e4)})]),t=await e.json();if(!e.ok)throw Error(`${t.message} (${e.status})`);return t}catch(e){throw e}},c={recipe:{id:"id",title:"title",publisher:"publisher",sourceUrl:"source_url",image:"image_url",servings:2,cookingTime:0,ingredients:[],bookmarked:!1},search:{query:"",results:[],page:1,resultsPerPage:10},bookmarks:[]},d=function(e){let{recipe:t}=e.data;return c.recipe={id:t.id,title:t.title,publisher:t.publisher,sourceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredients:t.ingredients,...t.key&&{key:t.key}},c.recipe},l=async function(e){try{let t=await o(`${s}${e}?key=${a}`);if(!t)return;c.recipe=d(t),c.bookmarks.some(t=>t.id===e)?c.recipe.bookmarked=!0:c.recipe.bookmarked=!1}catch(e){throw e}},u=async function(e){try{c.search.query=e;let t=await o(`${s}?search=${e}&key=${a}`);c.search.results=t.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}}))}catch(e){throw e}},h=function(e=c.search.page){c.search.page=e;let t=(e-1)*c.search.resultsPerPage,i=e*c.search.resultsPerPage;return c.search.results.slice(t,i)},f=function(e){c.recipe.ingredients.forEach(t=>{t.quantity=t.quantity*e/c.recipe.servings}),c.recipe.servings=e},p=function(){localStorage.setItem("bookmarks",JSON.stringify(c.bookmarks))},g=function(e){c.bookmarks.push(e),e.id===c.recipe.id&&(c.recipe.bookmarked=!0),p()},m=function(e){let t=c.bookmarks.findIndex(t=>t.id===e);c.bookmarks.splice(t,1),e===c.recipe.id&&(c.recipe.bookmarked=!1),p()};!function(){let e=localStorage.getItem("bookmarks");e&&(c.bookmarks=JSON.parse(e))}();const v=async function(e){try{let t=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=String(e[1]).split(",").map(e=>e.trim());if(3!==t.length)throw Error("Wrong ingredient input! Please use the correct format.");let[i,r,n]=t;return{quantity:i?+i:null,unit:r,description:n}}),i={title:e.title,source_url:e.sourceUrl,image_url:e.image,publisher:e.publisher,cooking_time:+e.cookingTime,servings:+e.servings,ingredients:t},r=await o(`${s}?key=${a}`,i);c.recipe=d(r),g(c.recipe)}catch(e){throw e}};var b={};b=new URL("icons.c5b0f01c.svg",import.meta.url).toString();class _{render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this.data=e;let i=this.generateMarkup();if(!t)return i;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",i)}update(e){this.data=e;let t=this.generateMarkup(),i=Array.from(document.createRange().createContextualFragment(t).querySelectorAll("*")),r=Array.from(this.parentElement.querySelectorAll("*"));i.forEach((e,t)=>{let i=r[t];e.isEqualNode(i)||e.firstChild?.nodeValue.trim()===""||(i.textContent=e.textContent),e.isEqualNode(i)||Array.from(e.attributes).forEach(e=>i.setAttribute(e.name,e.value))})}clear(){this.parentElement.innerHTML=""}renderSpinner(){let t=`
          <div class="spinner">
            <svg>
              <use href="${e(b)}#icon-loader"></use>
            </svg>
          </div> 
    `;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",t)}renderError(t=this.errorMessage){let i=`
          <div class="error">
            <div>
              <svg>
                <use href="${e(b)}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${t}</p>
          </div>
    `;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",i)}renderSuccessMessage(t=this.successMessage){let i=`
          <div class="message">
            <div>
              <svg>
                <use href="${e(b)}#icon-smile"></use>
              </svg>
            </div>
            <p>${t}</p>
          </div>
    `;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",i)}constructor(){this.errorMessage="An error occurred!",this.successMessage="Operation successful!"}}var k={};!function(e){function t(){return Error("Parameters must be integer")}function i(){return Error("Invalid argument")}function r(){return Error("Division by Zero")}function n(e,n){var a=u,o=h;let c=h;if(null!=e){if(void 0!==n){if("bigint"==typeof e)a=e;else{if(isNaN(e))throw i();if(0!=e%1)throw t();a=BigInt(e)}if("bigint"==typeof n)o=n;else{if(isNaN(n))throw i();if(0!=n%1)throw t();o=BigInt(n)}c=a*o}else if("object"==typeof e){if("d"in e&&"n"in e)a=BigInt(e.n),o=BigInt(e.d),"s"in e&&(a*=BigInt(e.s));else if(0 in e)a=BigInt(e[0]),1 in e&&(o=BigInt(e[1]));else if("bigint"==typeof e)a=e;else throw i();c=a*o}else if("number"==typeof e){if(isNaN(e))throw i();if(0>e&&(c=-h,e=-e),0==e%1)a=BigInt(e);else if(0<e){n=1;var d=0,l=1,f=1;let t=1;for(1<=e&&(n=10**Math.floor(1+Math.log10(e)),e/=n);1e7>=l&&1e7>=t;)if(e===(o=(d+f)/(l+t))){1e7>=l+t?(a=d+f,o=l+t):t>l?(a=f,o=t):(a=d,o=l);break}else e>o?(d+=f,l+=t):(f+=d,t+=l),1e7<l?(a=f,o=t):(a=d,o=l);a=BigInt(a)*BigInt(n),o=BigInt(o)}}else if("string"==typeof e){if(o=0,d=n=a=u,l=f=h,null===(e=e.replace(/_/g,"").match(/\d+|./g)))throw i();if("-"===e[o]?(c=-h,o++):"+"===e[o]&&o++,e.length===o+1?n=s(e[o++],c):"."===e[o+1]||"."===e[o]?("."!==e[o]&&(a=s(e[o++],c)),(++o+1===e.length||"("===e[o+1]&&")"===e[o+3]||"'"===e[o+1]&&"'"===e[o+3])&&(n=s(e[o],c),f=g**BigInt(e[o].length),o++),("("===e[o]&&")"===e[o+2]||"'"===e[o]&&"'"===e[o+2])&&(d=s(e[o+1],c),l=g**BigInt(e[o+1].length)-h,o+=3)):"/"===e[o+1]||":"===e[o+1]?(n=s(e[o],c),f=s(e[o+2],h),o+=3):"/"===e[o+3]&&" "===e[o+1]&&(a=s(e[o],c),n=s(e[o+2],c),f=s(e[o+4],h),o+=5),e.length<=o)c=a=d+(o=f*l)*a+l*n;else throw i()}else if("bigint"==typeof e)c=a=e,o=h;else throw i()}if(o===u)throw r();m.s=c<u?-h:h,m.n=a<u?-a:a,m.d=o<u?-o:o}function s(e,t){try{e=BigInt(e)}catch(e){throw i()}return e*t}function a(e){return"bigint"==typeof e?e:Math.floor(e)}function o(e,t){if(t===u)throw r();let i=Object.create(l.prototype);i.s=e<u?-h:h;let n=d(e=e<u?-e:e,t);return i.n=e/n,i.d=t/n,i}function c(e){let t={},i=e,r=f,n=p-h;for(;n<=i;){for(;i%r===u;)i/=r,t[r]=(t[r]||u)+h;n+=h+f*r++}return i!==e?1<i&&(t[i]=(t[i]||u)+h):t[e]=(t[e]||u)+h,t}function d(e,t){if(!e)return t;if(!t)return e;for(;;){if(!(e%=t))return t;if(!(t%=e))return e}}function l(e,t){if(n(e,t),!(this instanceof l))return o(m.s*m.n,m.d);e=d(m.d,m.n),this.s=m.s,this.n=m.n/e,this.d=m.d/e}"undefined"==typeof BigInt&&(BigInt=function(e){if(isNaN(e))throw Error("");return e});let u=BigInt(0),h=BigInt(1),f=BigInt(2),p=BigInt(5),g=BigInt(10),m={s:h,n:u,d:h};l.prototype={s:h,n:u,d:h,abs:function(){return o(this.n,this.d)},neg:function(){return o(-this.s*this.n,this.d)},add:function(e,t){return n(e,t),o(this.s*this.n*m.d+m.s*this.d*m.n,this.d*m.d)},sub:function(e,t){return n(e,t),o(this.s*this.n*m.d-m.s*this.d*m.n,this.d*m.d)},mul:function(e,t){return n(e,t),o(this.s*m.s*this.n*m.n,this.d*m.d)},div:function(e,t){return n(e,t),o(this.s*m.s*this.n*m.d,this.d*m.n)},clone:function(){return o(this.s*this.n,this.d)},mod:function(e,t){if(void 0===e)return o(this.s*this.n%this.d,h);if(n(e,t),u===m.n*this.d)throw r();return o(this.s*m.d*this.n%(m.n*this.d),m.d*this.d)},gcd:function(e,t){return n(e,t),o(d(m.n,this.n)*d(m.d,this.d),m.d*this.d)},lcm:function(e,t){return n(e,t),m.n===u&&this.n===u?o(u,h):o(m.n*this.n,d(m.n,this.n)*d(m.d,this.d))},inverse:function(){return o(this.s*this.d,this.n)},pow:function(e,t){if(n(e,t),m.d===h)return m.s<u?o((this.s*this.d)**m.n,this.n**m.n):o((this.s*this.n)**m.n,this.d**m.n);if(this.s<u)return null;e=c(this.n),t=c(this.d);let i=h,r=h;for(let t in e)if("1"!==t){if("0"===t){i=u;break}if(e[t]*=m.n,e[t]%m.d!==u)return null;e[t]/=m.d,i*=BigInt(t)**e[t]}for(let e in t)if("1"!==e){if(t[e]*=m.n,t[e]%m.d!==u)return null;t[e]/=m.d,r*=BigInt(e)**t[e]}return m.s<u?o(r,i):o(i,r)},log:function(e,t){if(n(e,t),this.s<=u||m.s<=u)return null;var i={};e=c(m.n);let r=c(m.d);t=c(this.n);let s=c(this.d);for(var a in r)e[a]=(e[a]||u)-r[a];for(var l in s)t[l]=(t[l]||u)-s[l];for(var h in e)"1"!==h&&(i[h]=!0);for(var f in t)"1"!==f&&(i[f]=!0);for(let r in l=a=null,i)if(h=e[r]||u,i=t[r]||u,h===u){if(i!==u)return null}else if(f=d(i,h),i/=f,h/=f,null===a&&null===l)a=i,l=h;else if(i*l!=a*h)return null;return null!==a&&null!==l?o(a,l):null},equals:function(e,t){return n(e,t),this.s*this.n*m.d==m.s*m.n*this.d},lt:function(e,t){return n(e,t),this.s*this.n*m.d<m.s*m.n*this.d},lte:function(e,t){return n(e,t),this.s*this.n*m.d<=m.s*m.n*this.d},gt:function(e,t){return n(e,t),this.s*this.n*m.d>m.s*m.n*this.d},gte:function(e,t){return n(e,t),this.s*this.n*m.d>=m.s*m.n*this.d},compare:function(e,t){return n(e,t),(u<(e=this.s*this.n*m.d-m.s*m.n*this.d))-(e<u)},ceil:function(e){return e=g**BigInt(e||0),o(a(this.s*e*this.n/this.d)+(e*this.n%this.d>u&&this.s>=u?h:u),e)},floor:function(e){return e=g**BigInt(e||0),o(a(this.s*e*this.n/this.d)-(e*this.n%this.d>u&&this.s<u?h:u),e)},round:function(e){return e=g**BigInt(e||0),o(a(this.s*e*this.n/this.d)+this.s*((this.s>=u?h:u)+e*this.n%this.d*f>this.d?h:u),e)},roundTo:function(e,t){n(e,t);var i=this.n*m.d;return t=i%(e=this.d*m.n),i=a(i/e),t+t>=e&&i++,o(this.s*i*m.n,m.d)},divisible:function(e,t){return n(e,t),!(!(m.n*this.d)||this.n*m.d%(m.n*this.d))},valueOf:function(){return Number(this.s*this.n)/Number(this.d)},toString:function(e){let t=this.n,i=this.d;e=e||15;e:{for(r=i;r%f===u;r/=f);for(;r%p===u;r/=p);if(r===h)r=u;else{for(var r,n=g%r,s=1;n!==h;s++)if(n=n*g%r,2e3<s){r=u;break e}r=BigInt(s)}}e:{n=h,s=g;var o=r;let e=h;for(;o>u;s=s*s%i,o>>=h)o&h&&(e=e*s%i);for(o=0,s=e;300>o;o++){if(n===s){n=BigInt(o);break e}n=n*g%i,s=s*g%i}n=0}if(s=n,n=(this.s<u?"-":"")+a(t/i),(t=t%i*g)&&(n+="."),r){for(e=s;e--;)n+=a(t/i),t%=i,t*=g;for(n+="(",e=r;e--;)n+=a(t/i),t%=i,t*=g;n+=")"}else for(;t&&e--;)n+=a(t/i),t%=i,t*=g;return n},toFraction:function(e){let t=this.n,i=this.d,r=this.s<u?"-":"";if(i===h)r+=t;else{let n=a(t/i);e&&n>u&&(r+=n,r+=" ",t%=i),r=r+t+"/"+i}return r},toLatex:function(e){let t=this.n,i=this.d,r=this.s<u?"-":"";if(i===h)r+=t;else{let n=a(t/i);e&&n>u&&(r+=n,t%=i),r=r+"\\frac{"+t+"}{"+i+"}"}return r},toContinued:function(){let e=this.n,t=this.d,i=[];do{i.push(a(e/t));let r=e%t;e=t,t=r}while(e!==h)return i},simplify:function(e){e=BigInt(1/(e||.001)|0);let t=this.abs(),i=t.toContinued();for(let n=1;n<i.length;n++){let s=o(i[n-1],h);for(var r=n-2;0<=r;r--)s=s.inverse().add(i[r]);if((r=s.sub(t)).n*e<r.d)return s.mul(this.s)}return this}},"function"==typeof define&&define.amd?define([],function(){return l}):(Object.defineProperty(l,"__esModule",{value:!0}),l.default=l,l.Fraction=l,k=l)}(0);var y=new class extends _{addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}addHandlerUpdateServings(e){this.parentElement.addEventListener("click",function(t){let i=t.target.closest(".btn--update");if(!i||!i.dataset.updateTo)return;let{updateTo:r}=i.dataset;+r>0&&e(+r)})}addHandlerAddBookmark(e){this.parentElement.addEventListener("click",function(t){t.target.closest(".btn--bookmark")&&e()})}generateMarkup(){let t=this.data;return`<figure class="recipe__fig">
          <img src="${t.image}" alt="${t.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${t.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(b)}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${t.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(b)}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${t.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update" data-update-to="${t.servings-1}">
                <svg>
                  <use href="${e(b)}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update" data-update-to="${t.servings+1}">
                <svg>
                  <use href="${e(b)}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this.data.key?"":"hidden"}">
            <svg>
              <use href="${e(b)}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${e(b)}#icon-bookmark${t.bookmarked?"-fill":""}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${t.ingredients.map(this.generateIngredients).join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${t.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${t.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${e(b)}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`}generateIngredients(t){return`<li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${e(b)}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${t.quantity?new(e(k))(t.quantity).toFraction():""}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${t.unit}</span>
            ${t.description}
          </div>
        </li>`}constructor(...e){super(...e),this.parentElement=document.querySelector(".recipe"),this.errorMessage="We could not find that recipe. Please try another one!",this.successMessage="It's ok!"}},w=new class extends _{getQuery(){let e=this.searchField.value;return this.clearInput(),e}clearInput(){this.searchField.value=""}addHandlerSearch(e){this.parentElement.addEventListener("submit",e)}generateMarkup(){return""}constructor(...e){super(...e),this.parentElement=document.querySelector(".search"),this.searchField=this.parentElement.querySelector(".search__field")}},E=new class extends _{generateMarkup(){let t=window.location.hash.slice(1);return`
                  <li class="preview">
                    <a class="preview__link ${this.data.id===t?"preview__link--active":""}" href="#${this.data.id}">
                      <figure class="preview__fig">
                        <img src="${this.data.image}" alt="${this.data.title}" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          ${this.data.title}
                        </h4>
                        <p class="preview__publisher">${this.data.publisher}</p>
                         <div class="recipe__user-generated ${this.data.key?"":"hidden"}">
                          <svg>
                            <use href="${e(b)}#icon-user"></use>
                          </svg>
                        </div>
                      </div>
                    </a>
                  </li>              

    `}constructor(...e){super(...e),this.parentElement=document.querySelector(".d")}},$=new class extends _{generateMarkup(){return this.data.map(e=>E.render(e,!1)).join("")}constructor(...e){super(...e),this.parentElement=document.querySelector(".results"),this.errorMessage="No recipes found for your query! Please try again."}},S=new class extends _{addHandlerClick(e){this.parentElement.addEventListener("click",function(t){t.preventDefault();let i=t.target;if(!i)return;let r=i.closest(".btn--inline");r&&r.dataset.goto&&e(parseInt(r.dataset.goto,10))})}generateMarkup(){let t=`
    <button data-goto="${this.data.page+1}" class="btn--inline pagination__btn--next">
              <span>Page ${this.data.page+1}</span>
              <svg class="search__icon">
                <use href="${e(b)}#icon-arrow-right"></use>
              </svg>
            </button>
            `,i=`
     <button data-goto="${this.data.page-1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${e(b)}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this.data.page-1}</span>
            </button>
    `,r=Math.ceil(this.data.results.length/this.data.resultsPerPage);return 1===this.data.page&&r>1?t:this.data.page===r&&r>1?i:this.data.page<r?i+t:""}constructor(...e){super(...e),this.parentElement=document.querySelector(".pagination")}},I=new class extends _{addHandlerRender(e){window.addEventListener("load",e)}generateMarkup(){return this.data.map(e=>E.render(e,!1)).join("")}constructor(...e){super(...e),this.parentElement=document.querySelector(".bookmarks__list"),this.errorMessage="No bookmarks yet. Find a good recipe to bookmark!"}},M=new class extends _{toggleWindow(){this.overlay.classList.toggle("hidden"),this.window.classList.toggle("hidden")}addHandlerShowWindow(){this.btnOpen.addEventListener("click",()=>{this.toggleWindow()})}addHandlerCloseWindow(){this.btnClose.addEventListener("click",()=>{this.toggleWindow()})}addHandlerUpload(e){this.parentElement.addEventListener("submit",t=>{t.preventDefault(),e(Object.fromEntries([...new FormData(this.parentElement)]))})}generateMarkup(){return""}constructor(...e){super(...e),this.parentElement=document.querySelector(".upload"),this.window=document.querySelector(".add-recipe-window"),this.overlay=document.querySelector(".overlay"),this.btnOpen=document.querySelector(".nav__btn--add-recipe"),this.btnClose=document.querySelector(".btn--close-modal"),this.successMessage="Recipe was successfully uploaded."}};document.querySelector(".header__logo").addEventListener("click",e=>{e.preventDefault(),window.location.href="https://mprskalo01.github.io/forkify-typescript-project/"});const B=async function(){try{let e=window.location.hash.slice(1);if(!e)return;y.renderSpinner(),$.update(h()),I.update(c.bookmarks),await l(e),y.render(c.recipe)}catch(e){y.renderError()}},H=async function(e){e.preventDefault();try{$.renderSpinner();let e=w.getQuery();await u(e),c.search.page=1,$.render(h()),S.render(c.search)}catch(e){console.error(e)}},q=async function(e){try{M.renderSpinner(),await v(e),console.log(c.recipe),y.render(c.recipe),M.renderSuccessMessage(),I.render(c.bookmarks),window.history.pushState(null,"",`#${c.recipe.id}`),setTimeout(function(){M.toggleWindow()},1500)}catch(e){M.renderError(e.message)}};I.addHandlerRender(function(){I.render(c.bookmarks)}),y.addHandlerRender(B),y.addHandlerUpdateServings(function(e){f(e),y.update(c.recipe)}),y.addHandlerAddBookmark(function(){c.recipe.bookmarked?m(c.recipe.id):g(c.recipe),y.update(c.recipe),I.render(c.bookmarks)}),w.addHandlerSearch(H),S.addHandlerClick(function(e){$.render(h(e)),S.render(c.search)}),M.addHandlerShowWindow(),M.addHandlerCloseWindow(),M.addHandlerUpload(q);
//# sourceMappingURL=index.5c2ee046.js.map
