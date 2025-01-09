const e="https://forkify-api.jonas.io/api/v2/recipes/",t="fd1da89b-3292-4a2d-bdda-3cb233acaa38",i=async function(e,t){let i=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e);try{let e=await Promise.race([i,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 seconds"))},1e4)})]),t=await e.json();if(!e.ok)throw Error(`${t.message} (${e.status})`);return t}catch(e){throw e}},n={recipe:{id:"id",title:"title",publisher:"publisher",sourceUrl:"source_url",image:"image_url",servings:2,cookingTime:0,ingredients:[],bookmarked:!1},search:{query:"",results:[],page:1,resultsPerPage:10},bookmarks:[]},r=function(e){let{recipe:t}=e.data;return n.recipe={id:t.id,title:t.title,publisher:t.publisher,sourceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredients:t.ingredients,...t.key&&{key:t.key}},n.recipe},s=async function(s){try{let a=await i(`${e}${s}?key=${t}`);if(!a)return;n.recipe=r(a),n.bookmarks.some(e=>e.id===s)?n.recipe.bookmarked=!0:n.recipe.bookmarked=!1}catch(e){throw e}},a=async function(r){try{n.search.query=r;let s=await i(`${e}?search=${r}&key=${t}`);n.search.results=s.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}}))}catch(e){throw e}},o=function(e=n.search.page){n.search.page=e;let t=(e-1)*n.search.resultsPerPage,i=e*n.search.resultsPerPage;return n.search.results.slice(t,i)},c=function(e){n.recipe.ingredients.forEach(t=>{t.quantity=t.quantity*e/n.recipe.servings}),n.recipe.servings=e},d=function(){localStorage.setItem("bookmarks",JSON.stringify(n.bookmarks))},l=function(e){n.bookmarks.push(e),e.id===n.recipe.id&&(n.recipe.bookmarked=!0),d()},u=function(e){let t=n.bookmarks.findIndex(t=>t.id===e);n.bookmarks.splice(t,1),e===n.recipe.id&&(n.recipe.bookmarked=!1),d()};!function(){let e=localStorage.getItem("bookmarks");e&&(n.bookmarks=JSON.parse(e))}();const h=async function(s){try{let a=Object.entries(s).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=String(e[1]).split(",").map(e=>e.trim());if(3!==t.length)throw Error("Wrong ingredient input! Please use the correct format.");let[i,n,r]=t;return{quantity:i?+i:null,unit:n,description:r}}),o={title:s.title,source_url:s.sourceUrl,image_url:s.image,publisher:s.publisher,cooking_time:+s.cookingTime,servings:+s.servings,ingredients:a},c=await i(`${e}?key=${t}`,o);n.recipe=r(c),l(n.recipe)}catch(e){throw e}},p="/public/img/icons.svg";class f{render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this.data=e;let i=this.generateMarkup();if(!t)return i;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",i)}update(e){this.data=e;let t=this.generateMarkup(),i=Array.from(document.createRange().createContextualFragment(t).querySelectorAll("*")),n=Array.from(this.parentElement.querySelectorAll("*"));i.forEach((e,t)=>{let i=n[t];e.isEqualNode(i)||e.firstChild?.nodeValue.trim()===""||(i.textContent=e.textContent),e.isEqualNode(i)||Array.from(e.attributes).forEach(e=>i.setAttribute(e.name,e.value))})}clear(){this.parentElement.innerHTML=""}renderSpinner(){let e=`
          <div class="spinner">
            <svg>
              <use href="${p}#icon-loader"></use>
            </svg>
          </div> 
    `;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this.errorMessage){let t=`
          <div class="error">
            <div>
              <svg>
                <use href="${p}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>
    `;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",t)}renderSuccessMessage(e=this.successMessage){let t=`
          <div class="message">
            <div>
              <svg>
                <use href="${p}#icon-smile"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>
    `;this.clear(),this.parentElement.insertAdjacentHTML("afterbegin",t)}constructor(){this.errorMessage="An error occurred!",this.successMessage="Operation successful!"}}var g={};!function(e){function t(){return Error("Parameters must be integer")}function i(){return Error("Invalid argument")}function n(){return Error("Division by Zero")}function r(e,r){var a=u,o=h;let c=h;if(null!=e){if(void 0!==r){if("bigint"==typeof e)a=e;else{if(isNaN(e))throw i();if(0!=e%1)throw t();a=BigInt(e)}if("bigint"==typeof r)o=r;else{if(isNaN(r))throw i();if(0!=r%1)throw t();o=BigInt(r)}c=a*o}else if("object"==typeof e){if("d"in e&&"n"in e)a=BigInt(e.n),o=BigInt(e.d),"s"in e&&(a*=BigInt(e.s));else if(0 in e)a=BigInt(e[0]),1 in e&&(o=BigInt(e[1]));else if("bigint"==typeof e)a=e;else throw i();c=a*o}else if("number"==typeof e){if(isNaN(e))throw i();if(0>e&&(c=-h,e=-e),0==e%1)a=BigInt(e);else if(0<e){r=1;var d=0,l=1,p=1;let t=1;for(1<=e&&(r=10**Math.floor(1+Math.log10(e)),e/=r);1e7>=l&&1e7>=t;)if(e===(o=(d+p)/(l+t))){1e7>=l+t?(a=d+p,o=l+t):t>l?(a=p,o=t):(a=d,o=l);break}else e>o?(d+=p,l+=t):(p+=d,t+=l),1e7<l?(a=p,o=t):(a=d,o=l);a=BigInt(a)*BigInt(r),o=BigInt(o)}}else if("string"==typeof e){if(o=0,d=r=a=u,l=p=h,null===(e=e.replace(/_/g,"").match(/\d+|./g)))throw i();if("-"===e[o]?(c=-h,o++):"+"===e[o]&&o++,e.length===o+1?r=s(e[o++],c):"."===e[o+1]||"."===e[o]?("."!==e[o]&&(a=s(e[o++],c)),(++o+1===e.length||"("===e[o+1]&&")"===e[o+3]||"'"===e[o+1]&&"'"===e[o+3])&&(r=s(e[o],c),p=m**BigInt(e[o].length),o++),("("===e[o]&&")"===e[o+2]||"'"===e[o]&&"'"===e[o+2])&&(d=s(e[o+1],c),l=m**BigInt(e[o+1].length)-h,o+=3)):"/"===e[o+1]||":"===e[o+1]?(r=s(e[o],c),p=s(e[o+2],h),o+=3):"/"===e[o+3]&&" "===e[o+1]&&(a=s(e[o],c),r=s(e[o+2],c),p=s(e[o+4],h),o+=5),e.length<=o)c=a=d+(o=p*l)*a+l*r;else throw i()}else if("bigint"==typeof e)c=a=e,o=h;else throw i()}if(o===u)throw n();v.s=c<u?-h:h,v.n=a<u?-a:a,v.d=o<u?-o:o}function s(e,t){try{e=BigInt(e)}catch(e){throw i()}return e*t}function a(e){return"bigint"==typeof e?e:Math.floor(e)}function o(e,t){if(t===u)throw n();let i=Object.create(l.prototype);i.s=e<u?-h:h;let r=d(e=e<u?-e:e,t);return i.n=e/r,i.d=t/r,i}function c(e){let t={},i=e,n=p,r=f-h;for(;r<=i;){for(;i%n===u;)i/=n,t[n]=(t[n]||u)+h;r+=h+p*n++}return i!==e?1<i&&(t[i]=(t[i]||u)+h):t[e]=(t[e]||u)+h,t}function d(e,t){if(!e)return t;if(!t)return e;for(;;){if(!(e%=t))return t;if(!(t%=e))return e}}function l(e,t){if(r(e,t),!(this instanceof l))return o(v.s*v.n,v.d);e=d(v.d,v.n),this.s=v.s,this.n=v.n/e,this.d=v.d/e}"undefined"==typeof BigInt&&(BigInt=function(e){if(isNaN(e))throw Error("");return e});let u=BigInt(0),h=BigInt(1),p=BigInt(2),f=BigInt(5),m=BigInt(10),v={s:h,n:u,d:h};l.prototype={s:h,n:u,d:h,abs:function(){return o(this.n,this.d)},neg:function(){return o(-this.s*this.n,this.d)},add:function(e,t){return r(e,t),o(this.s*this.n*v.d+v.s*this.d*v.n,this.d*v.d)},sub:function(e,t){return r(e,t),o(this.s*this.n*v.d-v.s*this.d*v.n,this.d*v.d)},mul:function(e,t){return r(e,t),o(this.s*v.s*this.n*v.n,this.d*v.d)},div:function(e,t){return r(e,t),o(this.s*v.s*this.n*v.d,this.d*v.n)},clone:function(){return o(this.s*this.n,this.d)},mod:function(e,t){if(void 0===e)return o(this.s*this.n%this.d,h);if(r(e,t),u===v.n*this.d)throw n();return o(this.s*v.d*this.n%(v.n*this.d),v.d*this.d)},gcd:function(e,t){return r(e,t),o(d(v.n,this.n)*d(v.d,this.d),v.d*this.d)},lcm:function(e,t){return r(e,t),v.n===u&&this.n===u?o(u,h):o(v.n*this.n,d(v.n,this.n)*d(v.d,this.d))},inverse:function(){return o(this.s*this.d,this.n)},pow:function(e,t){if(r(e,t),v.d===h)return v.s<u?o((this.s*this.d)**v.n,this.n**v.n):o((this.s*this.n)**v.n,this.d**v.n);if(this.s<u)return null;e=c(this.n),t=c(this.d);let i=h,n=h;for(let t in e)if("1"!==t){if("0"===t){i=u;break}if(e[t]*=v.n,e[t]%v.d!==u)return null;e[t]/=v.d,i*=BigInt(t)**e[t]}for(let e in t)if("1"!==e){if(t[e]*=v.n,t[e]%v.d!==u)return null;t[e]/=v.d,n*=BigInt(e)**t[e]}return v.s<u?o(n,i):o(i,n)},log:function(e,t){if(r(e,t),this.s<=u||v.s<=u)return null;var i={};e=c(v.n);let n=c(v.d);t=c(this.n);let s=c(this.d);for(var a in n)e[a]=(e[a]||u)-n[a];for(var l in s)t[l]=(t[l]||u)-s[l];for(var h in e)"1"!==h&&(i[h]=!0);for(var p in t)"1"!==p&&(i[p]=!0);for(let n in l=a=null,i)if(h=e[n]||u,i=t[n]||u,h===u){if(i!==u)return null}else if(p=d(i,h),i/=p,h/=p,null===a&&null===l)a=i,l=h;else if(i*l!=a*h)return null;return null!==a&&null!==l?o(a,l):null},equals:function(e,t){return r(e,t),this.s*this.n*v.d==v.s*v.n*this.d},lt:function(e,t){return r(e,t),this.s*this.n*v.d<v.s*v.n*this.d},lte:function(e,t){return r(e,t),this.s*this.n*v.d<=v.s*v.n*this.d},gt:function(e,t){return r(e,t),this.s*this.n*v.d>v.s*v.n*this.d},gte:function(e,t){return r(e,t),this.s*this.n*v.d>=v.s*v.n*this.d},compare:function(e,t){return r(e,t),(u<(e=this.s*this.n*v.d-v.s*v.n*this.d))-(e<u)},ceil:function(e){return e=m**BigInt(e||0),o(a(this.s*e*this.n/this.d)+(e*this.n%this.d>u&&this.s>=u?h:u),e)},floor:function(e){return e=m**BigInt(e||0),o(a(this.s*e*this.n/this.d)-(e*this.n%this.d>u&&this.s<u?h:u),e)},round:function(e){return e=m**BigInt(e||0),o(a(this.s*e*this.n/this.d)+this.s*((this.s>=u?h:u)+e*this.n%this.d*p>this.d?h:u),e)},roundTo:function(e,t){r(e,t);var i=this.n*v.d;return t=i%(e=this.d*v.n),i=a(i/e),t+t>=e&&i++,o(this.s*i*v.n,v.d)},divisible:function(e,t){return r(e,t),!(!(v.n*this.d)||this.n*v.d%(v.n*this.d))},valueOf:function(){return Number(this.s*this.n)/Number(this.d)},toString:function(e){let t=this.n,i=this.d;e=e||15;e:{for(n=i;n%p===u;n/=p);for(;n%f===u;n/=f);if(n===h)n=u;else{for(var n,r=m%n,s=1;r!==h;s++)if(r=r*m%n,2e3<s){n=u;break e}n=BigInt(s)}}e:{r=h,s=m;var o=n;let e=h;for(;o>u;s=s*s%i,o>>=h)o&h&&(e=e*s%i);for(o=0,s=e;300>o;o++){if(r===s){r=BigInt(o);break e}r=r*m%i,s=s*m%i}r=0}if(s=r,r=(this.s<u?"-":"")+a(t/i),(t=t%i*m)&&(r+="."),n){for(e=s;e--;)r+=a(t/i),t%=i,t*=m;for(r+="(",e=n;e--;)r+=a(t/i),t%=i,t*=m;r+=")"}else for(;t&&e--;)r+=a(t/i),t%=i,t*=m;return r},toFraction:function(e){let t=this.n,i=this.d,n=this.s<u?"-":"";if(i===h)n+=t;else{let r=a(t/i);e&&r>u&&(n+=r,n+=" ",t%=i),n=n+t+"/"+i}return n},toLatex:function(e){let t=this.n,i=this.d,n=this.s<u?"-":"";if(i===h)n+=t;else{let r=a(t/i);e&&r>u&&(n+=r,t%=i),n=n+"\\frac{"+t+"}{"+i+"}"}return n},toContinued:function(){let e=this.n,t=this.d,i=[];do{i.push(a(e/t));let n=e%t;e=t,t=n}while(e!==h)return i},simplify:function(e){e=BigInt(1/(e||.001)|0);let t=this.abs(),i=t.toContinued();for(let r=1;r<i.length;r++){let s=o(i[r-1],h);for(var n=r-2;0<=n;n--)s=s.inverse().add(i[n]);if((n=s.sub(t)).n*e<n.d)return s.mul(this.s)}return this}},"function"==typeof define&&define.amd?define([],function(){return l}):(Object.defineProperty(l,"__esModule",{value:!0}),l.default=l,l.Fraction=l,g=l)}(0);const m="/public/img/icons.svg";var v=new class extends f{addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}addHandlerUpdateServings(e){this.parentElement.addEventListener("click",function(t){let i=t.target.closest(".btn--update");if(!i||!i.dataset.updateTo)return;let{updateTo:n}=i.dataset;+n>0&&e(+n)})}addHandlerAddBookmark(e){this.parentElement.addEventListener("click",function(t){t.target.closest(".btn--bookmark")&&e()})}generateMarkup(){let e=this.data;return`<figure class="recipe__fig">
          <img src="${e.image}" alt="${e.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${e.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${m}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${e.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${m}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${e.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update" data-update-to="${e.servings-1}">
                <svg>
                  <use href="${m}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update" data-update-to="${e.servings+1}">
                <svg>
                  <use href="${m}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this.data.key?"":"hidden"}">
            <svg>
              <use href="${m}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${m}#icon-bookmark${e.bookmarked?"-fill":""}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${e.ingredients.map(this.generateIngredients).join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${e.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${e.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${m}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`}generateIngredients(e){var t;return`<li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${m}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${e.quantity?new((t=g)&&t.__esModule?t.default:t)(e.quantity).toFraction():""}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${e.unit}</span>
            ${e.description}
          </div>
        </li>`}constructor(...e){super(...e),this.parentElement=document.querySelector(".recipe"),this.errorMessage="We could not find that recipe. Please try another one!",this.successMessage="It's ok!"}},b=new class extends f{getQuery(){let e=this.searchField.value;return this.clearInput(),e}clearInput(){this.searchField.value=""}addHandlerSearch(e){this.parentElement.addEventListener("submit",e)}generateMarkup(){return""}constructor(...e){super(...e),this.parentElement=document.querySelector(".search"),this.searchField=this.parentElement.querySelector(".search__field")}},k=new class extends f{generateMarkup(){let e=window.location.hash.slice(1);return`
                  <li class="preview">
                    <a class="preview__link ${this.data.id===e?"preview__link--active":""}" href="#${this.data.id}">
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
                            <use href="/public/img/icons.svg#icon-user"></use>
                          </svg>
                        </div>
                      </div>
                    </a>
                  </li>              

    `}constructor(...e){super(...e),this.parentElement=document.querySelector(".d")}},_=new class extends f{generateMarkup(){return this.data.map(e=>k.render(e,!1)).join("")}constructor(...e){super(...e),this.parentElement=document.querySelector(".results"),this.errorMessage="No recipes found for your query! Please try again."}};const y="/public/img/icons.svg";var w=new class extends f{addHandlerClick(e){this.parentElement.addEventListener("click",function(t){t.preventDefault();let i=t.target;if(!i)return;let n=i.closest(".btn--inline");n&&n.dataset.goto&&e(parseInt(n.dataset.goto,10))})}generateMarkup(){let e=`
    <button data-goto="${this.data.page+1}" class="btn--inline pagination__btn--next">
              <span>Page ${this.data.page+1}</span>
              <svg class="search__icon">
                <use href="${y}#icon-arrow-right"></use>
              </svg>
            </button>
            `,t=`
     <button data-goto="${this.data.page-1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${y}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this.data.page-1}</span>
            </button>
    `,i=Math.ceil(this.data.results.length/this.data.resultsPerPage);return 1===this.data.page&&i>1?e:this.data.page===i&&i>1?t:this.data.page<i?t+e:""}constructor(...e){super(...e),this.parentElement=document.querySelector(".pagination")}},$=new class extends f{addHandlerRender(e){window.addEventListener("load",e)}generateMarkup(){return this.data.map(e=>k.render(e,!1)).join("")}constructor(...e){super(...e),this.parentElement=document.querySelector(".bookmarks__list"),this.errorMessage="No bookmarks yet. Find a good recipe to bookmark!"}},E=new class extends f{toggleWindow(){this.overlay.classList.toggle("hidden"),this.window.classList.toggle("hidden")}addHandlerShowWindow(){this.btnOpen.addEventListener("click",()=>{this.toggleWindow()})}addHandlerCloseWindow(){this.btnClose.addEventListener("click",()=>{this.toggleWindow()})}addHandlerUpload(e){this.parentElement.addEventListener("submit",t=>{t.preventDefault(),e(Object.fromEntries([...new FormData(this.parentElement)]))})}generateMarkup(){return""}constructor(...e){super(...e),this.parentElement=document.querySelector(".upload"),this.window=document.querySelector(".add-recipe-window"),this.overlay=document.querySelector(".overlay"),this.btnOpen=document.querySelector(".nav__btn--add-recipe"),this.btnClose=document.querySelector(".btn--close-modal"),this.successMessage="Recipe was successfully uploaded."}};document.querySelector(".header__logo").addEventListener("click",e=>{e.preventDefault(),window.location.href="https://mprskalo01.github.io/forkify-typescript-project/"});const I=async function(){try{let e=window.location.hash.slice(1);if(!e)return;v.renderSpinner(),_.update(o()),$.update(n.bookmarks),await s(e),v.render(n.recipe)}catch(e){v.renderError()}},S=async function(e){e.preventDefault();try{_.renderSpinner();let e=b.getQuery();await a(e),n.search.page=1,_.render(o()),w.render(n.search)}catch(e){console.error(e)}},B=async function(e){try{E.renderSpinner(),await h(e),console.log(n.recipe),v.render(n.recipe),E.renderSuccessMessage(),$.render(n.bookmarks),window.history.pushState(null,"",`#${n.recipe.id}`),setTimeout(function(){E.toggleWindow()},1500)}catch(e){E.renderError(e.message)}};$.addHandlerRender(function(){$.render(n.bookmarks)}),v.addHandlerRender(I),v.addHandlerUpdateServings(function(e){c(e),v.update(n.recipe)}),v.addHandlerAddBookmark(function(){n.recipe.bookmarked?u(n.recipe.id):l(n.recipe),v.update(n.recipe),$.render(n.bookmarks)}),b.addHandlerSearch(S),w.addHandlerClick(function(e){_.render(o(e)),w.render(n.search)}),E.addHandlerShowWindow(),E.addHandlerCloseWindow(),E.addHandlerUpload(B);
//# sourceMappingURL=index.84f60b6f.js.map
