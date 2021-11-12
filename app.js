//Create a new user 
function createNewUser() {
    let name = document.getElementById("inputName").value
    let email = document.getElementById("inputEmail").value
    let address = document.getElementById("inputAddress").value

    axios.post('https://server-crudapp-mongodb.herokuapp.com/user', {
        name: name,
        email: email,
        address: address
    }).then(function (response) {
            console.log(response);

            document.getElementById("inputName").value = ""
            getAllUser()
            document.getElementById("alert").innerHTML =
                `<div class="alert alert-success" role="alert">
                   Well done! ${name} is created!
                </div>`
            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);
        })

    
        document.getElementById("inputName").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputAddress").value = "";
}


// Displaying All Users on the table
function getAllUsers() {

    axios.get('https://server-crudapp-mongodb.herokuapp.com/users')
        .then(function (response) {
            console.log(response);

            let users = response.data;

            document.getElementById("userdata").innerHTML = ""

            users.map((eachUser, index) => {
                document.getElementById("userdata").innerHTML +=
                    `<tr>   
                        <th scope="row">${eachUser._id}</th>
                        <td>${eachUser.name}</td>
                        <td>${eachUser.email}</td>
                        <td>${eachUser.address}</td>
                        <td>
                        <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                        <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                        <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                    </td>
                    </tr>`
            })
        })
}

//Deleting a specific user from DB

function deleteUser(_id) {

    axios.delete(`https://server-crudapp-mongodb.herokuapp.com/${_id}`)
        .then(function (response) {
            console.log(response);

            getAllUser();

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-danger" role="alert">
                    User Deleted Success!
                </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);

        })
}


// Add row on add button click
$(document).on("click", ".add", function(){
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function(){
        if(!$(this).val()){
            $(this).addClass("error");
            empty = true;
        } else{
            $(this).removeClass("error");
        }
    });
    $(this).parents("tr").find(".error").first().focus();
    if(!empty){
        input.each(function(){
            $(this).parent("td").html($(this).val());
        });			
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").removeAttr("disabled");
    }		
});
// Edit row on edit button click
$(document).on("click", ".edit", function(){		
    $(this).parents("tr").find("td:not(:last-child)").each(function(){
        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    });		
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
});
// Delete row on delete button click
$(document).on("click", ".delete", function(){
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
});


getAllUsers();
