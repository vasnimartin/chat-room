const signUp = () => {
    let user_name = $('#user_name').val();
    let user_id = $('#user_id').val();
    let user_password = $('#user_password').val();
    let user_full_name = $('#user_full_name').val();
    $.ajax({
        type: "POST",
        url: "http://134.209.123.27:8082/signup",
        data: JSON.stringify( {"user_name":user_name, "user_id": user_id,"user_password":user_password,"user_full_name":user_full_name} ),
        success: function(resp) {
            if(resp.status) {
                $('#login').hide();
                $('#after-login').show();
                sessionStorage.setItem("user", JSON.stringify(resp.data));
                $('#me').html(`
                        <div class="me">
                            <img src="images/${resp.data.user_image}" />
                            ${resp.data.user_full_name}
                         </div>
                         `);
                socket.emit('loggedin', resp.data);
            }
        },
        dataType: "json",
        contentType: "application/json"
      });
}