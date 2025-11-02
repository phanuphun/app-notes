document.addEventListener('DOMContentLoaded', () => {
    const addNoteForm = document.getElementById('add-note-form');
    if (addNoteForm) {
        addNoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userDataRaw = localStorage.getItem('user');
            if (!userDataRaw) {
                window.msg?.error('User not logged in.');
                return;
            }
            const userData = JSON.parse(userDataRaw);
            const userId = userData._id;

            const formData = new FormData(addNoteForm);
            let data = Object.fromEntries(formData.entries());
            data.userId = userId;

            try {
                const response = await fetch('/api/v1/notes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    credentials: 'include', // ถ้า API ฝั่งโน้ตใช้คุกกี้ auth ด้วย ให้ใส่ไว้เลย
                });

                if (response.ok) {
                    window.msg?.success('Note added successfully!');
                    window.closeModal('add_note_modal');
                    setTimeout(() => window.location.reload(), 800);
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    window.msg?.error(errorData.message || 'Failed to add note.');
                }
            } catch (error) {
                console.error(error);
                window.msg?.error('Network error');
            }
        });
    }

    // ปุ่ม Edit note (ใช้ data-* จากปุ่ม)
    window.openEditModal = function (btn) {
        const id = btn.dataset.noteId;
        const title = btn.dataset.title || '';
        const content = btn.dataset.content || '';
        const bgColor = btn.dataset.bgcolor || '#ffffff';

        const form = document.getElementById('update-note-form');
        form.action = `/notes/${id}?_method=PUT`;

        document.getElementById('update-title').value = title;
        document.getElementById('update-content').value = content;
        document.getElementById('update-bgColor').value = bgColor;

        window.openModal('update_note_modal');
    };
});
