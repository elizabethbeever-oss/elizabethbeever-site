(() => {
'use strict';
if (window.__siteAnalyticsConsent) return;
window.__siteAnalyticsConsent = true;
const id='G-QNCDHHHZ2C', key='site_analytics_consent_v1', disable='ga-disable-'+id;
let active=false, lastSection='', choice=read();
window[disable]=true;
function read(){try {const v=JSON.parse(localStorage.getItem(key));return v && v.until>Date.now() && ['accept','reject'].includes(v.choice) ? v.choice : null;}catch{return null;}}
function save(value){try{localStorage.setItem(key,JSON.stringify({choice:value,until:Date.now()+180*86400000}));}catch{}}
function clearCookies(){for(const item of document.cookie.split(';')){const name=item.split('=')[0].trim();if(!/^_ga(?:_|$)/.test(name))continue;for(const domain of ['',location.hostname,'.'+location.hostname,'elizabethbeever.com','.elizabethbeever.com'])document.cookie=name+'=; Max-Age=0; Path=/; SameSite=Lax; Secure'+(domain?'; Domain='+domain:'');}}
function start(){if(active||choice!=='accept')return;active=true;window[disable]=false;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};const g=window.gtag;
g('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
g('js',new Date());g('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_referrer:document.referrer.split(/[?#]/)[0],cookie_expires:15552000,cookie_update:false});
g('event','page_view',{send_to:id,page_location:location.origin+location.pathname});
const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(script);
section();
}
function section(){if(!active||choice!=='accept'||window[disable])return;const h=location.hash.slice(1);if(h===lastSection)return;lastSection=h;if(h&&['top','about','interests','work','writing','contact','build-projects'].includes(h))window.gtag('event','section_view',{send_to:id,section_name:h,page_location:location.origin+location.pathname});}
const panel=document.createElement('aside');panel.className='analytics-consent';panel.id='analytics-consent';panel.setAttribute('aria-labelledby','analytics-consent-title');panel.hidden=true;
panel.innerHTML='<h2 id="analytics-consent-title" tabindex="-1">Analytics cookies</h2><p>With your permission, Google Analytics helps me understand how this website is used. You can reject optional analytics and still use the whole website. <a href="/privacy.html">Privacy and cookie information</a>.</p><div class="analytics-actions"><button type="button" data-choice="accept">Accept analytics</button><button type="button" data-choice="reject">Reject analytics</button></div>';
document.body.append(panel);
const settings=document.createElement('button');settings.type='button';settings.className='analytics-settings';settings.textContent='Cookie settings';settings.setAttribute('aria-controls',panel.id);settings.setAttribute('aria-expanded','false');const footer=document.querySelector('footer');(footer||document.body).append(settings);
function show(focus){panel.hidden=false;settings.setAttribute('aria-expanded','true');if(focus)panel.querySelector('h2').focus();}
function hide(){panel.hidden=true;settings.setAttribute('aria-expanded','false');}
settings.addEventListener('click',()=>{if(panel.hidden)show(true);else hide();});
panel.addEventListener('click',e=>{const v=e.target.dataset.choice;if(!v)return;const wasActive=active;choice=v;save(v);hide();settings.focus();if(v==='accept')start();else{window[disable]=true;clearCookies();if(wasActive)location.reload();}});
window.addEventListener('hashchange',section);
window.addEventListener('storage',e=>{if(e.key!==key)return;const next=read();if(next!=='accept'){window[disable]=true;clearCookies();if(active)location.reload();}else if(choice!=='accept'){choice=next;hide();start();}choice=next;if(!choice)show(false);});
if(choice==='accept')start();else{clearCookies();if(!choice)show(false);}
})();