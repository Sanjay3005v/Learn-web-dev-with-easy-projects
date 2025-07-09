function generatePassword() {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    document.getElementById('password').value = password;
}

function copyPassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.select();
    passwordInput.setSelectionRange(0, 99999); 

    if (navigator.clipboard) {
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => alert("Password copied to Clipboard!"))
            .catch(() => alert("Failed to copy password."));
    } else {
        document.execCommand("copy");
        alert("Password copied to Clipboard!");
    }
}
