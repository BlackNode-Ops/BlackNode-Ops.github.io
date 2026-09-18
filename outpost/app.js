const STORAGE_KEY = "outpost.v3";
const BANNED = ["vault","partner","official","endorsed","backed by","exclusive","guaranteed","apy","yield","passive income","floor","wen","lfg","gamefi","p2e","small creatures: unbound"];
const views = [
  ["today","Today","Ship one sliver. Leave the map in the dark."],
  ["queue","Queue","Everything waiting. Copy, then paste into X."],
  ["replies","Replies","Only under live threads. Do not schedule these."],
  ["reveal","Reveal","Little by little. One new fact per post."],
  ["rules","Rules","The kill list. If it is here, it stays off X."],
  ["tracker","Tracker","Paste into X Pro. Outpost does not scrape X."],
  ["calendar","Calendar","Grant week. Times are PDT."]
];
function load(){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return structuredClone(seed);return{...structuredClone(seed),...JSON.parse(raw)};}catch{return structuredClone(seed);}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
let state=load();let current="today";let editing=null;
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1600);}
async function copyText(text){await navigator.clipboard.writeText(text);toast("Copied \u2014 paste into X");}
function escapeHtml(str=""){return String(str).replace(/[&<>"']/g,c=>({"&":"&","<":"<",">":">",'"':""","'":"&#39;"}[c]));}
function hitsBanned(text){const lower=text.toLowerCase();return BANNED.filter(w=>lower.includes(w));}
function daysToGrant(){return Math.max(0,Math.ceil((Date.UTC(2026,8,25)-Date.now())/86400000));}
function renderNav(){document.getElementById("nav").innerHTML=views.map(([id,label])=>`<button data-view="${id}" class="${id===current?"active":""}">${label}</button>`).join("");document.getElementById("countdown").innerHTML=`<b>${daysToGrant()}d</b><span>until grant applications open</span>`;}
function nextReady(){return state.posts.find(p=>p.status!=="posted");}
function postCard(p,hero){const chars=p.body.length;const hot=p.kind==="SCHEDULE"&&chars>280;const banned=hitsBanned(p.body);return `<article class="card ${hero?"hero":""} ${p.status==="posted"?"posted":""}" data-id="${p.id}"><div class="card-head"><span class="tag ${p.kind}">${p.kind}</span><span class="meta">${escapeHtml(p.when||"")} \u00b7 ${chars} chars${hot?" \u00b7 over 280":""}</span></div><div class="meta">${escapeHtml(p.target||"")}${p.media?" \u00b7 "+escapeHtml(p.media):""}</div><p class="body">${escapeHtml(p.body)}</p>${banned.length?`<p class="meta" style="color:var(--warn);margin-top:8px">Blocked words: ${banned.join(", ")}</p>`:""}<div class="actions"><button class="copy" data-act="copy">Copy</button><button class="mini" data-act="edit">Edit</button><button class="mini" data-act="done">${p.status==="posted"?"Unmark":"Mark shipped"}</button><button class="mini" data-act="delete">Delete</button></div></article>`;}
function renderToday(){const next=nextReady();const note=`<div class="card"><div class="card-head"><strong>Turn a build note into a sliver</strong></div><div class="composer"><textarea id="rawNote" placeholder="paste the day's note"></textarea><div class="chips"><button class="mini" data-veil="glass">glass</button><button class="mini" data-veil="thinner">thinner</button><button class="mini" data-veil="quiet">quiet number</button></div><button class="primary" id="veilBtn" type="button">Make sliver</button></div></div>`;return `<div class="two">${next?postCard(next,true):`<div class="card hero"><p class="body">Queue is clear.</p></div>`}${note}</div>`;}
function renderQueue(){return `<div class="grid">${state.posts.map(p=>postCard(p)).join("")}</div>`;}
function renderReplies(){return `<div class="grid">${state.replies.map(r=>`<article class="card" data-id="${r.id}" data-col="replies"><div class="card-head"><span class="tag REPLY">REPLY</span><span class="meta">${escapeHtml(r.target)}</span></div><p class="body">${escapeHtml(r.body)}</p><div class="actions"><button class="copy" data-act="copy">Copy</button><button class="mini" data-act="delete">Delete</button></div></article>`).join("")}</div>`;}
function renderReveal(){return `<div class="card"><ul class="list">${state.reveal.map(s=>`<li><strong>${s.step}. ${escapeHtml(s.title)}</strong> \u00b7 ${s.status}<small>${escapeHtml(s.note)}</small></li>`).join("")}</ul></div>`;}
function renderRules(){return `<div class="two"><div class="card"><p class="meta">Never say</p><ul class="list ban">${state.never.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></div><div class="card"><p class="meta">Voice</p><ul class="list"><li>builder, dry, specific, lion-coded, evidence-first, never shill</li><li>1 named HUBPLACE post / 3 hints</li><li>Applying, never selected</li><li>Tag @LoadedLions_CDC only when the post is about them</li><li>Drafts only. You tap Post.</li></ul></div></div>`;}
function renderTracker(){return `<div class="card"><ul class="list">${state.tracker.map(t=>`<li><code data-copy="${escapeHtml(t.q)}">${escapeHtml(t.q)}</code><span>${escapeHtml(t.why)}</span></li>`).join("")}</ul></div>`;}
function renderCalendar(){return `<div class="card"><ul class="list">${state.calendar.map(c=>`<li><strong>${escapeHtml(c.day)}</strong><span>${escapeHtml(c.item)}</span></li>`).join("")}</ul></div>`;}
const renderers={today:renderToday,queue:renderQueue,replies:renderReplies,reveal:renderReveal,rules:renderRules,tracker:renderTracker,calendar:renderCalendar};
function setView(name){current=name;const meta=views.find(v=>v[0]===name);document.getElementById("viewTitle").textContent=meta[1];document.getElementById("viewSub").textContent=meta[2];document.getElementById("views").innerHTML=renderers[name]();renderNav();bind();}
function persist(){save();}
function veilNote(raw,style){const num=raw.match(/(\d+\s*%?\s*[\u2192\->]+\s*\d+\s*%?)/);const n=num?num[1].replace("->","\u2192").replace("-","\u2192"):"";if(style==="quiet")return n||raw.split("\n")[0];if(style==="thinner")return n?`Less in the way.\n\n${n}`:raw;return n?`The glass got thinner.\n\n${n}`:`The glass got thinner.\n\n${raw.split("\n")[0]}`;}
function openForm(post){editing=post?post.id:null;const f=document.getElementById("form");document.getElementById("formTitle").textContent=post?"Edit sliver":"New sliver";f.kind.value=post?.kind||"TEASER";f.when.value=post?.when||"";f.target.value=post?.target||"";f.media.value=post?.media||"";f.body.value=post?.body||"";tickForm();document.getElementById("modal").classList.remove("hidden");}
function tickForm(){const f=document.getElementById("form");const n=f.body.value.length;const banned=hitsBanned(f.body.value);document.getElementById("charCount").textContent=n+" chars";const warn=document.getElementById("banWarn");warn.textContent=banned.length?"blocked: "+banned.join(", "):(n>280?"over 280 \u2014 fine for Draft, not Schedule":"");warn.className=(banned.length||n>280)?"hot":"";}
function bind(){document.getElementById("views").onclick=(e)=>{
  const code=e.target.closest("code[data-copy]");if(code)return copyText(code.dataset.copy);
  const veil=e.target.closest("[data-veil]");if(veil){document.getElementById("rawNote").dataset.veil=veil.dataset.veil;toast(veil.dataset.veil);return;}
  if(e.target.id==="veilBtn"){const raw=document.getElementById("rawNote").value.trim();if(!raw)return toast("Paste a note first");const sliver=veilNote(raw,document.getElementById("rawNote").dataset.veil||"glass");state.posts.unshift({id:crypto.randomUUID(),kind:"TEASER",status:"ready",when:"Now",target:"From today's note",media:"Tight crop only",body:sliver});persist();setView("today");return;}
  const btn=e.target.closest("button");const card=e.target.closest("article[data-id]");if(!btn||!card)return;const id=card.dataset.id;const act=btn.dataset.act;
  if(card.dataset.col==="replies"){const r=state.replies.find(x=>x.id===id);if(act==="copy")copyText(r.body);if(act==="delete"){state.replies=state.replies.filter(x=>x.id!==id);persist();setView("replies");}return;}
  const p=state.posts.find(x=>x.id===id);if(act==="copy")copyText(p.body);if(act==="edit")openForm(p);if(act==="done"){p.status=p.status==="posted"?"ready":"posted";persist();setView(current);}if(act==="delete"){state.posts=state.posts.filter(x=>x.id!==id);persist();setView(current);}
};}
document.getElementById("nav").addEventListener("click",e=>{const b=e.target.closest("button");if(b)setView(b.dataset.view);});
document.getElementById("newBtn").addEventListener("click",()=>openForm(null));
document.getElementById("cancelBtn").addEventListener("click",()=>document.getElementById("modal").classList.add("hidden"));
document.getElementById("form").body.addEventListener("input",tickForm);
document.getElementById("form").addEventListener("submit",e=>{e.preventDefault();const f=e.target;const banned=hitsBanned(f.body.value);if(banned.length&&!confirm("Banned words: "+banned.join(", ")+"\nSave anyway?"))return;const next={id:editing||crypto.randomUUID(),kind:f.kind.value,status:"ready",when:f.when.value,target:f.target.value,media:f.media.value,body:f.body.value.trim()};if(editing)state.posts=state.posts.map(p=>p.id===editing?next:p);else state.posts.unshift(next);persist();document.getElementById("modal").classList.add("hidden");setView("queue");});
document.getElementById("exportBtn").addEventListener("click",()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:"application/json"}));a.download="outpost-queue.json";a.click();});
setView("today");
