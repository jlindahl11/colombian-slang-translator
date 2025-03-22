

$(document).ready(function() {
    $('#translate-btn').click(function() {
        const text = $('#input-text').val();
        $.ajax({
            url: '/translate',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ text: text }),
            success: function(response) {
                $('#translation-result').html(response.translation);
            }
        });
    });

    $('#send-btn').click(function() {
        sendMessage();
    });

    $('#chat-input').keypress(function(e) {
        if (e.which == 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = $('#chat-input').val();
        if (!message) return;

        addMessageToChat('user', message);
        $('#chat-input').val('');

        $.ajax({
            url: '/chat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: message }),
            success: function(response) {
                addMessageToChat('bot', response.response);
            }
        });
    }

    function addMessageToChat(sender, message) {
        const messageDiv = $('<div>')
            .addClass('chat-message')
            .addClass(sender + '-message')
            .text(message);
        
        $('#chat-messages').append(messageDiv);
        $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
    }
});