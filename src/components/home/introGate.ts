export const INTRO_KEY = 'brian_mobile_intro_seen';

/**
 * Runs in <head> before first paint. The mobile splash only plays on a fresh
 * document load of the Home page, on a phone-width viewport, with motion allowed,
 * once per session. Otherwise html[data-intro-skip] hides it instantly.
 */
export const introGateScript = `try{var d=document.documentElement;if(location.pathname!=='/'||sessionStorage.getItem('${INTRO_KEY}')||matchMedia('(min-width: 768px)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)d.dataset.introSkip='1'}catch(e){document.documentElement.dataset.introSkip='1'}`;
