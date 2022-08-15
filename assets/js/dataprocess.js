// Read data from Database

async function loadUsers()
{
    // fetch user data from database
    const userData = fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(json => fillTable(json));
    
}

function fillTable(userData){
    // put data into table body
    var payload="";
    var table= document.getElementById("tableBody");

    userData.forEach((element, i) => {
        console.log(element);
        payload += "<tr>";
        payload += "<td>" + (i+1).toString() + "</td>"
        payload += "<td>" + element.name + "</td>";
        payload += "<td>" + element.email + "</td>";
        payload += "<td>" + element.gender + "</td>";
        payload += "<td>" + element.status + "</td>";
        payload += `<td>
        <a href="/update-user" class="btn border-shadow update">
            <span class="text-gradient">
                <i class="fas fa-pencil-alt"></i>
            </span>
        </a>
        <a href="#" class="btn border-shadow delete">
            <span class="text-gradient">
                <i class="fas fa-times"></i>
            </span>
        </a>
        </td>`;
        payload += "</tr>";
    });
    table.innerHTML = payload;
}