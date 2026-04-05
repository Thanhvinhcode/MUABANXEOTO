let data = JSON.parse(localStorage.getItem('clean_v2')) || {
  debt: [],
  loan: [],
  theme: 'light'
};

function save(){
  localStorage.setItem('clean_v2', JSON.stringify(data));
}

function parseMoney(v){
  v = v.toLowerCase().replace(/\s/g,'').replace(/,/g,'');
  if(v.includes('k')) return parseFloat(v)*1000;
  if(v.includes('tr')) return parseFloat(v)*1000000;
  return Number(v);
}

function format(v){
  return v.toLocaleString() + 'đ';
}

function formatInput(input){
  let value = input.value.replace(/,/g,'');
  if(!isNaN(value) && value !== ''){
    input.value = Number(value).toLocaleString();
  }
}

function add(type){
  let n = document.getElementById(type==='debt'?'n1':'n2').value;
  let m = document.getElementById(type==='debt'?'m1':'m2').value;

  if(!n || !m) return alert('Nhập đủ');

  data[type].push({
    name: n,
    amount: parseMoney(m)
  });

  save();
  render();
}

function toggleRow(row){
  row.classList.toggle('active');
}

function change(type,i,val,mode){
  let v = parseMoney(val);
  if(!v) return;

  if(mode === '+') data[type][i].amount += v;
  else data[type][i].amount -= v;

  if(data[type][i].amount < 0)
    data[type][i].amount = 0;

  save();
  render();
}

function del(type,i){
  if(confirm('Xóa?')){
    data[type].splice(i,1);
    save();
    render();
  }
}

function render(){
  let totalDebt = 0, totalLoan = 0;

  document.getElementById('list1').innerHTML = data.debt.map((d,i)=>{
    totalDebt += d.amount;
    return `
    <tr onclick="toggleRow(this)">
      <td>${d.name}</td>
      <td>${format(d.amount)}</td>
      <td>
        <div class="actions">
          <input id="d${i}" placeholder="số" oninput="formatInput(this)">
          <button class="btn plus" onclick="event.stopPropagation();change('debt',${i},document.getElementById('d${i}').value,'+')">+</button>
          <button class="btn minus" onclick="event.stopPropagation();change('debt',${i},document.getElementById('d${i}').value,'-')">-</button>
          <button class="btn delete" onclick="event.stopPropagation();del('debt',${i})">X</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  document.getElementById('list2').innerHTML = data.loan.map((d,i)=>{
    totalLoan += d.amount;
    return `
    <tr onclick="toggleRow(this)">
      <td>${d.name}</td>
      <td>${format(d.amount)}</td>
      <td>
        <div class="actions">
          <input id="l${i}" placeholder="số" oninput="formatInput(this)">
          <button class="btn plus" onclick="event.stopPropagation();change('loan',${i},document.getElementById('l${i}').value,'+')">+</button>
          <button class="btn minus" onclick="event.stopPropagation();change('loan',${i},document.getElementById('l${i}').value,'-')">-</button>
          <button class="btn delete" onclick="event.stopPropagation();del('loan',${i})">X</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  document.getElementById('total1').innerText =
    'Tổng bạn đang nợ: ' + format(totalDebt);

  document.getElementById('total2').innerText =
    'Tổng người khác nợ: ' + format(totalLoan);
}

function changeTheme(){
  let b = document.body;

  if(b.classList.contains('light')){
    b.className = 'dark';
    data.theme = 'dark';
  }else if(b.classList.contains('dark')){
    b.className = 'pink';
    data.theme = 'pink';
  }else{
    b.className = 'light';
    data.theme = 'light';
  }

  save();
}

// load theme
if(data.theme){
  document.body.className = data.theme;
}

render();