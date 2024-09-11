// Client/register.js

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const Curricculum = event.target.curriculum.value;



    // Validar el email
    if (!validateEmail(email)) {
        alert('Por favor ingrese un email válido');
        return;
    }

    // Validar la contraseña
    if (!validatePassword(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir letras mayúsculas y minúsculas, números y caracteres especiales');
        return;
    }

    // Validar el nombre de usuario
    if (!validateUsername(username)) {
        alert('El nombre de usuario debe tener al menos 6 caracteres y no contener caracteres especiales');
        return;
    }

    // Validar el curriculum
    if (!validateCurriculum(Curricculum)) {
        alert('Por favor, suba un curriculum');
        return;
    }

    // Validar que el nombre de usuario y el email no estén en uso
    const checkResponse = await fetch('/auth/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
    });
    const checkData = await checkResponse.json();
    if (checkData.exists) {
        alert('El nombre de usuario o el email ya están en uso');
        return;
    }
    
    

    // Validar que el curriculum sea válido
    const curriculumResponse = await fetch('/auth/curriculum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ curriculum }),
    });
    const curriculumData = await curriculumResponse.json();
    if (!curriculumData.valid) {
        alert('El curriculum subido no es válido');
        return;

        if (rol === 'employee') {
            const registerResponse = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, Curricculum }),
            });
            const mensaje = await registerResponse.text();
            alert(mensaje);
        } else {
            const registerResponse = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, Curricculum }),
            });
            const mensaje = await registerResponse.text();
            alert(mensaje);
        }

        // Enviar los datos al backend para registrar al usuario    
        const registerResponse = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, Curricculum }),
        });
        const mensaje = await registerResponse.text();
        alert(mensaje);
        // Enviar los datos al backend para registrar al usuario    
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, Curricculum }),
        });

        const message = await response.text();
        alert(message);
        window.location.href = '/index.html';
    }
});
