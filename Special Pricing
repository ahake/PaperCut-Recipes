function printJobHook(inputs, actions) {
  if (!inputs.job.isAnalysisComplete) {
    return;
  }
  
  // Examples
  
  // 10 pages = $20
  // 50 pages = 10 @ 2.00 ($20.00)
  // 40 pages @ 1.30 (+ $52.00)
  // Total: $72.00
  // 100 pages = 10 @ 2.00 ($20.00)
  // 40 pages @ 1.30 (+$52.00)
  // 50 pages @ 1.00 (+$50.00)
  // Total: $122.00
  // 200 pages = 10 @ 2.00 ($20.00)
  // 40 pages @ 1.30 (+$52.00)
  // 50 pages @ 1.00 (+$50.00)
  // 100 pages @ 0.85 (+$85.00)
  // Total: $207.00
  
  var tier2 = 40;
  var tier3 = 50;
  var tier4 = 100;
  
  var t2mult = 1.3;
  var t3mult = 1;
  var t4mult = 0.85;
  
  var totalPages = inputs.job.totalPages;
  
  if (totalPages > tier4) {
    var extraPages = totalPages - tier4;
    var tier4cost = extraPages * t4mult;
    var logmsg = "Tier4 price reached: " + extraPages + " pages at $" + t4mult + " -- ";
    var tier3cost = tier3 * t3mult;
    logmsg += tier3 + " pages at $" + t3mult + " -- ";
    var tier2cost = tier2 * t2mult;
    logmsg += tier2 + " pages at $" + t2mult + " -- ";
    var defaultCost = parseInt(inputs.printer.groups[0]);
    var tier1cost = 10 * defaultCost;
    var totalCost = tier4cost + tier3cost + tier2cost + tier1cost;
    // actions.log.warning(tier4cost + " -- " + tier3cost + " -- " + tier2cost + " -- " + tier1cost);
    logmsg += "Total cost: $" + totalCost + " -- Including last 10 pages at $" + defaultCost;
  }
  actions.log.warning(logmsg);
  actions.job.setCost(totalCost)
}
