document.addEventListener('DOMContentLoaded', () => {
    const guest = document.getElementById('auth-guest');
    const user = document.getElementById('auth-user');
    const logoutBtn = document.getElementById('btn-logout');
    const userMntBtn = document.getElementById('user-mnt');
    const roomMntBtn = document.getElementById('room-mnt');
    const accountBtn = document.getElementById('btn-account');

    const loggedIn = window.isLoggedIn();
    if (loggedIn) {
        guest?.classList.add('hidden');
        user?.classList.remove('hidden');

        const u = window.getStoredUser();
        if (u && u.role === 'admin') {
            userMntBtn?.classList.remove('hidden');
            roomMntBtn?.classList.remove('hidden');
        } else {
            userMntBtn?.classList.add('hidden');
            roomMntBtn?.classList.add('hidden');
        }
    } else {
        guest?.classList.remove('hidden');
        user?.classList.add('hidden');
    }

    guest?.classList.remove('invisible');
    user?.classList.remove('invisible');

    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.msg?.success('Logged out');
        setTimeout(() => (window.location.href = '/login'), 800);
    });
});
