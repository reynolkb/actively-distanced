// function to login that checks if the username is in the db, if so then show user message that duplicate username exists
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const takenUsername = document.querySelector('#taken');

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            takenUsername.classList.add('hide');
            document.location.replace('/login');
        } else {
            // get all users and compare username
            const getUsers = await fetch('/api/users').then(
                function (response) {
                    response.json().then(function (data) {
                        for (let i = 0; i < data.length; i++) {
                            if (username === data[i].username) {
                                takenUsername.classList.remove('hide');
                                return;
                            }
                        }
                    })
                });
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);