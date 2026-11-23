class User {
    constructor(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    printInfo() {
        console.log("========== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ==========");
        console.log(`Email: ${this.email}`);
        console.log(`Роль: ${this.role}`);
        console.log("Пароль: ****");
        console.log("=========================================");
    }
}

const loginForm = document.querySelector("#login-form");
const loginCard = document.querySelector(".login-card");
const successMessage = document.querySelector("#login-success");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!loginForm.reportValidity()) {
        return;
    }

    const formData = new FormData(loginForm);
    const user = new User(
        formData.get("email"),
        formData.get("password"),
        formData.get("role")
    );

    user.printInfo();
 
    if (loginForm.contains(document.activeElement)) {
        document.activeElement.blur();
    }

    // Запускаем CSS-анимацию: форма исчезает, затем появляется сообщение.
    loginForm.setAttribute("aria-hidden", "true");
    loginForm.querySelectorAll("input, select, button").forEach((field) => {
        field.disabled = true;
    });

    successMessage.hidden = false;
    loginCard.classList.add("login-card--success");

    // После завершения исчезновения убираем старые блоки из потока,
    // чтобы карточка уменьшилась до размеров сообщения об успехе.
    window.setTimeout(() => {
        loginCard.querySelector(".login-card__heading").hidden = true;
        loginForm.hidden = true;
    }, 500);
});