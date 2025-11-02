// ทำให้ใช้งานได้ทุกหน้า
window.msg = new Notyf();

// helper parse
window.safeParse = function (json, fallback = null) {
    try { return JSON.parse(json); } catch { return fallback; }
};

window.getStoredUser = function () {
    return window.safeParse(localStorage.getItem('user'));
};

window.getStoredToken = function () {
    const raw = localStorage.getItem('token');
    const parsed = window.safeParse(raw, raw);
    return parsed;
};

window.isLoggedIn = function () {
    const t = window.getStoredToken();
    if (!t) return false;
    if (typeof t === 'string') return t.length > 0;
    return !!(t.accessToken || t.token || t.id_token);
};
