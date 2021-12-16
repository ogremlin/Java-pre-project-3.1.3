async function getOneUsers() {
    let response = await fetch('http://localhost:8080/user/user');
    let user = await response.json();
    let temp = '';
    temp += '<tr>'
    temp += '<td>' + user.id + '</td>'
    temp += '<td>' + user.username + '</td>'
    temp += '<td>******</td>'
    temp += '<td>' + user.email + '</td>'
    temp += '<td>' + user.roles + '</td>'
    temp += '</tr>';
    document.getElementById("user_tbody").innerHTML = temp;
}

function showNavbar() {
    fetch("http://localhost:8080/user/user")
        .then(response => response.json())
        .then(user => {
            document.getElementById("navbar_info").innerHTML = user.email + '  with roles:  ' + user.roles;
        });
}
getOneUsers();
showNavbar();