function printJobHook(inputs, actions) {
  var DISCOURAGE_COLOR = true;
  var message;
  var response;
  var showThankYou;
  
  if (!inputs.job.isAnalysisComplete) {
    return;                                    
  }
  
  if (DISCOURAGE_COLOR && inputs.job.isColor) {
    htmlForm =
      "<html>" +
      "<div style='width:400px; height:210px; padding: 10px; color:#6F6F6F; " +
      " background: url(http://10.241.40.92/images/treebg.png) no-repeat;'>" +
      " <div style='display: inline;padding: 10px; font-weight: bold; font-size: 20px; text-align: center;'>" +
      " <img src='http://10.241.40.92/images/swirl24x24.jpg' alt='swirl.jpg'/>" +
      "&nbsp;Print Policy Alert<br>" +
      " </div>" +
      " <div style='font-size: 14px; font-weight: bold; text-align: center;'>" +
      " Please help us save the environment and some money." +
      " </div>" +
      " <br><br>" +
      " <div style='font-size: 12px;'>" +
      " This print job is <span style='color:red'><b>color</b></span>" +
      " and will cost <b>" +
      inputs.utils.formatCost(inputs.job.cost) +
      "</b> <br>" +
      "If you print in <span style='color:black'><b>black</b></span> " +
      "it will only cost <b>" +
      inputs.utils.formatCost(inputs.job.cost / 2) +
      "<br><br>" +
      "</b>Do you want save money by printing the job in grayscale?" +
      "</div><br>" +
      "<div align='center'>" +
      " <table><tr><th align='right'>Action:</th><td>" +
      " <select name='action'>" +
      " <option value='convert' selected>Yes, save the environment</option>" +
      " <option value='dont-convert'>No, I need this in colour</option>" +
      " </select>" +
      " </table>" +
      "</div>" +
      "</html>";
    
    response = actions.client.promptForForm(htmlForm, {
      dialogTitle: "Print Confirmation",
      dialogDesc: inputs.job.documentName,
      hideJobDetails: true,
      fastResponse: true
    });
    
    if (response["action"] == "convert") {
      actions.job.convertToGrayscale();
      showThankYou = true;
      actions.log.info(
        "The printing policy rules saved " +
        inputs.utils.formatNumber(inputs.job.totalPages, 0) +
        " color pages."
      );
    } else if (response["action"] == "dont-convert") {
      actions.client.sendMessage(
        "Please consider grayscale printing for your next job."
      );
      var comment = "Color reason: " + response["reasonForPrinting"] + "<br />";
      actions.job.addComment(comment);
    } else if (response == "CANCEL" || response == "TIMEOUT") {
      actions.job.cancel();
      return;
    }
  }
  
  if (showThankYou) {
    actions.client.sendMessage("Thanks for considering your print action!");
  }
}

function matchesAny(str, matchStrs, actions) {
  if (str == null || matchStrs == null) {
    return false;
  }
  
  for (var i in matchStrs) {
    if (str.match(matchStrs[i])) {
      return true;
    }
  }
  
  return false;
}​
