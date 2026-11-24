document.querySelectorAll('#tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id===b.dataset.v));
});
document.querySelectorAll('#clips .clip').forEach((c,i,all)=>c.onclick=()=>all.forEach((x,j)=>{x.className='clip'+(j<i?' done':j===i?' now':'')}));
