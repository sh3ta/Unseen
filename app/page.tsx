 "use client";
import { useMemo, useState } from "react";

type Lang = "az" | "en";
type Section = "all" | "confessions" | "thoughts" | "memories" | "questions" | "media" | "requests" | "messages";
const words = {
 az: {
  eyebrow:"GÖRÜNƏNİN O TƏRƏFİNDƏ BİR DÜNYA", tagline:"Görünməyən tərəfini kəşf et.",
  intro:"Fikirlər, xatirələr və içində saxladığın sözlər ",
  explore:"Kəşf et", write:"Anonim yaz", featured:"Sənin kainatın",
  featuredSub:"Bəzən demədiyimiz sözlər bizi ən yaxşı izah edir.",
  sections:"Kainatı kəşf et", all:"Hamısı", confessions:"Etiraflar", thoughts:"Fikirlər",
  memories:"Xatirələr", questions:"Sual-cavab", media:"Şəkil və video", requests:"Sorğular",
  messages:"Mənə yaz", latest:"Son paylaşımlar", latestSub:"Başqalarının görünməyən tərəflərindən parçalar.",
  empty:"Bu bölmədə hələ paylaşım yoxdur. İlk yazan sən ol.", formTitle:"İçindəkini burax",
  formSub:"Adını yazmağa ehtiyac yoxdur. Sadəcə fikrini paylaş.", placeholder:"Nə demək istəyirsən?",
  type:"Paylaşım bölməsi", send:"Anonim paylaş", sent:"Paylaşım bu baxışda əlavə olundu.",
  note:"Demo rejimi: paylaşımlar hələlik yalnız bu səhifə açıq olduğu müddətdə görünür. Hamı üçün saxlamaq üçün məlumat bazası qoşulmalıdır.",
  contact:"Əlaqə", contactSub:"Təklifin, sualın və ya fikrin var? Buradan yaza bilərsən.",
  contactPlaceholder:"Mesajını yaz...", sendMessage:"Mesajı hazırla", mediaTitle:"Sözünə şəkil və ya video əlavə et",
  mediaNote:"Demo rejimində fayl seçimi görünür, amma faylların hamı üçün saxlanması üçün fayl yaddaşı qoşulmalıdır.",
  upload:"Şəkil/video seç", about:"Haqqında", rules:"Qaydalar", privacy:"Məxfilik",
  footer:"Fikirlərin. Xatirələrin. Sənin kainatın.", name:"Ad (istəyə bağlı)", email:"E-poçt (istəyə bağlı)"
 },
 en: {
  eyebrow:"A WORLD BEYOND THE VISIBLE", tagline:"Discover the unseen side of you.",
  intro:"Thoughts, memories, and words .",
  explore:"Explore", write:"Write anonymously", featured:"Your universe",
  featuredSub:"Sometimes the words we never say explain us best.",
  sections:"Explore the universe", all:"All", confessions:"Confessions", thoughts:"Thoughts",
  memories:"Memories", questions:"Q&A", media:"Photo & video", requests:"Polls",
  messages:"Message me", latest:"Latest transmissions", latestSub:"Fragments from the unseen sides of others.",
  empty:"Nothing here yet. Be the first to share.", formTitle:"Let it out",
  formSub:"No name needed. Just share what is on your mind.", placeholder:"What would you like to say?",
  type:"Post category", send:"Share anonymously", sent:"Your post was added to this view.",
  note:"Demo mode: posts are only visible while this page stays open. A database is needed to save them for everyone.",
  contact:"Contact", contactSub:"Have a suggestion, question, or thought? Send a message here.",
  contactPlaceholder:"Write your message...", sendMessage:"Prepare message", mediaTitle:"Add a photo or video",
  mediaNote:"File selection is shown in demo mode; shared file storage must be connected to publish files for everyone.",
  upload:"Choose photo/video", about:"About", rules:"Guidelines", privacy:"Privacy",
  footer:"Your thoughts. Your memories. Your universe.", name:"Name (optional)", email:"Email (optional)"
 }
};
const samples = [
 {id:1,type:"thoughts" as Section,az:"Bəzən insanın ehtiyacı olan tək şey, onu izah etmədən anlayan birinin olmasıdır.",en:"Sometimes all a person needs is someone who understands without asking for an explanation.",tag:"01 / THOUGHT"},
 {id:2,type:"memories" as Section,az:"Bəzi xatirələr bitmir. Sadəcə onları danışdığımız insan artıq yanımızda olmur.",en:"Some memories never end. The person we shared them with is simply no longer beside us.",tag:"02 / MEMORY"},
 {id:3,type:"confessions" as Section,az:"Hamıya yaxşı olduğumu deyirəm. Bəzən özüm də buna inanmaq istəyirəm.",en:"I tell everyone I am doing fine. Sometimes I want to believe it myself.",tag:"03 / CONFESSION"}
];
export default function Home(){
 const [lang,setLang]=useState<Lang>("az"),[section,setSection]=useState<Section>("all");
 const [message,setMessage]=useState(""),[type,setType]=useState<Section>("confessions");
 const [posts,setPosts]=useState(samples),[notice,setNotice]=useState("");
 const [contactText,setContactText]=useState(""),[contactName,setContactName]=useState(""),[contactEmail,setContactEmail]=useState("");
 const [poll,setPoll]=useState(""),[pollChoice,setPollChoice]=useState("");
 const t=words[lang];
 const visible=useMemo(()=>posts.filter(p=>section==="all"||p.type===section),[posts,section]);
 const options: {id:Section;label:string}[]=[
  {id:"all",label:t.all},{id:"confessions",label:t.confessions},{id:"thoughts",label:t.thoughts},
  {id:"memories",label:t.memories},{id:"questions",label:t.questions}
 ];
 function submitPost(){
  if(!message.trim()){setNotice(lang==="az"?"Əvvəlcə bir şey yaz.":"Write something first.");return;}
  setPosts([{id:Date.now(),type,az:message.trim(),en:message.trim(),tag:`${String(posts.length+1).padStart(2,"0")} / ${type.toUpperCase()}`},...posts]);
  setMessage("");setNotice(t.sent);setSection("all");
 }
 function prepareContact(){
  if(!contactText.trim()){setNotice(lang==="az"?"Mesajını yaz.":"Write your message first.");return;}
  const subject=encodeURIComponent("UNSEEN — "+(contactName||"Contact message"));
  const body=encodeURIComponent(contactText+"\n\n"+contactName+"\n"+contactEmail);
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
 }
 return <main className="site-shell"><div className="space-glow glow-one"/><div className="space-glow glow-two"/><div className="stars"/>
 <header className="topbar"><a className="brand" href="#home">UN<span>SEEN</span><i>✦</i></a><nav className="nav-links"><a href="#home">{lang==="az"?"Ana səhifə":"Home"}</a><a href="#universe">{t.sections}</a><a href="#write">{t.write}</a><a href="#contact">{t.contact}</a></nav><button className="lang-switch" onClick={()=>setLang(lang==="az"?"en":"az")}>{lang==="az"?"EN ↗":"AZ ↗"}</button></header>
 <section className="hero" id="home"><p className="eyebrow"><span className="eyebrow-line"/>{t.eyebrow}<span className="eyebrow-line"/></p><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-star">✦</div><h1>UNSEEN</h1><p className="hero-tagline">{t.tagline}</p><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button button-primary" href="#universe">{t.explore} <span>↘</span></a><a className="button button-quiet" href="#write">{t.write} <span>↗</span></a></div><div className="scroll-cue"><span/> SCROLL TO DISCOVER</div></section>
 <section className="manifesto"><div className="manifesto-mark">“</div><div><p className="section-kicker">A NOTE TO THE UNSEEN</p><h2>{t.featured}</h2><p>{t.featuredSub}</p></div><div className="manifesto-orb"><span>✧</span></div></section>
 <section className="content-section" id="universe"><div className="section-heading"><div><p className="section-kicker">01 — DISCOVER</p><h2>{t.sections}</h2><p className="muted">{t.latestSub}</p></div><span className="heading-star">✧</span></div>
 <div className="category-grid">
 {([{id:"confessions",label:t.confessions,sub:lang==="az"?"Deyilməyən sözlər":"Words left unsaid",icon:"◌"},{id:"thoughts",label:t.thoughts,sub:lang==="az"?"Ağlından keçənlər":"Passing thoughts",icon:"✧"},{id:"memories",label:t.memories,sub:lang==="az"?"İçində yaşayan anlar":"Moments that remain",icon:"☾"},{id:"questions",label:t.questions,sub:lang==="az"?"Bir-birimizə suallar":"Questions for each other",icon:"?"},{id:"media",label:t.media,sub:lang==="az"?"Vizual hekayələr":"Visual stories",icon:"▧"},{id:"requests",label:t.requests,sub:lang==="az"?"İştirak et və səs ver":"Vote and take part",icon:"◉"},{id:"messages",label:t.messages,sub:lang==="az"?"Mənə özəl mesaj":"Send me a message",icon:"✉"}] as {id:Section;label:string;sub:string;icon:string}[]).map((c,i)=><button key={c.id} className={`category-card ${section===c.id?"selected":""}`} onClick={()=>{setSection(c.id);if(c.id==="media")document.getElementById("media")?.scrollIntoView({behavior:"smooth"});else if(c.id==="requests")document.getElementById("polls")?.scrollIntoView({behavior:"smooth"});else if(c.id==="messages")document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});else document.getElementById("universe")?.scrollIntoView({behavior:"smooth"});}}><span className="card-number">0{i+1}</span><span className="category-icon">{c.icon}</span><strong>{c.label}</strong><small>{c.sub}</small><span className="card-arrow">↗</span></button>)}
 </div>
 <div className="filter-row"><div><p className="section-kicker">02 — TRANSMISSIONS</p><h2>{t.latest}</h2></div><div className="filters">{options.map(o=><button key={o.id} className={section===o.id?"filter active":"filter"} onClick={()=>setSection(o.id)}>{o.label}</button>)}</div></div>
 <div className="post-grid">{visible.length?visible.map(p=><article className="post-card" key={p.id}><div className="post-meta"><span>{p.tag}</span><span className="anonymous-dot">● ANONYMOUS</span></div><p className="post-text">“{lang==="az"?p.az:p.en}”</p><div className="post-bottom"><span>{lang==="az"?"Adsız paylaşım":"Anonymous transmission"}</span><span>✧</span></div></article>):<div className="empty-state"><span>☾</span><p>{t.empty}</p></div>}</div></section>
 <section className="write-section" id="write"><div className="write-copy"><p className="section-kicker">03 — RELEASE</p><h2>{t.formTitle}</h2><p>{t.formSub}</p><div className="write-decoration">✧</div></div><div className="write-form"><label htmlFor="post-type">{t.type}</label><select id="post-type" value={type} onChange={e=>setType(e.target.value as Section)}><option value="confessions">{t.confessions}</option><option value="thoughts">{t.thoughts}</option><option value="memories">{t.memories}</option><option value="questions">{t.questions}</option></select><label htmlFor="message">{lang==="az"?"Mesajın":"Your message"}</label><textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} placeholder={t.placeholder} maxLength={600} rows={5}/><div className="form-foot"><span>{message.length}/600</span><button className="button button-primary" onClick={submitPost}>{t.send} <span>↗</span></button></div>{notice&&<p className="notice" role="status">{notice}</p>}<p className="demo-note">ⓘ {t.note}</p></div></section>
 <section className="content-section extra-section" id="media"><div className="section-heading"><div><p className="section-kicker">04 — VISUALS</p><h2>{t.mediaTitle}</h2><p className="muted">{t.mediaNote}</p></div><span className="heading-star">✧</span></div><label className="upload-box" htmlFor="media-upload"><span>＋</span><strong>{t.upload}</strong><small>JPG, PNG, MP4, WEBM</small><input id="media-upload" type="file" accept="image/*,video/*" onChange={e=>setNotice(e.target.files?.[0]?.name||"")} /></label>{notice&&<p className="notice">{notice}</p>}</section>
 <section className="content-section extra-section" id="polls"><div className="section-heading"><div><p className="section-kicker">05 — COMMUNITY</p><h2>{lang==="az"?"İcma sorğusu":"Community poll"}</h2><p className="muted">{lang==="az"?"İzləyicilərinə sual ver, cavabları topla.":"Ask your visitors a question and collect responses."}</p></div><span className="heading-star">◉</span></div><div className="poll-card"><label htmlFor="poll-question">{lang==="az"?"Sorğunun sualı":"Poll question"}</label><input id="poll-question" value={poll} onChange={e=>setPoll(e.target.value)} placeholder={lang==="az"?"Məsələn: Hansı mövzu haqqında danışaq?":"e.g. What should we talk about?"}/><label htmlFor="poll-choice">{lang==="az"?"Cavab variantı":"Answer option"}</label><input id="poll-choice" value={pollChoice} onChange={e=>setPollChoice(e.target.value)} placeholder={lang==="az"?"Bir variant yaz":"Add an option"}/><p className="demo-note">{lang==="az"?"Bu sorğu qurma maketidir; real səs toplamaq üçün məlumat bazası lazımdır.":"This is a poll builder mockup; a database is needed to collect votes."}</p></div></section>
 <section className="write-section contact-section" id="contact"><div className="write-copy"><p className="section-kicker">06 — CONNECTION</p><h2>{t.contact}</h2><p>{t.contactSub}</p><div className="write-decoration">✉</div></div><div className="write-form"><label htmlFor="contact-name">{t.name}</label><input id="contact-name" value={contactName} onChange={e=>setContactName(e.target.value)} placeholder={lang==="az"?"Adın":"Your name"}/><label htmlFor="contact-email">{t.email}</label><input id="contact-email" type="email" value={contactEmail} onChange={e=>setContactEmail(e.target.value)} placeholder="you@example.com"/><label htmlFor="contact-message">{t.contactPlaceholder}</label><textarea id="contact-message" rows={5} value={contactText} onChange={e=>setContactText(e.target.value)} placeholder={t.contactPlaceholder}/><button className="button button-primary" onClick={prepareContact}>{t.sendMessage} ↗</button><p className="demo-note">{lang==="az"?"Düymə cihazında e-poçt tətbiqini açmağa çalışacaq. Real mesaj qəbulu üçün e-poçt xidməti qoşulmalıdır.":"This button opens your email app. A mail service is needed to receive messages directly."}</p></div></section>
 <footer className="footer"><a className="brand footer-brand" href="#home">UN<span>SEEN</span><i>✦</i></a><p>{t.footer}</p><div className="footer-links"><a href="#universe">{t.about}</a><a href="#write">{t.rules}</a><a href="#contact">{t.privacy}</a></div><small>© 2026 UNSEEN — A QUIET CORNER OF THE UNIVERSE</small></footer>
 </main>;
}
