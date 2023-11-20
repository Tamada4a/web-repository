function openForm(event) {
    let form;
    if (event.target) {
        form = event.target.type === "edit" ? 'editForm' : 'createForm';
    } else {
        form = event;
    }
    document.getElementById(form).style.display = "flex";
}

function closeForm(event) {
    let form;
    if (event.target) {
        form = event.target.type === "edit" ? 'editForm' : 'createForm';
    } else {
        form = event;
    }
    document.getElementById(form).style.display = "none";
}