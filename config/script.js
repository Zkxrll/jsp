// =========================================
//  ZKX CONFIGS — Supabase версия
// =========================================

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://jlgyqvxiyxcdbfpnzhuf.supabase.co";
const SUPABASE_KEY = "sb_publishable_0gH9qQ3woMTH0MmOb5DTmQ_2tATb3FO";

const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// =========================================
//  КУРСОР-ПРОЖЕКТОР
// =========================================
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 820) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

// =========================================
//  АНОНИМНАЯ АВТОРИЗАЦИЯ
// =========================================
async function initAuth() {
  const { data: { session } } = await db.auth.getSession();
  if (!session) {
    const { data, error } = await db.auth.signInAnonymously();
    if (error) {
      console.error("Auth error:", error);
      return null;
    }
    return data.user;
  }
  return session.user;
}

// =========================================
//  ЗАГРУЗКА КОНФИГА В SUPABASE
// =========================================
async function uploadConfig(file) {
  const { data: { user } } = await db.auth.getUser();
  if (!user) {
    alert("Auth error. Please refresh.");
    return null;
  }

  const id = crypto.randomUUID();
  const path = `${user.id}/${id}.txt`;

  const { error: uploadError } = await db.storage
    .from('configs')
    .upload(path, file, { contentType: 'text/plain' });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    alert("Upload failed: " + uploadError.message);
    return null;
  }

  const { data, error: dbError } = await db
    .from('configs')
    .insert({
      user_id: user.id,
      name: file.name,
      storage_path: path,
      size: file.size,
    })
    .select()
    .single();

  if (dbError) {
    console.error("DB error:", dbError);
    alert("DB error: " + dbError.message);
    return null;
  }

  return data;
}

// =========================================
//  ЗАГРУЗКА СПИСКА КОНФИГОВ
// =========================================
async function loadConfigs() {
  const { data, error } = await db
    .from('configs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error("Load error:", error);
    return [];
  }
  return data || [];
}

// =========================================
//  СКАЧИВАНИЕ КОНФИГА
// =========================================
async function downloadConfig(config) {
  const { data } = db.storage
    .from('configs')
    .getPublicUrl(config.storage_path);

  const url = data.publicUrl + '?download=' + encodeURIComponent(config.name);

  const a = document.createElement('a');
  a.href = url;
  a.download = config.name;
  a.click();

  await db
    .from('configs')
    .update({ downloads: (config.downloads || 0) + 1 })
    .eq('id', config.id);
}

// =========================================
//  РЕНДЕР СПИСКА
// =========================================
async function renderConfigs() {
  const grid = document.getElementById('configsGrid');
  if (!grid) return;

  grid.innerHTML = `<div class="config-empty"><p>Loading...</p></div>`;

  const configs = await loadConfigs();

  if (configs.length === 0) {
    grid.innerHTML = `<div class="config-empty"><p>No configs yet. Be the first to upload one!</p></div>`;
    updateStats(0, 0);
    return;
  }

  grid.innerHTML = configs.map(cfg => `
    <div class="config-card" data-id="${cfg.id}">
      <div class="config-name">${escapeHtml(cfg.name)}</div>
      <div class="config-meta">
        <span>📅 ${formatDate(cfg.created_at)}</span>
        <span>💾 ${formatSize(cfg.size)}</span>
      </div>
      <div class="config-footer">
        <span class="muted">⬇ ${cfg.downloads || 0} downloads</span>
        <a href="#" class="config-download" data-download="${cfg.id}">Download</a>
      </div>
    </div>
  `).join('');

  updateStats(configs.length, configs.reduce((s, c) => s + (c.downloads || 0), 0));

  grid.querySelectorAll('[data-download]').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const cfg = configs.find(c => c.id === el.dataset.download);
      if (cfg) {
        await downloadConfig(cfg);
        renderConfigs();
      }
    });
  });
}

// =========================================
//  UPLOAD UI
// =========================================
function initUpload() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const chooseBtn = document.getElementById('chooseFileBtn');
  const uploadResult = document.getElementById('uploadResult');
  const shareLink = document.getElementById('shareLink');
  const copyBtn = document.getElementById('copyLinkBtn');

  if (!dropzone) return;

  dropzone.addEventListener('click', (e) => {
    if (e.target === chooseBtn || e.target.closest('button')) return;
    fileInput.click();
  });
  chooseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  ['dragenter', 'dragover'].forEach(ev => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(ev => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });
  dropzone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });

  async function handleFile(file) {
    if (!file.name.endsWith('.txt')) {
      alert('Only .txt files are allowed.');
      return;
    }
    if (file.size > 1024 * 1024) {
      alert('File too large. Max 1 MB.');
      return;
    }

    chooseBtn.textContent = 'Uploading...';
    chooseBtn.disabled = true;

    const result = await uploadConfig(file);

    chooseBtn.textContent = 'Choose file';
    chooseBtn.disabled = false;

    if (!result) return;

    const link = `${window.location.origin}/c/${result.id}`;
    shareLink.value = link;
    uploadResult.hidden = false;
    uploadResult.scrollIntoView({ behavior: 'smooth', block: 'center' });

    renderConfigs();
    fileInput.value = '';
  }

  copyBtn.addEventListener('click', () => {
    shareLink.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 1500);
  });
}

// =========================================
//  УТИЛИТЫ
// =========================================
function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}
function updateStats(count, downloads) {
  const c = document.getElementById('statConfigs');
  const d = document.getElementById('statDownloads');
  if (c) c.textContent = count;
  if (d) d.textContent = downloads;
}

// =========================================
//  ИНИЦИАЛИЗАЦИЯ
// =========================================
document.addEventListener('DOMContentLoaded', async () => {
  initCursorGlow();
  await initAuth();
  initUpload();
  await renderConfigs();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});