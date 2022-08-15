$('#add_user').submit(event => {
    alert('Form was sent to server.');
})

$('#update_user').submit(function(event){
    event.preventDefault();
    
    const unindexed_array = $(this).serializeArray();
    console.log(unindexed_array);
    const data = {};
    unindexed_array.map(record => {
        data[record['name']] = record['value'];
    })
    
    // AJAX request object
    var request = {
        'url': `http://localhost:3000/api/users/${data.id}`,
        'method': 'PUT',
        'data': data
    };

    $.ajax(request).done(response => {
        alert('User updated succesfully.');
    });
});

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}