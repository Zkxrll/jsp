import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://bcynlipojyfdtfgifdws.supabase.co";
const SUPABASE_KEY = "sb_publishable_2WVB7_9PPmJkCQ9vloRu8w_mTt20Le3";
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

const MAX_FILE_SIZE = 1024 * 1024;
let currentUser = null;
let profile = null;

function $(id) { return document.getElementById(id); }

function initCursorGlow() {
  const glow = $("cursorGlow");
  if (!glow || window.innerWidth < 820) return;
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let gx = x, gy = y;
  document.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
  function animate() {
    gx += (x - gx) * 0.08;
    gy += (y - gy) * 0.08;
    glow.style.left = gx + "px";
    glow.style.top = gy + "px";
    requestAnimationFrame(animate);
  }
  animate();
}

function setMessage(message, type = "info") {
  const el = $("statusMessage");
  if (!el) return;
  el.textContent = message;
  el.dataset.type = type;
  el.hidden = !message;
}

function setBusy(button, busy, label) {
  if (!button) return;
  if (busy) {
    button.dataset.oldLabel = button.textContent;
    button.textContent = label;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.oldLabel || label;
    button.disabled = false;
  }
}

async function loadProfile() {
  if (!currentUser) { profile = null; return; }
  const { data, error } = await db.from("profiles")
    .select("discord_id, jnkie_user_id, jnkie_verified_at, is_premium")
    .eq("id", currentUser.id)
    .maybeSingle();
  if (error) console.error("Profile lookup failed:", error);
  profile = data || null;
}

async function signInWithDiscord() {
  const { error } = await db.auth.signInWithOAuth({
    provider: "discord",
    options: { redirectTo: window.location.href.split("#")[0] }
  });
  if (error) setMessage("Discord sign-in failed: " + error.message, "error");
}

async function signOut() {
  const { error } = await db.auth.signOut();
  if (error) setMessage("Could not sign out. Please try again.", "error");
  else window.location.reload();
}

async function linkJnkieKey(key) {
  const { data, error } = await db.functions.invoke("link-jnkie-key", { body: { key } });
  if (error) {
    let details = null;
    try {
      const response = error.context;
      if (response && typeof response.clone === "function") details = await response.clone().json();
    } catch (_) {}
    if (details?.code === "PREMIUM_REQUIRED") {
      throw new Error("This feature is only available to users with an active Jnkie Premium key. Upgrade to Premium, then try again.");
    }
    throw new Error(details?.error || error.message || "Could not verify the key.");
  }
  if (data?.error) throw new Error(data.error);
  await loadProfile();
  if (!profile?.jnkie_verified_at) throw new Error("The key was checked, but the link was not saved.");
}

function updateAuthUI() {
  const signedIn = Boolean(currentUser);
  const linked = Boolean(profile?.jnkie_verified_at && profile?.discord_id && profile?.is_premium === true);
  $("signInBtn").hidden = signedIn;
  $("signOutBtn").hidden = !signedIn;
  $("accountPanel").hidden = !signedIn;
  $("linkKeyPanel").hidden = !signedIn || linked;
  $("upload").hidden = !linked;
  $("uploadPanel").hidden = !linked;
  $("myConfigs").hidden = !linked;
  $("configsPanel").hidden = !linked;
  $("signedInAs").textContent = currentUser?.user_metadata?.full_name
    || currentUser?.user_metadata?.name
    || currentUser?.email
    || "Discord account connected";
  $("linkedStatus").textContent = linked ? "Premium access active" : "Premium key required";
  $("linkedStatus").classList.toggle("status-ok", linked);
  $("linkedStatus").classList.toggle("status-pending", !linked);
  if (!signedIn) {
    $("authIntro").textContent = "This area is exclusive to users with an active Jnkie Premium key. Sign in with Discord to check your access.";
  } else if (!linked) {
    $("authIntro").textContent = "Config storage is only available with an active Jnkie Premium key linked to this Discord account. Non-Premium keys cannot unlock access.";
  } else {
    $("authIntro").textContent = "Premium access is active. Your configs are private and only visible to you.";
  }
}

async function uploadConfig(file) {
  if (!currentUser || !profile?.jnkie_verified_at) throw new Error("Sign in with Discord and link your Jnkie key first.");
  if (!(file instanceof File) || !file.name.toLowerCase().endsWith(".txt")) throw new Error("Only .txt files are allowed.");
  if (file.size > MAX_FILE_SIZE) throw new Error("File too large. Maximum size is 1 MB.");
  if (file.size === 0) throw new Error("The file is empty.");

  const safeName = file.name.replace(/[\\/]/g, "_").slice(0, 180);
  const path = `${currentUser.id}/${crypto.randomUUID()}.txt`;
  const { error: uploadError } = await db.storage.from("configs").upload(path, file, {
    contentType: "text/plain",
    upsert: false
  });
  if (uploadError) throw new Error("Upload failed: " + uploadError.message);

  const { data, error } = await db.from("configs").insert({
    user_id: currentUser.id,
    name: safeName,
    storage_path: path,
    size: file.size
  }).select("id, name, storage_path, size, downloads, created_at").single();

  if (error) {
    await db.storage.from("configs").remove([path]);
    throw new Error("Could not save config details: " + error.message);
  }
  return data;
}

async function loadConfigs() {
  if (!currentUser || !profile?.jnkie_verified_at) return [];
  const { data, error } = await db.from("configs")
    .select("id, name, storage_path, size, downloads, created_at")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error("Could not load your configs: " + error.message);
  return data || [];
}

async function downloadConfig(config) {
  const { data, error } = await db.storage.from("configs").createSignedUrl(config.storage_path, 60, {
    download: config.name
  });
  if (error || !data?.signedUrl) throw new Error("Could not create a private download link.");
  const a = document.createElement("a");
  a.href = data.signedUrl;
  a.download = config.name;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();

  const { error: countError } = await db.from("configs")
    .update({ downloads: (config.downloads || 0) + 1 })
    .eq("id", config.id)
    .eq("user_id", currentUser.id);
  if (countError) console.warn("Could not update download count:", countError.message);
}

function renderConfigs(configs) {
  const grid = $("configsGrid");
  if (!grid) return;
  if (!configs.length) {
    grid.innerHTML = '<div class="config-empty"><p>No personal configs yet. Upload your first .txt file above.</p></div>';
    updateStats(0, 0);
    return;
  }
  grid.innerHTML = configs.map(cfg => `
    <article class="config-card">
      <div class="config-name">${escapeHtml(cfg.name)}</div>
      <div class="config-meta">
        <span>📅 ${formatDate(cfg.created_at)}</span>
        <span>💾 ${formatSize(cfg.size)}</span>
      </div>
      <div class="config-footer">
        <span class="muted">⬇ ${Number(cfg.downloads) || 0} downloads</span>
        <button type="button" class="config-download" data-download="${escapeHtml(cfg.id)}">Download</button>
      </div>
    </article>
  `).join("");
  updateStats(configs.length, configs.reduce((sum, cfg) => sum + (Number(cfg.downloads) || 0), 0));
  grid.querySelectorAll("[data-download]").forEach(button => {
    button.addEventListener("click", async () => {
      const cfg = configs.find(item => item.id === button.dataset.download);
      if (!cfg) return;
      button.disabled = true;
      try {
        await downloadConfig(cfg);
        setMessage("Download started.", "success");
        const updated = await loadConfigs();
        renderConfigs(updated);
      } catch (error) {
        setMessage(error.message || "Download failed.", "error");
      } finally {
        button.disabled = false;
      }
    });
  });
}

async function refreshConfigs() {
  const grid = $("configsGrid");
  if (grid) grid.innerHTML = '<div class="config-empty"><p>Loading your configs…</p></div>';
  try {
    renderConfigs(await loadConfigs());
  } catch (error) {
    if (grid) grid.innerHTML = '<div class="config-empty"><p>Your configs could not be loaded. Refresh the page and try again.</p></div>';
    setMessage(error.message, "error");
  }
}

function initUpload() {
  const dropzone = $("dropzone");
  const fileInput = $("fileInput");
  const chooseBtn = $("chooseFileBtn");
  if (!dropzone || !fileInput || !chooseBtn) return;

  const processFile = async file => {
    if (!file) return;
    setMessage("");
    setBusy(chooseBtn, true, "Uploading…");
    try {
      await uploadConfig(file);
      setMessage("Config uploaded successfully.", "success");
      fileInput.value = "";
      await refreshConfigs();
    } catch (error) {
      setMessage(error.message || "Upload failed.", "error");
    } finally {
      setBusy(chooseBtn, false, "Choose file");
    }
  };

  dropzone.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    fileInput.click();
  });
  chooseBtn.addEventListener("click", event => {
    event.stopPropagation();
    fileInput.click();
  });
  fileInput.addEventListener("change", () => processFile(fileInput.files?.[0]));
  ["dragenter", "dragover"].forEach(name => dropzone.addEventListener(name, event => {
    event.preventDefault();
    dropzone.classList.add("dragover");
  }));
  ["dragleave", "drop"].forEach(name => dropzone.addEventListener(name, event => {
    event.preventDefault();
    dropzone.classList.remove("dragover");
  }));
  dropzone.addEventListener("drop", event => processFile(event.dataTransfer?.files?.[0]));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}
function updateStats(count, downloads) {
  if ($("statConfigs")) $("statConfigs").textContent = String(count);
  if ($("statDownloads")) $("statDownloads").textContent = String(downloads);
}

document.addEventListener("DOMContentLoaded", async () => {
  initCursorGlow();
  initUpload();
  $("signInBtn").addEventListener("click", signInWithDiscord);
  $("signOutBtn").addEventListener("click", signOut);
  $("linkKeyForm").addEventListener("submit", async event => {
    event.preventDefault();
    const button = $("linkKeyBtn");
    const key = $("jnkieKey").value.trim();
    if (!key) return;
    setMessage("");
    setBusy(button, true, "Verifying…");
    try {
      await linkJnkieKey(key);
      $("jnkieKey").value = "";
      setMessage("Discord and Jnkie key linked successfully.", "success");
      updateAuthUI();
      await refreshConfigs();
    } catch (error) {
      setMessage(error.message || "Could not link that key.", "error");
    } finally {
      setBusy(button, false, "Link key");
    }
  });

  const { data: { session }, error } = await db.auth.getSession();
  if (error) console.error("Session lookup failed:", error);
  currentUser = session?.user || null;
  if (currentUser) await loadProfile();
  updateAuthUI();

  const { data: authListener } = db.auth.onAuthStateChange((_event, sessionNow) => {
    currentUser = sessionNow?.user || null;
    setTimeout(async () => {
      if (currentUser) await loadProfile();
      else profile = null;
      updateAuthUI();
      await refreshConfigs();
    }, 0);
  });

  if (currentUser && profile?.jnkie_verified_at) await refreshConfigs();
  else if ($("configsGrid")) $("configsGrid").innerHTML = '<div class="config-empty"><p>Sign in and link your Jnkie key to see your private configs.</p></div>';
  if ($("year")) $("year").textContent = String(new Date().getFullYear());
});