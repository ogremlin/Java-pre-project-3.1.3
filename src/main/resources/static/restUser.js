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

function showNavbar() {
    fetch("http://localhost:8080/user/user")
        .then(response => response.json())
        .then(user => {
            document.getElementById("navbar_info").innerHTML = user.email + '  with roles:  ' + getRole(user.roles);
        });
}
getOneUsers();
showNavbar();