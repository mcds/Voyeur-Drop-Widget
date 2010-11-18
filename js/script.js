$(document).ready(function() {
  // Create method to easily select code.
  $("#codeOutput").click( function() {
    $("#codeOutput").focus();
    $("#codeOutput").select();
  })
  
  // Make the frontpage button a jQueryUI button.
  $('#voyeur_launch_dialog').button();
  $('#voyeur_launch_dialog').click(function() {
    return false;
  });
  
  // Set up the options dialog box.
  $('#voyeur_dialog').dialog({
    title: 'Voyeur settings',
    autoOpen: false,
    width: 500,
    draggable: false,
    resizable: true,
    modal: true,
    buttons: {
      "Generate": function() { 
        $('#voyeur_generate').dialog('open');
        generateHTML();
      },
      "Cancel": function() {
        $(this).dialog("close"); 
      }
    }
  });

  $('#voyeur_launch_dialog').click(function() {
    $('#voyeur_dialog').dialog('open');
  });

  // Set up the generated code dialog box.
  $('#voyeur_generate').dialog({
    autoOpen: false,
    stack: true,
    width: 400,
    modal: false,
    draggable: true,
    resizable: true,
    position: 'top'
  });
});

// Saves the values of user input.
function saveValues() {
  voyeurWidth = $('#voyeur_width').attr('value');
  voyeurHeight = $('#voyeur_height').attr('value');
  voyeurTool = $('#voyeur_tool').val();
}

// Generates the code to place in the generated code textarea (#codeOutput)
function generateHTML() {
  saveValues();
  var generatedCode = '<iframe id="voyeur_iframe" width="'+ voyeurWidth +'" height="'+ voyeurHeight +'" src="http://voyeurtools.org/tool/'+ voyeurTool +'/?useReferer=true"></iframe>' + '\r\n';
  
  $('#codeOutput').attr("value", generatedCode);
  $('#afterGenerate').text('Copy the text above and paste it in your HTML code.');
}