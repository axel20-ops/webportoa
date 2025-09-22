(function(){
  const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

  function setBranding(){
    document.title = SITE.brand.name;
    const brandName = document.getElementById('brandName');
    const brandMark = document.getElementById('brandMark');
    const heroTitle = document.getElementById('heroTitle');
    const heroTagline = document.getElementById('heroTagline');
    const ctaBtn = document.getElementById('ctaBtn');
    const year = document.getElementById('year');

    brandName.textContent = SITE.brand.name;
    brandMark.textContent = SITE.brand.short || SITE.brand.name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
    heroTitle.textContent = SITE.brand.name;
    heroTagline.textContent = SITE.brand.tagline;
    ctaBtn.href = SITE.brand.ctaLink || SITE.socials.whatsapp;
    year.textContent = new Date().getFullYear();
    document.getElementById('copyright').querySelector('#year')?.textContent;
  }

  function renderTable(filter = { q: '', status: 'all' }){
    const body = document.getElementById('priceBody');
    body.innerHTML = '';
    const q = filter.q.toLowerCase();
    const items = SITE.products.filter(p => {
      const matchQ = !q || p.country.toLowerCase().includes(q) || p.number.toLowerCase().includes(q);
      const matchS = filter.status === 'all' ? true : p.status === filter.status;
      return matchQ && matchS;
    });

    for(const p of items){
      const tr = document.createElement('tr');
      const tdNum = document.createElement('td'); tdNum.textContent = p.number;
      const tdCountry = document.createElement('td'); tdCountry.textContent = p.country;
      const tdPrice = document.createElement('td'); tdPrice.textContent = rupiah(p.price);
      const tdStatus = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = `status-pill ${p.status}`;
      pill.innerHTML = `<span class="dot"></span> ${p.status === 'available' ? 'Tersedia' : 'Habis'}`;
      tdStatus.appendChild(pill);

      tr.append(tdNum, tdCountry, tdPrice, tdStatus);
      body.appendChild(tr);
    }

    const lu = document.getElementById('lastUpdated');
    const d = new Date(SITE.lastUpdated);
    lu.textContent = `Diperbarui: ${d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}`;
  }

  function renderStatus(){
    // Kelompokkan per negara kode (ringkas)
    const grid = document.getElementById('statusGrid');
    grid.innerHTML = '';
    const byCountry = {};
    for(const p of SITE.products){
      byCountry[p.country] = byCountry[p.country] || { available:0, soldout:0 };
      byCountry[p.country][p.status]++;
    }
    Object.entries(byCountry).forEach(([country, stat]) => {
      const el = document.createElement('div');
      el.className = 'stat';
      const total = stat.available + stat.soldout;
      el.innerHTML = `<strong>${country}</strong>
        <span title="Tersedia / Total">
          <span class="badge ${stat.available>0?'available':'soldout'}"></span>
          ${stat.available} / ${total}
        </span>`;
      grid.appendChild(el);
    });
  }

  function wireFilters(){
    const search = document.getElementById('searchInput');
    const filter = document.getElementById('statusFilter');
    const state = { q: '', status: 'all' };
    const update = () => renderTable(state);

    search.addEventListener('input', e => { state.q = e.target.value; update(); });
    filter.addEventListener('change', e => { state.status = e.target.value; update(); });
  }

  function setContacts(){
    const wa = document.getElementById('waBtn');
    const ig = document.getElementById('igBtn');
    wa.href = SITE.socials.whatsapp;
    ig.href = SITE.socials.instagram;
  }

  function realtimeTick(){
    // Simulasi ping status: bila semua habis, ubah dot jadi merah (demo).
    const dot = document.querySelector('.rt-indicator .dot');
    const txt = document.getElementById('rtText');
    const hasAvail = SITE.products.some(p => p.status === 'available');
    dot.style.background = hasAvail ? 'var(--ok)' : 'var(--bad)';
    dot.style.boxShadow = `0 0 12px ${getComputedStyle(dot).backgroundColor}`;
    txt.textContent = hasAvail ? 'Realtime Status Aktif' : 'Stok Habis — Cek Lagi Nanti';
  }

  document.addEventListener('DOMContentLoaded', () => {
    setBranding();
    setContacts();
    wireFilters();
    renderTable();
    renderStatus();
    realtimeTick();
    setInterval(realtimeTick, 5000);
  });
})();