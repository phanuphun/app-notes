document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fd = new FormData(registerForm);
        if (fd.get('password') !== fd.get('confirmPassword')) {
            window.msg?.error('Passwords do not match.');
            return;
        }

        const payload = new URLSearchParams(fd);
        try {
            const res = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: payload.toString(),
            });

            const result = await res.json();

            if (res.ok && result?.ok) {
                window.msg?.success('Registration successful! Please login.');
                setTimeout(() => (window.location.href = '/login'), 800);
            } else {
                window.msg?.error(result?.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            window.msg?.error('Network error');
        }
    });
});
