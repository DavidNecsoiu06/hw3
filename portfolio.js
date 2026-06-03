(function () {
  'use strict';

  const form      = document.getElementById('project-form');
  const tbody     = document.getElementById('projects-tbody');
  const descArea  = document.getElementById('proj-desc');
  const descCount = document.getElementById('desc-count');
  const statTotal = document.getElementById('stat-total');
  const statDone  = document.getElementById('stat-done');
  const statProg  = document.getElementById('stat-prog');

  /* ── Live char counter ── */
  descArea.addEventListener('input', function () {
    descCount.textContent = this.value.length + ' / 300';
  });

  /* ── Error helpers ── */
  function showError(inputEl, msgEl) {
    inputEl.classList.add('invalid');
    inputEl.setAttribute('aria-invalid', 'true');
    msgEl.classList.add('visible');
  }

  function clearError(inputEl, msgEl) {
    inputEl.classList.remove('invalid');
    inputEl.setAttribute('aria-invalid', 'false');
    msgEl.classList.remove('visible');
  }

  function isValidUrl(str) {
    if (!str) return true; // optional field
    try {
      const u = new URL(str);
      return u.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  /* ── Full form validation ── */
  function validateForm() {
    let valid = true;

    const fields = [
      { el: document.getElementById('proj-name'),   err: document.getElementById('err-name'),   check: function (v) { return v.trim().length >= 2; } },
      { el: document.getElementById('proj-status'), err: document.getElementById('err-status'), check: function (v) { return v !== ''; } },
      { el: document.getElementById('proj-desc'),   err: document.getElementById('err-desc'),   check: function (v) { return v.trim().length >= 10; } },
      { el: document.getElementById('proj-tech'),   err: document.getElementById('err-tech'),   check: function (v) { return v.trim().length >= 2; } },
      { el: document.getElementById('proj-date'),   err: document.getElementById('err-date'),   check: function (v) { return v !== ''; } },
      { el: document.getElementById('proj-url'),    err: document.getElementById('err-url'),    check: function (v) { return isValidUrl(v.trim()); } },
      { el: document.getElementById('proj-img'),    err: document.getElementById('err-img'),    check: function (v) { return isValidUrl(v.trim()); } },
    ];

    fields.forEach(function (f) {
      if (f.check(f.el.value)) {
        clearError(f.el, f.err);
      } else {
        showError(f.el, f.err);
        valid = false;
      }
    });

    return valid;
  }

  /* ── Inline validation on blur ── */
  ['proj-name', 'proj-status', 'proj-desc', 'proj-tech', 'proj-date', 'proj-url', 'proj-img'].forEach(function (id) {
    var el  = document.getElementById(id);
    var err = document.getElementById('err-' + id.replace('proj-', ''));
    if (!el || !err) return;

    el.addEventListener('blur', function () {
      var isUrl = (id === 'proj-url' || id === 'proj-img');
      var ok;

      if (isUrl) {
        ok = isValidUrl(this.value.trim());
      } else if (id === 'proj-status') {
        ok = this.value !== '';
      } else if (id === 'proj-desc') {
        ok = this.value.trim().length >= 10;
      } else {
        ok = this.value.trim().length >= 2;
      }

      if (ok) {
        clearError(el, err);
      } else {
        showError(el, err);
      }
    });
  });

  /* ── Submit ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      var first = form.querySelector('.invalid');
      if (first) first.focus();
      return;
    }

    addRow();
    form.reset();
    descCount.textContent = '0 / 300';
    updateStats();

    document.getElementById('table-heading').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ── Add table row ── */
  function addRow() {
    var name   = document.getElementById('proj-name').value.trim();
    var status = document.getElementById('proj-status').value;
    var desc   = document.getElementById('proj-desc').value.trim();
    var tech   = document.getElementById('proj-tech').value.trim();
    var date   = document.getElementById('proj-date').value;
    var url    = document.getElementById('proj-url').value.trim();
    var img    = document.getElementById('proj-img').value.trim();

    // Remove empty-state row if present
    var emptyRow = tbody.querySelector('.empty-row');
    if (emptyRow) emptyRow.remove();

    var tr = document.createElement('tr');
    tr.setAttribute('data-status', status);

    // Image cell
    var tdImg = document.createElement('td');
    if (img) {
      var imgEl = document.createElement('img');
      imgEl.src       = img;
      imgEl.alt       = name + ' thumbnail';
      imgEl.className = 'thumb';
      imgEl.width     = 56;
      imgEl.height    = 42;
      imgEl.loading   = 'lazy';
      imgEl.decoding  = 'async';
      imgEl.onerror   = function () {
        var ph = document.createElement('div');
        ph.className = 'thumb-placeholder';
        ph.textContent = 'No img';
        ph.setAttribute('aria-label', 'No image available');
        this.parentNode.replaceChild(ph, this);
      };
      tdImg.appendChild(imgEl);
    } else {
      var ph = document.createElement('div');
      ph.className = 'thumb-placeholder';
      ph.textContent = 'No img';
      ph.setAttribute('aria-label', 'No image available');
      tdImg.appendChild(ph);
    }

    // Name (row header)
    var thName = document.createElement('th');
    thName.scope       = 'row';
    thName.textContent = name;

    // Description
    var tdDesc = document.createElement('td');
    tdDesc.textContent = desc;

    // Technologies as badges
    var tdTech = document.createElement('td');
    tech.split(',').forEach(function (t) {
      var b = document.createElement('span');
      b.className   = 'badge';
      b.textContent = t.trim();
      tdTech.appendChild(b);
    });

    // Status
    var tdStatus = document.createElement('td');
    tdStatus.textContent = status;

    // Date
    var tdDate = document.createElement('td');
    tdDate.textContent = date;

    // URL
    var tdUrl = document.createElement('td');
    if (url) {
      var a = document.createElement('a');
      a.href      = url;
      a.textContent = 'View project';
      a.className = 'project-link';
      a.target    = '_blank';
      a.rel       = 'noopener noreferrer';
      a.setAttribute('aria-label', 'View project: ' + name + ' (opens in new tab)');
      tdUrl.appendChild(a);
    } else {
      tdUrl.textContent = '\u2014';
    }

    tr.appendChild(tdImg);
    tr.appendChild(thName);
    tr.appendChild(tdDesc);
    tr.appendChild(tdTech);
    tr.appendChild(tdStatus);
    tr.appendChild(tdDate);
    tr.appendChild(tdUrl);

    tbody.appendChild(tr);
  }

  /* ── Update stats ── */
  function updateStats() {
    var rows = Array.from(tbody.querySelectorAll('tr[data-status]'));
    statTotal.textContent = rows.length;
    statDone.textContent  = rows.filter(function (r) { return r.dataset.status === 'Completed'; }).length;
    statProg.textContent  = rows.filter(function (r) { return r.dataset.status === 'In progress'; }).length;
  }

  /* ── Reset ── */
  form.addEventListener('reset', function () {
    form.querySelectorAll('.error-msg').forEach(function (e) { e.classList.remove('visible'); });
    form.querySelectorAll('.invalid').forEach(function (e) {
      e.classList.remove('invalid');
      e.setAttribute('aria-invalid', 'false');
    });
    descCount.textContent = '0 / 300';
  });

})();
