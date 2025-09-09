const loginMsg = document.getElementById('login-msg');
const signupMsg = document.getElementById('signup-msg');

/* ---------------- Tab 切换 ---------------- */
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const formLogin = document.getElementById('form-login');
const formSignup = document.getElementById('form-signup');
const toSignup = document.getElementById('to-signup');
const toLogin = document.getElementById('to-login');

function showLogin() {
  tabLogin.classList.add('active'); tabLogin.setAttribute('aria-selected','true');
  tabSignup.classList.remove('active'); tabSignup.setAttribute('aria-selected','false');
  formLogin.style.display='block'; formSignup.style.display='none';
  document.getElementById('login-email').focus();
}
function showSignup() {
  tabSignup.classList.add('active'); tabSignup.setAttribute('aria-selected','true');
  tabLogin.classList.remove('active'); tabLogin.setAttribute('aria-selected','false');
  formLogin.style.display='none'; formSignup.style.display='block';
  document.getElementById('su-first').focus();
}

tabLogin.addEventListener('click', showLogin);
tabSignup.addEventListener('click', showSignup);
toSignup.addEventListener('click', showSignup);
toLogin.addEventListener('click', showLogin);

[tabLogin, tabSignup].forEach(t=>{
  t.addEventListener('keydown', e=>{
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); t.click(); }
  });
});

/* ---------------- Show/Hide Password ---------------- */
document.querySelectorAll('.pw-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const input = document.getElementById(btn.dataset.target);
    if(input.type==='password'){ input.type='text'; btn.textContent='隐藏'; }
    else { input.type='password'; btn.textContent='显示'; }
  });
});

/* ---------------- Password Strength ---------------- */
const suPass = document.getElementById('su-pass');
const pwBar = document.getElementById('pw-bar');
const pwHint = document.getElementById('pw-hint');

function scorePassword(pw){
  let score=0;
  if(!pw) return 0;
  if(pw.length>=8) score+=25;
  if(pw.length>=12) score+=10;
  if(/[a-z]/.test(pw)) score+=10;
  if(/[A-Z]/.test(pw)) score+=10;
  if(/[0-9]/.test(pw)) score+=15;
  if(/[^A-Za-z0-9]/.test(pw)) score+=20;
  if(pw.length<8) score=Math.min(score,20);
  return Math.min(score,100);
}
function updatePwMeter(){
  const s = scorePassword(suPass.value||'');
  pwBar.style.width = s+'%';
  if(s<30){ pwHint.textContent='太弱 — 请加入数字/大写/符号'; pwBar.style.filter='saturate(.6)'; }
  else if(s<60){ pwHint.textContent='中等 — 可更强'; pwBar.style.filter='saturate(.85)'; }
  else if(s<85){ pwHint.textContent='强 — 已安全'; pwBar.style.filter='saturate(1)'; }
  else { pwHint.textContent='非常强 👍'; pwBar.style.filter='saturate(1.2)'; }
}
suPass.addEventListener('input', updatePwMeter);

/* ---------------- Signup ---------------- */
formSignup.addEventListener('submit', async e=>{
  e.preventDefault(); signupMsg.textContent='';
  const email = document.getElementById('su-email').value.trim();
  const pass = document.getElementById('su-pass').value;

  if(pass.length < 8){ signupMsg.textContent = '密码至少 8 个字符'; return; }

  try{
    const userCredential = await window.firebaseCreateUser(window.firebaseAuth, email, pass);
    signupMsg.className = 'ok';
    signupMsg.textContent = '注册成功！可以登录';
    setTimeout(()=>{
      formSignup.reset();
      showLogin();
      document.getElementById('login-email').value = email;
      document.getElementById('login-pass').focus();
    }, 800);
  }catch(err){
    signupMsg.textContent = err.message;
  }
});

/* ---------------- Login ---------------- */
formLogin.addEventListener('submit', async e=>{
  e.preventDefault(); loginMsg.textContent='';
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;

  try{
    const userCredential = await window.firebaseSignIn(window.firebaseAuth, email, pass);
    loginMsg.className='ok';
    loginMsg.textContent='登录成功！欢迎 '+(userCredential.user.email||'')+'。';
    // Redirect after 0.5s
    setTimeout(()=>{ window.location.href='project.html'; }, 500);
  }catch(err){
    loginMsg.textContent = err.message;
  }
});

/* ---------------- Fake reset ---------------- */
document.getElementById('fake-reset').addEventListener('click', ()=>{
  alert('示范：重置密码应通过邮件/后端完成，本 demo 不支持。');
});

/* ---------------- Prefill remembered user ---------------- */
window.addEventListener('load', ()=>{
  const last = localStorage.getItem('demo_last');
  if(last){ document.getElementById('login-email').value=last; }
});

