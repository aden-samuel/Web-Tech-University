// Client-side validation for registration, sign-up and sign-in forms.
(function () {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    function showFieldResult(field, message, valid) {
        const error = document.getElementById(field.id + "Error");
        field.classList.toggle("valid", valid);
        field.classList.toggle("invalid", !valid);
        field.dataset.valid = valid ? "true" : "false";
        if (error) error.textContent = valid ? "" : message;
        return valid;
    }

    // FR-02: detailed registration validation.
    const registerForm = document.getElementById("registrationForm");
    if (registerForm) {
        const ids = ["fullName", "empId", "email", "mobile", "dept", "password", "confirmPassword"];
        const submitButton = document.getElementById("registerSubmit");

        function validateRegisterField(id) {
            const field = document.getElementById(id);
            const value = field.value.trim();
            let valid = false;
            let message = "Please complete this field.";

            if (id === "fullName") {
                valid = /^[a-zA-Z\s]{2,50}$/.test(value);
                message = "Use 2–50 letters and spaces only.";
            } else if (id === "empId") {
                valid = /^[A-Z0-9]{6,12}$/i.test(value);
                message = "Use 6–12 letters or numbers.";
            } else if (id === "email") {
                valid = emailPattern.test(value);
                message = "Enter a valid email address.";
            } else if (id === "mobile") {
                valid = /^[6-9]\d{9}$/.test(value);
                message = "Enter a 10-digit mobile number starting with 6–9.";
            } else if (id === "dept") {
                valid = value !== "";
                message = "Select your division.";
            } else if (id === "password") {
                valid = passwordPattern.test(value);
                message = "Use 8+ characters with uppercase, lowercase, a number and a symbol (@$!%*?&).";
            } else if (id === "confirmPassword") {
                valid = value !== "" && value === document.getElementById("password").value;
                message = "Passwords do not match.";
            }

            return showFieldResult(field, message, valid);
        }

        function updateRegisterButton() {
            const allValid = ids.every(function (id) {
                return document.getElementById(id).dataset.valid === "true";
            });
            submitButton.disabled = !allValid;
        }

        ids.forEach(function (id) {
            const field = document.getElementById(id);
            field.addEventListener("blur", function () {
                validateRegisterField(id);
                updateRegisterButton();
            });
            field.addEventListener("input", function () {
                if (field.dataset.touched === "true") validateRegisterField(id);
                field.dataset.touched = "true";
                if (id === "password" && document.getElementById("confirmPassword").value) {
                    validateRegisterField("confirmPassword");
                }
                updateRegisterButton();
            });
            if (id === "dept") {
                field.addEventListener("change", function () {
                    validateRegisterField(id);
                    updateRegisterButton();
                });
            }
        });

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            ids.forEach(validateRegisterField);
            updateRegisterButton();

            if (!submitButton.disabled) {
                document.getElementById("registerMessage").textContent =
                    "All registration fields are valid. This front-end demonstration does not send or save your personal details.";
            }
        });
    }

    // FR-03: simplified sign-up form and mandatory Terms of Service consent.
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("signupEmail");
            const password = document.getElementById("signupPassword");
            const terms = document.getElementById("termsConsent");
            const message = document.getElementById("signupMessage");
            const emailValid = emailPattern.test(email.value.trim());
            const passwordValid = passwordPattern.test(password.value);

            showFieldResult(email, "Enter a valid email address.", emailValid);
            showFieldResult(password, "Use 8+ characters with uppercase, lowercase, a number and a symbol.", passwordValid);

            if (!terms.checked) {
                message.textContent = "Please accept the Terms of Service to continue.";
                message.className = "form-alert alert-message";
            } else if (!emailValid || !passwordValid) {
                message.textContent = "Please correct the highlighted fields.";
                message.className = "form-alert alert-message";
            } else {
                message.textContent = "The sign-up form is valid. Actual account creation requires a secure server-side authentication service.";
                message.className = "form-alert success-message";
            }
        });
    }

    // FR-04: sign-in format checks and password visibility toggle.
    const signinForm = document.getElementById("signinForm");
    if (signinForm) {
        const password = document.getElementById("signinPassword");
        const toggle = document.getElementById("showPassword");
        const alertBox = document.getElementById("signinAlert");

        toggle.addEventListener("click", function () {
            const visible = password.type === "text";
            password.type = visible ? "password" : "text";
            toggle.textContent = visible ? "Show" : "Hide";
        });

        signinForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("signinEmail").value.trim();
            const pass = password.value;

            if (!emailPattern.test(email) || pass.length < 8) {
                alertBox.hidden = false;
                alertBox.textContent = "Invalid credential format. Enter a valid email and a password with at least 8 characters.";
                alertBox.className = "form-alert alert-message";
            } else {
                alertBox.hidden = false;
                alertBox.textContent = "The input format is valid. This static demo does not verify accounts; use the Dashboard link to explore the application.";
                alertBox.className = "form-alert success-message";
            }
        });
    }
})();
