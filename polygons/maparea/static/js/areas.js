$(document).ready(function(){

    function editMode(){
        $('#create').attr('disabled', 'disabled');
        $('#save').removeAttr('disabled');
        $('#cancel').removeAttr('disabled');

    }

    function reset(){
        $('#save').attr('disabled', 'disabled');
        $('#create').removeAttr('disabled');
        $('#cancel').attr('disabled', 'disabled');
    }

    $('#create').click(function(){
        console.info("start to create");
        editMode();
    });

    $('#cancel').click(function(){
        console.info("canceling");
        reset();
    });

    $('#save').click(function(){
        console.info('saving');
        // TODO save properly using ajax
        reset();
    });
});