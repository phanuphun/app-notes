(function () {
    function openModal(id) {
        const dlg = document.getElementById(id);
        if (!dlg) return;
        if (typeof dlg.showModal === 'function') dlg.showModal();
        else dlg.setAttribute('open', '');
    }

    function closeModal(id) {
        const dlg = document.getElementById(id);
        if (!dlg) return;
        if (typeof dlg.close === 'function') dlg.close();
        dlg.removeAttribute('open');
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    }

    window.openModal = openModal;
    window.closeModal = closeModal;
})();
