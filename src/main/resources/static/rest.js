function getRole(roles) {
    let result = ''
    let str_json = JSON.stringify(roles)
    if (str_json.indexOf('ROLE_ADMIN') !== -1) {
        result += 'ADMIN  '
    }
    if (str_json.indexOf('ROLE_USER') !== -1) {
        result += 'USER  '
    }
    if (str_json.indexOf('ROLE_ANY') !== -1) {
        result += 'ANY  '
    }
    return result
}

function showNavbar() {
    fetch("http://localhost:8080/user/user")
        .then(response => response.json())
        .then(user => {
            document.getElementById("navbar_info").innerHTML = user.email + '  with roles:  ' + getRole(user.roles);
        });
}
// Заполняем НАВБАР


async function getAllUsers() {
    await new Promise(resolve => setTimeout(resolve, 200));
    await fetch("http://localhost:8080/admin/users").then(
        res => {
            res.json().then(
                data => {
                    // setTimeout(getAllUsers, 100);
                    if (data.length > 0) {
                        let temp = '';
                        data.forEach((user) => {
                            temp += '<tr>'
                            temp += '<td>' + user.id + '</td>'
                            temp += '<td>' + user.username + '</td>'
                            temp += '<td>******</td>'
                            temp += '<td>' + user.email + '</td>'
                            temp += '<td>' + getRole(user.roles) + '</td>'
                            temp += '<td> <button role=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#editModal\" data-btn=\"edit\" data-id=' + user.id + '>Edit</button> </td>'
                            temp += '<td> <button role=\"button\" class=\"btn btn-danger btn-sm\" data-toggle=\"modal\" data-target=\"#deleteModal\" data-btn=\"delete\" data-id=' + user.id + '>Delete</button> </td>'
                            temp += '</tr>';
                        })
                        document.getElementById("all_users_tbody").innerHTML = temp;
                    }
                }
            )
        }
    )
}

async function getOneUsers() {
    let response = await fetch('http://localhost:8080/user/user');
    let user = await response.json();
    let temp = '';
    temp += '<tr>'
    temp += '<td>' + user.id + '</td>'
    temp += '<td>' + user.username + '</td>'
    temp += '<td>******</td>'
    temp += '<td>' + user.email + '</td>'
    temp += '<td>' + getRole(user.roles) + '</td>'
    temp += '</tr>';
    document.getElementById("user_tbody").innerHTML = temp;
}
document.addEventListener('click', event => {
    const btnType = event.target.dataset.btn;
// Обрабатываем конпу EDIT
    if (btnType === 'edit') {
        const id = event.target.dataset.id;
        fetch("http://localhost:8080/admin/users/" + id)
            .then(response => response.json())
            .then(data => {
                document.querySelector("#idEdit").value = data.id;
                document.querySelector("#nameEdit").value = data.username;
                document.querySelector("#passwordEdit").value = data.password;
                document.querySelector("#emailEdit").value = data.email;
                // document.querySelector("#nameEdite").value = data.username;
            });
    }
    // Обрабатываем конпу EDIT в модальном окне EDIT
    if (btnType === 'submitEdit') {
        let roles = (document.getElementById("editRoles")).value;
        let url = 'http://localhost:8080/admin/users';
        //Работа с ролями
        let myRoleEdit = document.getElementById("editRoles");
        let rolesEdit = [];

        function roleEdit(id, name) {
            this.id = id;
            this.name = name;
        }

        for (let i = 0; i < myRoleEdit.length; i++) {
            let option = myRoleEdit.options[i];
            if (option.selected) {
                rolesEdit.push(new roleEdit(option.value, option.text));
            }
        }
        //Работа с ролями
        let user = {
            id: document.querySelector("#idEdit").value,
            username: document.querySelector("#nameEdit").value,
            password: document.querySelector("#passwordEdit").value,
            email: document.querySelector("#emailEdit").value,
            roles: rolesEdit
        }
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).finally(() => {
            getAllUsers();
            let modal = document.getElementById('editModal');
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        });
    }
    // Обрабатываем конпу DELETE
    if (btnType === 'delete') {
        const id = event.target.dataset.id;
        const url = 'http://localhost:8080/admin/users/' + id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector("#idDelete").value = data.id;
                document.querySelector("#nameDelete").value = data.username;
                document.querySelector("#emailDelete").value = data.email;
            });
    }
// Кнопка DELETE в окне DELETE
    if (btnType === 'submitDelete') {
        let id = document.querySelector("#idDelete").value;
        let url = 'http://localhost:8080/admin/users/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).finally(() => {
            getAllUsers();
            let modal = document.getElementById('deleteModal');
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        });

    }
    // Кнопка Add New User в вкладке New User
    if (btnType === 'submitAddNewUser') {
        //Определяем выделенные роли в список
        let mySelect = document.getElementById("newRoles");
        let roles = [];

        function role(id, name) {
            this.id = id;
            this.name = name;
        }

        for (let i = 0; i < mySelect.length; i++) {
            let option = mySelect.options[i];
            if (option.selected) {
                roles.push(new role(option.value, option.text));
            }
        }
        let url = 'http://localhost:8080/admin/users';
        let user = {
            username: document.querySelector("#nameNew").value,
            password: document.querySelector("#passwordNew").value,
            email: document.querySelector("#emailNew").value,
            roles: roles
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).finally(() => {
            getAllUsers();
        });
    }


})
showNavbar();
getAllUsers();
getOneUsers();