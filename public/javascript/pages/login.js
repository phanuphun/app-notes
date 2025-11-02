document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const payload = new URLSearchParams(fd);

        try {
            const res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: payload.toString(),
                credentials: 'include',
            });

            const result = await res.json();

            if (res.ok && result?.ok) {
                const { user, token } = result.data || {};
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));
                window.msg?.success('Login successful!');
                setTimeout(() => (window.location.href = result.redirectTo || '/'), 800);
            } else {
                window.msg?.error(result?.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            window.msg?.error('Network error');
        }
    });
});
