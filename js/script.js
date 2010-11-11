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
    position: 'top'
  });
});

// Saves the values of user input.
function saveValues() {
  voyeurWidth = $('#voyeur_width').attr('value');
  voyeurHeight = $('#voyeur_height').attr('value');
  voyeurTool = $('#voyeur_tool').val();
  allowAutoReveal = $('#allow_auto_reveal').attr('checked');
  allowUser = $('#allow_user').attr('checked');
}

// Generates the code to place in the generated code textarea (#codeOutput)
function generateHTML() {
  saveValues();
  var generatedCode = '<div id="voyeurContainer" style="width: '+ voyeurWidth +'; margin: 0px auto 0px auto; text-align:center;">' + '\r\n';
  generatedCode += '<img id="voyeur_logo" title="Voyeur - Reveal your Texts" src="http://coreyslavnik.com/voyeur/voyeur.png" />' + '\r\n';
  generatedCode += '<iframe id="voyeur_iframe" style="display:none;" width="'+ voyeurWidth +'" height="'+ voyeurHeight +'" src=""><p>Your browser does not support iframes - Voyeur will not run</p></iframe><br />' + '\r\n';
  if (allowUser == true) {
    generatedCode += 'Tool:&nbsp;&nbsp;' + '\r\n';
    generatedCode += '<select id="voyeur_tool" name="voyeur_tool" title="Tool">' + '\r\n';
    generatedCode += '<option id="Bubbles" value="Bubbles"'; generatedCode += (voyeurTool == 'Bubbles') ? ' selected="selected"' : ''; generatedCode += '>Bubbles</option>' + '\r\n';
    generatedCode += '<option id="Cirrus" value="Cirrus"'; generatedCode += (voyeurTool == 'Cirrus') ? ' selected="selected"' : ''; generatedCode += '>Cirrus</option>' + '\r\n';
    generatedCode += '<option id="CorpusTypeFrequenciesGrid" value="CorpusTypeFrequenciesGrid"'; generatedCode += (voyeurTool == 'CorpusTypeFrequenciesGrid') ? ' selected="selected"' : ''; generatedCode += '>Frequency Grid</option>' + '\r\n';
    generatedCode += '<option id="Links" value="Links"'; generatedCode += (voyeurTool == 'Links') ? ' selected="selected"' : ''; generatedCode += '>Links</option>' + '\r\n';
    generatedCode += '<option id="Reader" value="Reader"'; generatedCode += (voyeurTool == 'Reader') ? ' selected="selected"' : ''; generatedCode += '>Reader</option>' + '\r\n';
    generatedCode += '<option id="CorpusSummary" value="CorpusSummary"'; generatedCode += (voyeurTool == 'CorpusSummary') ? ' selected="selected"' : ''; generatedCode+= '>Summary</option>' + '\r\n';
    generatedCode += '<option id="WordCountFountain" value="WordCountFountain"'; generatedCode += (voyeurTool == 'WordCountFountain') ? ' selected="selected"' : ''; generatedCode += '>Word Count Fountain</option>' + '\r\n';
    generatedCode += '</select><br />' + '\r\n';
  }
  if ((allowUser == true) || (allowAutoReveal == false && allowUser == false)) {
    generatedCode += '<input type="button" id="voyeur_reveal" value="Reveal" onclick="launchVoyeur(\''+voyeurTool+'\','+allowUser+');" />' + '\r\n';
  }
  generatedCode += '</div>' + '\r\n';

  generatedCode += '<script type="text/javascript">' + '\r\n';
  if (allowAutoReveal == true) {
    generatedCode += 'launchVoyeur(\''+voyeurTool+'\','+allowUser+');' + '\r\n';
  }
  generatedCode += 'function launchVoyeur(voyeurTool, allowUser) {' + '\r\n';
  generatedCode += 'document.getElementById("voyeur_logo").setAttribute("style", "display:none;");' + '\r\n';
  generatedCode += 'document.getElementById("voyeur_iframe").removeAttribute("style");' + '\r\n';
  generatedCode += 'if (allowUser == true) {' + '\r\n';
  generatedCode += 'voyeurTool = document.getElementById("voyeur_tool").options[document.getElementById("voyeur_tool").selectedIndex].value;' + '\r\n' + '}' + '\r\n';
  generatedCode += 'document.getElementById("voyeur_iframe").setAttribute("src", "http://voyeurtools.org/tool/"+voyeurTool+"/?input="+document.URL);' + '\r\n' + '}' + '\r\n';
  generatedCode += '</script><br />';
  
  $('#codeOutput').attr("value", generatedCode);
  $('#afterGenerate').text('Copy the text above and paste it in your HTML code.');
}