"use strict";
const STORAGE_KEY = "skd90-data-v1";
const icons = {
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
 clock:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 2v3m6 1 2-2"/>',
 target:'<circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="m11 13 9-10m-4 0h4v4"/>',
 chart:'<path d="M5 20V10m7 10V4m7 16V7"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',
 check:'<path d="m5 12 4 4L19 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',
 dumbbell:'<path d="M6 8v8m12-8v8M3 6v12m18-12v12M6 12h12"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="m8 5 8 13M10 19h4"/>',
 book:'<path d="M12 5v16M3 3c4-1 7 0 9 2 2-2 5-3 9-2v16c-4-1-7 0-9 2-2-2-5-3-9-2Z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 play:'<path d="m9 5 10 7-10 7Z" fill="currentColor" stroke-width="1"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="4"/>',
 reset:'<path d="M3 11a9 9 0 1 1 2 7M3 5v6h6"/>',power:'<path d="M12 2v10m-6-7a9 9 0 1 0 12 0"/>',
 rain:'<path d="M6 14a5 5 0 1 1 2-9 6 6 0 0 1 11 3 3 3 0 0 1 0 6H6m1 3-1 3m7-3-1 3m7-3-1 3"/>',
 edit:'<path d="m14 5 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 15Z"/>',
 trend:'<path d="m3 18 6-8 5 5 7-11m-6 0h6v6"/>',
 fire:'<path d="M12 2c1 6-6 7-6 13a6 6 0 0 0 12 0c0-3-1-5-3-7 0 4-3 5-3 5 2-5 1-8 0-11Z"/>',
 star:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 10h18m-13 5 3 3 5-5"/>',
 alert:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4m0 3v.01M4 3 1 6m19-3 3 3"/>',
 trash:'<path d="M3 6h18M9 6V3h6v3m-10 0 1 15h12l1-15M10 10v7m4-7v7"/>',
 coffee:'<path d="M3 9h13v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Zm13 0h2a3 3 0 0 1 0 6h-2M6 3v3m4-3v3m4-3v3M2 22h16"/>',
 plane:'<path d="m22 2-7 20-4-9L2 9Zm-11 11 7-7"/>',
 gift:'<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13m0-13H7a3 3 0 1 1 3-3Zm0 0h5a3 3 0 1 0-3-3Z"/>',
 settings:'<path d="M4 7h16M4 17h16"/><circle cx="8" cy="7" r="3" fill="var(--bg)"/><circle cx="16" cy="17" r="3" fill="var(--bg)"/>',
 bell:'<path d="M5 17h14l-2-4V9a5 5 0 0 0-10 0v4Zm5 4h4M12 2v2"/>',
 cloud:'<path d="M6 19a5 5 0 1 1 0-10 7 7 0 0 1 13-1 5 5 0 0 1 0 11Z"/>',
 moon:'<path d="M21 14A9 9 0 0 1 10 3a9 9 0 1 0 11 11Z"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.01"/>',
 logout:'<path d="M9 3H4v18h5m6-15 6 6-6 6m-6-6h12"/>',
 list:'<path d="M9 5h12M9 12h12M9 19h12M3 5h.01M3 12h.01M3 19h.01"/>',
 volume:'<path d="m11 4-6 5H2v6h3l6 5Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>'
};
function icon(name,cls=""){return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.list}</svg>`;}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function shifted(key,n){const d=new Date(key+"T12:00:00");d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function dayDiff(a,b){return Math.round((Date.parse(b+"T12:00:00Z")-Date.parse(a+"T12:00:00Z"))/86400000);}
function formatDate(key,opts={day:"numeric",month:"short",year:"numeric"}){return new Date(key+"T12:00:00").toLocaleDateString("id-ID",opts);}
const blankChecks=()=>({mit:false,deep:false,habit:false,noscroll:false,review:false});
const defaults={onboarded:false,name:"Kamu",startDate:todayKey(),threshold:80,todayDate:todayKey(),today:{
  mitText:"",
  mitItems:[{text:"",done:false}],
  habitText:"Olahraga 20 menit",
  checks:blankChecks()
},goals:[{title:"Kesehatan",target:"Olahraga 3x/minggu selama 90 hari.",progress:0},{title:"Bisnis / Karier",target:"Tentukan satu pencapaian utama untuk kariermu.",progress:0},{title:"Pengembangan Diri",target:"Membaca dan belajar secara konsisten.",progress:0}],history:{},failures:[],rewards:[{days:7,text:"Ngopi di tempat favorit"},{days:30,text:"Beli buku yang diinginkan"},{days:90,text:"Hadiah besar untuk diri sendiri"}],consequences:[],review:{win:"",fail:"",why:"",improve:""},reviews:{},settings:{focusMinutes:25,theme:"light",notifications:false}};
function load(){try{const v=JSON.parse(localStorage.getItem(STORAGE_KEY))||{};return {...structuredClone(defaults),...v,todayDate:v.todayDate||todayKey(),today:{...defaults.today,...v.today,checks:{...blankChecks(),...v.today?.checks}},settings:{...defaults.settings,...v.settings}};}catch{return structuredClone(defaults);}}
let data=load(),route="home",selectedDate=todayKey(),statsPeriod=7,weekOffset=0,rewardTab="rewards",journalIndex=-1,journalDraft=null,focusMode="pomodoro",toastTimeout=null,sound=null;
let timer={running:false,remaining:data.settings.focusMinutes*60,id:null,endAt:0,elapsed:0,startedAt:0};
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));return true;}catch{toast("Penyimpanan penuh atau tidak tersedia. Ekspor cadangan data.");return false;}}
function ensureMitItems(day){
  if(!day)return [];

  if(!Array.isArray(day.mitItems)||!day.mitItems.length){
    day.mitItems=[{
      text:String(day.mitText||""),
      done:!!day.checks?.mit
    }];
  }

  day.mitItems=day.mitItems
    .slice(0,5)
    .map(item=>({
      text:String(item?.text||"").slice(0,300),
      done:item?.done===true
    }));

  if(!day.mitItems.length){
    day.mitItems=[{text:"",done:false}];
  }

  return day.mitItems;
}

function syncMitCheck(day){
  const items=ensureMitItems(day);
  const filled=items.filter(item=>item.text.trim());

  if(!day.checks)day.checks=blankChecks();

  day.checks.mit=
    filled.length>0 &&
    filled.every(item=>item.done);

  // tetap disimpan untuk kompatibilitas versi lama
  day.mitText=filled[0]?.text||"";

  return items;
}

function currentMitText(day=data.today){
  const items=ensureMitItems(day);

  return (
    items.find(item=>item.text.trim()&&!item.done) ||
    items.find(item=>item.text.trim())
  )?.text || "";
}

function dayScore(day){
  syncMitCheck(day);
  return Object.values(day.checks||{}).filter(Boolean).length;
}

function syncToday(){
  syncMitCheck(data.today);

  data.history[data.todayDate]={
    ...data.today,
    mitItems:ensureMitItems(data.today).map(item=>({...item})),
    checks:{...data.today.checks},
    score:dayScore(data.today)
  };
}

function rollover(){
  if(data.todayDate===todayKey())return;

  syncToday();

  data.today={
    mitText:"",
    mitItems:[{text:"",done:false}],
    habitText:data.today.habitText,
    checks:blankChecks()
  };

  data.todayDate=todayKey();
  selectedDate=todayKey();
  save();
}

function selectedDay(){
  const day=
    selectedDate===todayKey()
      ?data.today
      :(data.history[selectedDate]||{
        mitText:"",
        mitItems:[{text:"",done:false}],
        habitText:data.today.habitText,
        checks:blankChecks()
      });

  syncMitCheck(day);
  return day;
}

function persistDay(){
  if(selectedDate===todayKey())syncToday();
  save();
}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
const esc=escapeHtml;
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove("show"),3200);}
function nav(){const selected=["home","focus","goals","stats"].includes(route)?route:"more";return `<nav class="nav" aria-label="Navigasi utama">${[["home","home","Beranda"],["focus","clock","Fokus"],["goals","target","Target"],["stats","chart","Statistik"],["more","menu","Lainnya"]].map(([r,i,l])=>`<button class="${selected===r?"active":""}" ${selected===r?'aria-current="page"':""} onclick="go('${r}')">${icon(i)}<span>${l}</span></button>`).join("")}</nav>`;}
function shell(content,title,sub="",extra=""){return `<div class="shell"><header class="top"><div><h1 class="brand">${title}</h1>${sub?`<p class="sub">${sub}</p>`:""}</div>${extra}</header><main class="stack" id="main">${content}</main>${nav()}</div>`;}
function go(r){route=r;if(r==="home")selectedDate=todayKey();render();window.scrollTo({top:0,behavior:"instant"});}
function dateStrip(label,prev,next,disableNext=false){return `<div class="date-strip"><button class="icon-btn" aria-label="Periode sebelumnya" onclick="${prev}">${icon("left")}</button><span>${label}</span><button class="icon-btn" aria-label="Periode berikutnya" onclick="${next}" ${disableNext?"disabled":""}>${icon("right")}</button></div>`;}
function moveDate(n){selectedDate=shifted(selectedDate,n);render();}
function checkRow(key,title,small,ico){const d=selectedDay(),done=d.checks[key];return `<button class="checkrow" role="checkbox" aria-checked="${done}" onclick="toggleCheck('${key}')"><span class="icon-disc">${icon(ico)}</span><span class="label"><b>${title}</b><small>${esc(small)}</small></span><span class="check ${done?"done":""}">${done?icon("check"):""}</span></button>`;}
function home(){
  const d=selectedDay();
  const s=dayScore(d);
  const items=ensureMitItems(d);

  const mitRows=items.map((item,i)=>`
    <div class="mit-item">
      <span class="mit-number">${i+1}</span>

      <button
        class="mit-label"
        onclick="editDaily()"
        aria-label="Edit tugas ${i+1}"
      >
        ${esc(
          item.text ||
          (i===0
            ?"Tentukan satu tugas paling penting hari ini"
            :"Tugas tambahan")
        )}
      </button>

      <button
        class="check ${item.done?"done":""}"
        role="checkbox"
        aria-checked="${item.done}"
        aria-label="Tugas ${i+1} selesai"
        onclick="toggleMit(${i})"
      >
        ${item.done?icon("check"):""}
      </button>
    </div>
  `).join("");

  const totalMit=items.filter(item=>item.text.trim()).length;

  return shell(
    `
    ${dateStrip(
      formatDate(selectedDate,{
        weekday:"short",
        day:"numeric",
        month:"short",
        year:"numeric"
      }),
      "moveDate(-1)",
      "moveDate(1)",
      selectedDate>=todayKey()
    )}

    <div class="check-list">

      <div class="checkrow featured mit-card">

        <div class="mit-head">
          <div>
            <b>Tugas Utama Hari Ini (MIT)</b>
            <small>
              ${totalMit||0}/5 tugas · selesaikan yang paling penting
            </small>
          </div>

          <button
            class="text-btn"
            onclick="editDaily()"
          >
            Atur
          </button>
        </div>

        <div class="mit-list">
          ${mitRows}
        </div>

      </div>

      ${checkRow(
        "deep",
        "Fokus Tanpa Gangguan",
        "Deep Work · "+data.settings.focusMinutes+" menit",
        "clock"
      )}

      ${checkRow(
        "habit",
        "Kebiasaan Utama",
        d.habitText,
        "dumbbell"
      )}

      ${checkRow(
        "noscroll",
        "Pagi Tanpa Scroll",
        "60 menit pertama setelah bangun",
        "phone"
      )}

      ${checkRow(
        "review",
        "Evaluasi Malam",
        "Refleksi singkat 3 menit",
        "book"
      )}

    </div>

    <div class="card progress-card">

      <div class="row">
        <div class="section-title">
          Progres Hari Ini
        </div>

        <button
          class="text-btn"
          onclick="editDaily()"
        >
          Atur
        </button>
      </div>

      <div class="row">
        <div
          class="progress"
          role="progressbar"
          aria-valuenow="${s*20}"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Progres harian"
        >
          <span style="width:${s*20}%"></span>
        </div>

        <strong>${s}/5</strong>
      </div>

    </div>

    <p class="day-note">
      ${
        s===5
          ?"Semua selesai. Kamu hebat hari ini!"
          :s>=4
          ?"Hari yang konsisten. Teruskan langkah kecilmu."
          :"Satu langkah kecil, setiap hari."
      }
    </p>
    `,
    `Halo, ${esc(data.name)}
      <span style="font-size:21px">👋</span>`,
    "Siap menjalani hari yang lebih baik?",
    `
      <button
        class="avatar"
        aria-label="Buka profil"
        onclick="go('settings')"
      >
        ${esc((data.name||"K").slice(0,1).toUpperCase())}
      </button>
    `
  );
}
function toggleMit(index){
  rollover();

  if(
    selectedDate!==todayKey() &&
    !data.history[selectedDate]
  ){
    data.history[selectedDate]={
      mitText:"",
      mitItems:[{text:"",done:false}],
      habitText:data.today.habitText,
      checks:blankChecks(),
      score:0
    };
  }

  const day=selectedDay();
  const items=ensureMitItems(day);
  const item=items[index];

  if(!item||!item.text.trim()){
    toast("Isi tugas MIT terlebih dahulu.");
    return;
  }

  item.done=!item.done;

  syncMitCheck(day);
  persistDay();
  render();
}
function toggleCheck(key){rollover();if(selectedDate!==todayKey()&&!data.history[selectedDate])data.history[selectedDate]={mitText:"",habitText:data.today.habitText,checks:blankChecks(),score:0};const d=selectedDay();d.checks[key]=!d.checks[key];d.score=dayScore(d);persistDay();render();}
function field(label,name,value="",type="text",attrs=""){return `<label class="reviewQ"><b>${label}</b><input class="input" name="${name}" type="${type}" value="${esc(value)}" ${attrs}></label>`;}
function area(label,name,value=""){return `<label class="reviewQ"><b>${label}</b><textarea name="${name}" placeholder="Tulis di sini…">${esc(value)}</textarea></label>`;}
function dialogForm(title,description,body,onSubmit,label="Simpan"){const dlg=document.getElementById("dialog");dlg.innerHTML=`<h2 id="dialog-title">${title}</h2><p>${description}</p><form id="dialog-form">${body}<div class="dialog-actions"><button type="button" class="btn ghost" onclick="closeDialog()">Batal</button><button class="btn primary" type="submit">${label}</button></div></form>`;dlg.showModal();document.getElementById("dialog-form").onsubmit=e=>{e.preventDefault();onSubmit(new FormData(e.target));};}
function closeDialog(){document.getElementById("dialog").close();}
function editDaily(){
  const d=selectedDay();
  const items=ensureMitItems(d);

  const mitFields=Array.from(
    {length:5},
    (_,i)=>field(
      i===0
        ?"Tugas utama 1"
        :`Tugas ${i+1} (opsional)`,
      `mit${i}`,
      items[i]?.text||"",
      "text",
      `maxlength="300" placeholder="${
        i===0
          ?"Contoh: selesaikan proposal klien"
          :"Tambahkan tugas jika diperlukan"
      }"`
    )
  ).join("");

  dialogForm(
    "Rencana hari ini",
    "Isi hingga 5 tugas utama. Tidak perlu mengisi semuanya.",

    mitFields +

    field(
      "Kebiasaan utama",
      "habit",
      d.habitText,
      "text",
      'required maxlength="150"'
    ),

    f=>{

      if(
        selectedDate!==todayKey() &&
        !data.history[selectedDate]
      ){
        data.history[selectedDate]={
          ...d,
          checks:{...d.checks},
          mitItems:ensureMitItems(d).map(item=>({...item}))
        };
      }

      const day=selectedDay();
      const oldItems=ensureMitItems(day);

      const newItems=[];

      for(let i=0;i<5;i++){
        const text=String(
          f.get(`mit${i}`)||""
        ).trim();

        if(!text)continue;

        const old=oldItems[i];

        newItems.push({
          text,
          done:
            old &&
            old.text===text
              ?old.done
              :false
        });
      }

      day.mitItems=
        newItems.length
          ?newItems
          :[{text:"",done:false}];

      day.habitText=
        String(f.get("habit")||"").trim();

      syncMitCheck(day);
      persistDay();

      closeDialog();
      render();

      toast("Rencana harian tersimpan.");
    }
  );
}
function splash(){return `<main class="splash"><div><img class="splash-logo" src="mark.svg" alt=""><h1>SKD90</h1><p class="tagline">Disiplin Hari Ini,<br>Hidup Lebih Baik Nanti.</p></div><div class="splash-footer"><button class="btn" onclick="startApp()">Mulai Sekarang ${icon("arrow")}</button><p class="footnote">Perubahan besar dimulai dari<br>langkah kecil yang konsisten.</p><small>SISTEM KENDALI DIRI · 90 HARI</small></div></main>`;}
function startApp(){data.onboarded=true;save();go("home");}
function focus(){return shell(`<div class="tabs" role="group" aria-label="Mode fokus"><button class="${focusMode==="pomodoro"?"active":""}" onclick="setMode('pomodoro')" aria-pressed="${focusMode==='pomodoro'}">Pomodoro</button><button class="${focusMode==="free"?"active":""}" onclick="setMode('free')" aria-pressed="${focusMode==='free'}">Mode Bebas</button></div><div class="timer-wrap"><div class="timer"><svg class="timer-ring" viewBox="0 0 260 260" aria-hidden="true"><circle class="timer-track" cx="130" cy="130" r="115" stroke-dasharray="542 723"/><circle id="timer-arc" class="timer-value" cx="130" cy="130" r="115" stroke-dasharray="542 723"/></svg><div><div id="timer-digits" class="timer-digits" role="timer">25:00</div><p id="timer-state" class="timer-state">Fokus</p></div></div><div class="timer-controls"><button class="icon-btn" aria-label="Ulangi timer" onclick="resetTimer()">${icon("reset")}</button><button class="play" id="timer-toggle" aria-label="Mulai fokus" onclick="toggleTimer()">${icon("play")}</button><button class="icon-btn" aria-label="Akhiri sesi fokus" onclick="finishSession()">${icon("power")}</button></div>${focusMode==="pomodoro"?`<div class="duration">${[25,50].map(n=>`<button class="chip ${data.settings.focusMinutes===n?"active":""}" onclick="setFocus(${n})">${n} menit</button>`).join("")}</div>`:`<p class="mini" style="margin:22px 0">Fokus sesuai ritmemu. Minimal 25 menit.</p>`}</div><p class="focus-tip">${esc(currentMitText(data.today)||"Satu sesi. Satu tugas. Tanpa gangguan.")}</p><button class="card sound-card" onclick="toggleSound()" aria-pressed="${!!sound}"><span class="icon-disc">${icon("rain")}</span><span class="label"><b>Suara Fokus</b><small>${sound?"Hujan sedang diputar · ketuk untuk matikan":"Hujan · ketuk untuk putar"}</small></span>${icon(sound?"volume":"right","chevron")}</button>`,"Fokus Tanpa Gangguan","Satu langkah lebih dekat ke tujuanmu.");}
function setMode(mode){if(mode===focusMode)return;focusMode=mode;resetTimer();}
function timerSeconds(){return focusMode==="free"?timer.elapsed:timer.remaining;}
function updateTimerDisplay(){const el=document.getElementById("timer-digits");if(!el)return;const s=timerSeconds();el.textContent=`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;document.getElementById("timer-state").textContent=timer.running?"Sedang fokus":s===0&&focusMode==="pomodoro"?"Sesi selesai":"Fokus";document.getElementById("timer-arc").setAttribute("stroke-dasharray",`${focusMode==="free"?542:542*Math.min(1,timer.remaining/(data.settings.focusMinutes*60))} 723`);const btn=document.getElementById("timer-toggle");btn.innerHTML=icon(timer.running?"pause":"play");btn.setAttribute("aria-label",timer.running?"Jeda fokus":"Mulai fokus");}
function tick(){if(!timer.running)return;if(focusMode==="free")timer.elapsed=Math.floor((Date.now()-timer.startedAt)/1000);else timer.remaining=Math.max(0,Math.ceil((timer.endAt-Date.now())/1000));if(focusMode==="pomodoro"&&timer.remaining===0){stopTimer();completeFocus();}updateTimerDisplay();}
function stopTimer(){timer.running=false;clearInterval(timer.id);timer.id=null;}
function toggleTimer(){if(timer.running){tick();stopTimer();}else{if(timer.remaining===0&&focusMode==="pomodoro")timer.remaining=data.settings.focusMinutes*60;timer.running=true;timer.endAt=Date.now()+timer.remaining*1000;timer.startedAt=Date.now()-timer.elapsed*1000;timer.id=setInterval(tick,250);}updateTimerDisplay();}
function resetTimer(){stopTimer();timer.remaining=data.settings.focusMinutes*60;timer.elapsed=0;render();}
function setFocus(n){data.settings.focusMinutes=n;save();resetTimer();}
function completeFocus(){rollover();data.today.checks.deep=true;syncToday();save();toast("Sesi selesai. Fokus hari ini sudah dicentang ✓");if(route!=="focus")render();if(data.settings.notifications&&"Notification" in window&&Notification.permission==="granted")notifyCompletion();}
async function notifyCompletion(){try{const options={body:"Satu langkah lebih dekat ke tujuanmu.",icon:"icon-192.png"};const registration="serviceWorker" in navigator?await navigator.serviceWorker.getRegistration():null;if(registration)await registration.showNotification("SKD90 · Fokus selesai",options);else new Notification("SKD90 · Fokus selesai",options);}catch{ /* The in-app completion message remains available. */ }}
function finishSession(){tick();const elapsed=focusMode==="free"?timer.elapsed:data.settings.focusMinutes*60-timer.remaining;if(elapsed>=25*60){stopTimer();completeFocus();resetTimer();}else dialogForm("Akhiri sesi fokus?","Sesi kurang dari 25 menit belum akan dicentang sebagai Deep Work.","",()=>{closeDialog();resetTimer();},"Akhiri");}
async function toggleSound(){if(sound){sound.source.stop();sound.context.close();sound=null;render();return;}try{const ctx=new(window.AudioContext||window.webkitAudioContext)();await ctx.resume();const buffer=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate),channel=buffer.getChannelData(0);let last=0;for(let i=0;i<channel.length;i++){last=(last+.02*(Math.random()*2-1))/1.02;channel[i]=last*3.5;}const source=ctx.createBufferSource();source.buffer=buffer;source.loop=true;const filter=ctx.createBiquadFilter();filter.type="lowpass";filter.frequency.value=1500;const gain=ctx.createGain();gain.gain.value=.45;source.connect(filter).connect(gain).connect(ctx.destination);source.start();sound={source,context:ctx};render();}catch{toast("Audio tidak tersedia pada browser ini.");}}
function goals(){return shell(`${data.goals.map((g,i)=>`<article class="card goal"><span class="goal-number">${i+1}</span><div class="goal-body"><div class="goal-title"><h3>${esc(g.title)}</h3><button class="icon-btn" aria-label="Edit target ${esc(g.title)}" onclick="editGoal(${i})">${icon("edit")}</button></div><p>${esc(g.target)}</p><div class="row"><div class="progress" role="progressbar" aria-label="${esc(g.title)}" aria-valuenow="${g.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${g.progress}%"></span></div><span class="percentage">${g.progress}%</span></div><div class="mini">${g.progress===100?"Target tercapai. Rayakan progresmu!":"Progres menuju target 90 hari"}</div></div></article>`).join("")}<button class="btn primary full" onclick="editGoal(-1)">${icon("plus")} Tambah Target</button><p class="quote">“Tujuan yang jelas,<br>membuat tindakan lebih mudah.”</p>`,"Target 90 Hari","Tiga fokus utama untuk versi terbaik dirimu.");}
function editGoal(i){if(i===-1&&data.goals.length>=3){toast("Maksimal 3 target. Edit target yang ada agar tetap fokus.");return;}const g=data.goals[i]||{title:"",target:"",progress:0};dialogForm(i<0?"Tambah target":"Edit target","Fokus pada proses, bukan hanya hasil.",field("Nama target","title",g.title,"text",'required maxlength="60"')+field("Hasil yang ingin dicapai","target",g.target,"text",'required maxlength="240"')+field("Progres (%)","progress",g.progress,"number",'required min="0" max="100"')+(i>=0?`<button class="text-btn danger-text" type="button" onclick="deleteGoal(${i})">Hapus target ini</button>`:""),f=>{const value={title:f.get("title").trim(),target:f.get("target").trim(),progress:Math.max(0,Math.min(100,Number(f.get("progress"))))};if(!value.title||!value.target)return;if(i<0)data.goals.push(value);else data.goals[i]=value;save();closeDialog();render();toast("Target tersimpan.");});}
function deleteGoal(i){closeDialog();dialogForm("Hapus target?",`Target “${esc(data.goals[i].title)}” akan dihapus.`,"",()=>{data.goals.splice(i,1);save();closeDialog();render();toast("Target dihapus.");},"Hapus");}
function allHistory(){const h={...data.history};if(dayScore(data.today)>0||h[todayKey()])h[todayKey()]={...data.today,score:dayScore(data.today)};return h;}
function calcStats(){const h=allHistory(),keys=Object.keys(h).filter(k=>k<=todayKey()).sort();let current=0,best=0,last=null;for(const k of keys){if(h[k].score*20>=data.threshold){current=last&&dayDiff(last,k)===1?current+1:1;best=Math.max(best,current);last=k;}else{current=0;last=null;}}const streak=last&&(last===todayKey()||last===shifted(todayKey(),-1))?current:0;return {days:keys.length,best,streak,consistent:keys.filter(k=>h[k].score*20>=data.threshold).length,remaining:Math.max(0,90-dayDiff(data.startDate,todayKey()))};}
function stats(){const h=allHistory(),s=calcStats(),dates=Array.from({length:statsPeriod},(_,i)=>shifted(todayKey(),i-statsPeriod+1)),entries=dates.filter(d=>h[d]),avg=entries.length?Math.round(entries.reduce((a,d)=>a+h[d].score*20,0)/entries.length):0;const groupSize=statsPeriod===7?1:statsPeriod===30?5:15;const buckets=[];for(let i=0;i<dates.length;i+=groupSize){const slice=dates.slice(i,i+groupSize),recorded=slice.filter(d=>h[d]);buckets.push({date:slice[0],value:recorded.length?Math.round(recorded.reduce((a,d)=>a+h[d].score*20,0)/recorded.length):0,label:statsPeriod===7?formatDate(slice[0],{weekday:"short"}):String(new Date(slice[0]+"T12:00").getDate())});}return shell(`<div class="tabs" role="group" aria-label="Periode statistik">${[[7,"Mingguan"],[30,"Bulanan"],[90,"90 Hari"]].map(([n,l])=>`<button class="${statsPeriod===n?"active":""}" aria-pressed="${statsPeriod===n}" onclick="statsPeriod=${n};render()">${l}</button>`).join("")}</div><section class="card chart-card"><div class="row chart-top"><div><h3>Execution Rate</h3><div class="rate">${avg}%</div><p class="trend">${entries.length?`${entries.length} hari tercatat dalam ${statsPeriod} hari terakhir`:"Mulai checklist untuk mencatat progres"}</p></div><span class="icon-disc">${icon("trend")}</span></div><div class="chart" role="img" aria-label="Grafik progres: ${buckets.map(b=>`${b.label} ${b.value}%`).join(', ')}"><div class="y-axis">${[100,75,50,25,0].map(n=>`<span>${n}%</span>`).join("")}</div><div class="bars">${buckets.map(b=>`<div class="bar-column"><div class="bar-area"><div class="bar-fill" style="height:${b.value}%" title="${b.value}%"></div></div><small>${b.label}</small></div>`).join("")}</div></div><div class="legend"><span><i></i>${groupSize===1?"Skor harian":`Rata-rata per ${groupSize} hari`}</span></div></section><div class="grid2">${kpi("fire","Streak",s.streak,"hari")}${kpi("star","Rata-rata Skor",(avg/20).toFixed(1),"/ 5")}${kpi("calendar","Hari Konsisten",s.consistent,"hari")}${kpi("calendar","Hari Tersisa",s.remaining,"hari")}</div><p class="day-note">Skor minimal 4/5 = satu hari konsisten.<br>Streak terbaikmu: ${s.best} hari.</p>`,"Statistik","Konsistensi kecil, hasil besar.");}
function kpi(i,label,value,unit){return `<div class="kpi">${icon(i)}<div><div class="kpi-label">${label}</div><b>${value}</b><small>${unit}</small></div></div>`;}
function more(){return shell(`${[["review","book","Review Mingguan","Lihat yang berhasil, perbaiki langkah berikutnya."],["failure","alert","Jurnal Kegagalan","Belajar dari hal yang belum berjalan baik."],["rewards","gift","Reward & Konsekuensi","Rayakan progres, jaga komitmen."],["settings","settings","Profil & Pengaturan","Atur SKD90 sesuai ritmemu."]].map(([r,i,t,s])=>`<button class="card more-card" onclick="go('${r}')"><span class="icon-disc">${icon(i)}</span><span class="label"><b>${t}</b><small>${s}</small></span>${icon("right","chevron")}</button>`).join("")}<p class="quote">“Versi terbaik dari kamu,<br>dimulai hari ini.”</p>`,"Lainnya","Ruang untuk bertumbuh, satu hari demi satu hari.");}
function weekKey(){const now=new Date(todayKey()+"T12:00:00"),offset=(now.getDay()+6)%7;return shifted(todayKey(),-offset+weekOffset*7);}
function review(){const key=weekKey(),rev=data.reviews[key]||(weekOffset===0?data.review:{});return shell(`${dateStrip(`<span class="today-date">${formatDate(key,{day:"numeric",month:"short"})} – ${formatDate(shifted(key,6))}</span>`,"weekOffset--;render()","weekOffset++;render()",weekOffset>=0)}<form class="review-form" onsubmit="saveReview(event)">${area("Apa yang berhasil minggu ini?","win",rev.win)}${area("Apa yang tidak berhasil?","fail",rev.fail)}${area("Kenapa itu terjadi?","why",rev.why)}${area("Apa yang akan saya perbaiki minggu depan?","improve",rev.improve)}<button class="btn primary full" type="submit">Simpan Review</button></form>`,"Review Mingguan","Luangkan waktu 5 menit untuk berkembang.");}
function saveReview(event){event.preventDefault();const rev=Object.fromEntries(new FormData(event.target));data.reviews[weekKey()]=rev;if(weekOffset===0)data.review=rev;if(save())toast("Review mingguan tersimpan.");}
function failure(){return shell(`<button class="btn primary full" onclick="openFailure(-1)">${icon("plus")} Catat Kegagalan</button>${data.failures.length?data.failures.map((f,i)=>`<button class="item" onclick="openFailure(${i})"><span class="icon-disc red">${icon(i%3===0?"alert":i%3===1?"phone":"list")}</span><span class="label"><b>${esc(f.what)}</b><small>${formatDate(f.date)}</small></span>${icon("right","chevron")}</button>`).join(""):`<div class="card empty"><span class="icon-disc red">${icon("book")}</span><b>Setiap pengalaman bisa jadi pelajaran.</b>Catat hal yang belum berjalan baik,<br>lalu tentukan langkah perbaikannya.</div>`}`,"Jurnal Kegagalan","Bukan untuk menghakimi, tapi belajar.");}
function openFailure(i){journalIndex=i;journalDraft={...(data.failures[i]||{date:todayKey(),what:"",why:"",repair:"",next:""})};go("detail");}
function detail(){const f=journalDraft;return `<div class="shell"><header class="top"><button class="icon-btn" aria-label="Kembali ke jurnal" onclick="go('failure')">${icon("left")}</button><h1 style="font-size:19px;letter-spacing:-.4px">${journalIndex<0?"Catat Kegagalan":"Detail Jurnal"}</h1>${journalIndex>=0?`<button class="icon-btn danger-text" aria-label="Hapus jurnal" onclick="deleteFailure()">${icon("trash")}</button>`:'<span style="width:40px"></span>'}</header><main class="stack"><div class="detail-heading"><span class="icon-disc red">${icon("alert")}</span><div><b>${esc(f.what||"Langkah baru dimulai dari refleksi")}</b><p class="mini">${formatDate(f.date)}</p></div></div><form onsubmit="saveFailure(event)">${area("1. Apa yang terjadi?","what",f.what)}${area("2. Kenapa ini terjadi?","why",f.why)}${area("3. Solusi / Perbaikan","repair",f.repair)}${area("4. Tindakan selanjutnya","next",f.next)}<button class="btn primary full" type="submit">Simpan</button></form></main>${nav()}</div>`;}
function saveFailure(e){e.preventDefault();const f={...journalDraft,...Object.fromEntries(new FormData(e.target))};if(!f.what.trim()){toast("Ceritakan dulu apa yang terjadi.");e.target.elements.what.focus();return;}if(journalIndex<0)data.failures.unshift(f);else data.failures[journalIndex]=f;save();go("failure");toast("Catatan jurnal tersimpan.");}
function deleteFailure(){dialogForm("Hapus catatan jurnal?","Catatan ini akan dihapus dari perangkat.","",()=>{data.failures.splice(journalIndex,1);save();closeDialog();go("failure");toast("Catatan dihapus.");},"Hapus");}
function rewards(){const s=calcStats(),isReward=rewardTab==="rewards",list=data[rewardTab];return shell(`<div class="tabs" role="group" aria-label="Jenis komitmen"><button class="${isReward?"active":""}" onclick="rewardTab='rewards';render()" aria-pressed="${isReward}">Reward</button><button class="${!isReward?"active":""}" onclick="rewardTab='consequences';render()" aria-pressed="${!isReward}">Konsekuensi</button></div>${list.length?list.map((r,i)=>`<button class="card reward-row" onclick="editReward(${i})" aria-label="Edit ${esc(r.text)}"><span class="check ${isReward&&s.best>=r.days?"done":""}">${isReward&&s.best>=r.days?icon("check"):""}</span><span class="icon-disc">${icon(isReward?["coffee","book","plane"][i%3]:"target")}</span><span class="label"><b>${r.days} hari ${isReward?"konsisten":"terlewat"}</b><small>${esc(r.text)}</small></span></button>`).join(""):`<div class="card empty"><b>Komitmen yang membantumu kembali.</b>Pilih konsekuensi ringan dan membangun,<br>seperti merapikan ruang kerja.</div>`}<button class="btn primary full" onclick="editReward(-1)">${icon("plus")} Tambah ${isReward?"Reward":"Konsekuensi"}</button><p class="quote">${isReward?'“Rayakan progres, sekecil apa pun.<br>Kamu sedang membangun kamu yang baru.”':"“Kembali ke proses,<br>tanpa menyalahkan diri sendiri.”"}</p>`,"Reward & Konsekuensi","Buat disiplin jadi lebih menyenangkan.");}
function editReward(i){const isReward=rewardTab==="rewards",r=data[rewardTab][i]||{days:7,text:""};dialogForm(`${i<0?"Tambah":"Edit"} ${isReward?"reward":"konsekuensi"}`,isReward?"Dibuka berdasarkan streak terbaikmu.":"Pengingat komitmen pribadi; tidak dijalankan otomatis.",field(isReward?"Jumlah hari konsisten":"Jumlah hari terlewat","days",r.days,"number",'required min="1" max="90"')+field(isReward?"Hadiah untuk dirimu":"Langkah perbaikan","text",r.text,"text",'required maxlength="180"'),f=>{const r={days:Number(f.get("days")),text:f.get("text").trim()};if(!r.text)return;if(i<0)data[rewardTab].push(r);else data[rewardTab][i]=r;save();closeDialog();render();toast("Komitmen tersimpan.");});}
function menuRow(i,text,action,right=""){return `<button class="menu-row" onclick="${action}">${icon(i)}<span class="label">${text}</span>${right?`<span class="mini">${right}</span>`:""}${icon("right","chevron")}</button>`;}
function settings(){return shell(`<div class="profile"><div class="avatar large">${icon("user")}</div><div class="profile-content"><b>${esc(data.name)}</b><p>Perjalanan 90 hari menuju versi terbaik dirimu.</p><button class="btn ghost full" onclick="editProfile()">Edit Profil</button></div></div><div>${menuRow("bell","Pengaturan Notifikasi","notificationSettings()")}${menuRow("settings","Pengaturan Habit","habitSettings()")}${menuRow("cloud","Data & Backup","backupSettings()")}${menuRow("moon","Tema","toggleTheme()",data.settings.theme==="dark"?"Gelap":"Terang")}${menuRow("info","Tentang SKD90","aboutApp()")}${menuRow("logout",'<span class="danger-text">Kembali ke layar awal</span>',"showSplash()")}</div><p class="about">Disiplin hari ini, hidup lebih baik nanti.<br>SKD90 v2.0.0</p>`,"Profil & Pengaturan");}
function editProfile(){dialogForm("Edit profil","Setiap perubahan dimulai dari diri sendiri.",field("Nama kamu","name",data.name,"text",'required maxlength="40"')+field("Tanggal mulai 90 hari","startDate",data.startDate,"date",`required max="${todayKey()}"`),f=>{const name=f.get("name").trim();if(!name)return;data.name=name;data.startDate=f.get("startDate");save();closeDialog();render();toast("Profil diperbarui.");});}
function habitSettings(){dialogForm("Pengaturan habit","Bangun kebiasaan yang bisa kamu ulangi.",field("Kebiasaan utama","habit",data.today.habitText,"text",'required maxlength="150"')+`<label class="reviewQ"><b>Durasi fokus default</b><select class="input" name="duration"><option value="25" ${data.settings.focusMinutes===25?"selected":""}>25 menit</option><option value="50" ${data.settings.focusMinutes===50?"selected":""}>50 menit</option></select></label>`,f=>{data.today.habitText=f.get("habit").trim();data.settings.focusMinutes=Number(f.get("duration"));if(data.history[todayKey()])syncToday();save();closeDialog();resetTimer();toast("Kebiasaan diperbarui.");});}
function toggleTheme(){data.settings.theme=data.settings.theme==="dark"?"light":"dark";save();render();}
function showSplash(){data.onboarded=false;route="home";save();render();}
function notificationSettings(){dialogForm("Notifikasi fokus","Notifikasi muncul saat sesi fokus selesai, selama aplikasi masih terbuka. Browser akan meminta izin saat diaktifkan.",`<label class="reviewQ"><b>Notifikasi sesi selesai</b><select class="input" name="enabled"><option value="false">Nonaktif</option><option value="true" ${data.settings.notifications?"selected":""}>Aktif</option></select></label>`,async f=>{if(f.get("enabled")==="true"){if(!("Notification" in window)){toast("Browser ini belum mendukung notifikasi.");return;}const p=await Notification.requestPermission();data.settings.notifications=p==="granted";if(p!=="granted")toast("Izin notifikasi belum diberikan.");}else data.settings.notifications=false;save();closeDialog();});}
function backupSettings(){dialogForm("Data & Backup","Data tersimpan di browser perangkat ini. Unduh cadangan sebelum berpindah perangkat atau membersihkan browser.",`<button type="button" class="btn soft full" onclick="exportBackup()">Unduh Backup (.json)</button><label class="reviewQ" style="margin-top:18px"><b>Pulihkan dari backup</b><input type="file" accept=".json,application/json" class="input" onchange="importBackup(this.files[0])"></label><button type="button" class="text-btn danger-text" onclick="resetAll()">Reset semua data</button>`,()=>closeDialog(),"Selesai");}
function exportBackup(){const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`SKD90-backup-${todayKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast("Backup disiapkan untuk diunduh.");}
async function importBackup(file){if(!file)return;try{if(file.size>5e6)throw Error();const v=JSON.parse(await file.text());if(!v||typeof v.name!=="string"||!v.today?.checks||!Array.isArray(v.goals)||!v.history||typeof v.history!=="object"||!Array.isArray(v.failures)||!Array.isArray(v.rewards))throw Error();const safe=normalizeBackup(v);closeDialog();dialogForm("Pulihkan backup?","Data saat ini akan diganti oleh isi backup. Unduh cadangan terlebih dahulu jika diperlukan.","",()=>{data=safe;stopTimer();save();selectedDate=todayKey();rollover();closeDialog();go("home");toast("Backup berhasil dipulihkan.");},"Pulihkan");}catch{toast("File backup tidak valid. Pilih backup JSON SKD90.");}}
function normalizeBackup(v){const date=x=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+"T12:00:00"))?x:todayKey();const checks=x=>Object.fromEntries(Object.keys(blankChecks()).map(k=>[k,x?.[k]===true]));const day=x=>({mitText:String(x?.mitText||"").slice(0,300),habitText:String(x?.habitText||defaults.today.habitText).slice(0,150),checks:checks(x?.checks),score:Object.values(checks(x?.checks)).filter(Boolean).length});const rev=x=>Object.fromEntries(["win","fail","why","improve"].map(k=>[k,String(x?.[k]||"")]));const history={};for(const [k,val] of Object.entries(v.history)){if(date(k)===k)history[k]=day(val);}return {...structuredClone(defaults),onboarded:true,name:v.name.slice(0,40),startDate:date(v.startDate),todayDate:date(v.todayDate),today:day(v.today),goals:v.goals.slice(0,3).map(g=>({title:String(g.title||"Target").slice(0,60),target:String(g.target||"").slice(0,240),progress:Math.max(0,Math.min(100,Number(g.progress)||0))})),history,failures:v.failures.map(f=>({date:date(f.date),what:String(f.what||""),why:String(f.why||""),repair:String(f.repair||""),next:String(f.next||"")})),rewards:v.rewards.map(r=>({days:Math.max(1,Math.min(90,Number(r.days)||7)),text:String(r.text||"")})),consequences:(Array.isArray(v.consequences)?v.consequences:[]).map(r=>({days:Math.max(1,Math.min(90,Number(r.days)||7)),text:String(r.text||"")})),review:rev(v.review),reviews:Object.fromEntries(Object.entries(v.reviews||{}).filter(([k])=>date(k)===k).map(([k,val])=>[k,rev(val)])),settings:{focusMinutes:v.settings?.focusMinutes===50?50:25,theme:v.settings?.theme==="dark"?"dark":"light",notifications:false}};}
function resetAll(){closeDialog();dialogForm("Reset semua data?","Semua checklist, target, jurnal, dan review pada perangkat ini akan dihapus. Tindakan ini tidak dapat dibatalkan.","",()=>{stopTimer();if(sound){sound.source.stop();sound.context.close();sound=null;}data=structuredClone(defaults);data.startDate=todayKey();data.todayDate=todayKey();save();route="home";selectedDate=todayKey();closeDialog();render();toast("Data berhasil direset.");},"Hapus semua");}
function aboutApp(){dialogForm("SKD90","Sistem Kendali Diri 90 Hari",`<p style="margin-top:16px">Lima langkah harian: tugas utama, fokus tanpa gangguan, kebiasaan utama, pagi tanpa scroll, dan evaluasi malam.</p><p style="margin-top:12px">Versi 2.0.0 · Data lokal di perangkat.<br>Dapat dipakai offline setelah dibuka pertama kali melalui server atau hosting.</p>`,()=>closeDialog(),"Mengerti");}
function render(){rollover();document.documentElement.dataset.theme=data.settings.theme;const pages={home,focus,goals,stats,more,review,failure,detail,rewards,settings};document.getElementById("app").innerHTML=data.onboarded?(pages[route]||home)():splash();if(data.onboarded&&route==="focus")updateTimerDisplay();document.title=`${data.onboarded?({home:"Beranda",focus:"Fokus",goals:"Target 90 Hari",stats:"Statistik",more:"Lainnya",review:"Review Mingguan",failure:"Jurnal Kegagalan",detail:"Detail Jurnal",rewards:"Reward",settings:"Profil"}[route]||"Beranda")+" · ":""}SKD90`;}
document.addEventListener("visibilitychange",()=>{if(!document.hidden){tick();if(data.todayDate!==todayKey())render();}});
if("serviceWorker" in navigator&&location.protocol!=="file:")window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
data.onboarded = false;
render();
