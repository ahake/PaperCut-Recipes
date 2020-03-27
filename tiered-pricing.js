/*

  This script used to set multiple pricing options for Camerons Lawyers
  
  written by
  @eloop 2017

*/

var tier1Printer = ''    # enter Tier 1 printer name
var tier2Printer = ''    # enter Tier 2 printer name
var tier3Printer = ''    # enter Tier 3 printer name

function printJobHook(inputs, actions) {
  if (!inputs.job.isAnalysisComplete) {
    return
  }
  
  var initCost = inputs.job.totalPages
  var newCost = inputs.job.cost
  var jobComment = ''
  
  if (initCost > 10) {
    newCost = inputs.job.calculateCostForPrinter(tier1Printer)
    jobComment = 'Pricing adjusted to Tier 1 pricing ($1.30/page)'
    if (initCost > 50) {
      newCost = inputs.job.calculateCostForPrinter(tier2Printer)
      jobComment = 'Pricing adjusted to Tier 2 pricing ($1.00/page)'
      if (initCost > 100) {
        newCost = inputs.job.calculateCostForPrinter(tier3Printer)
        jobComment = 'Pricing adjusted to Tier 3 pricing ($0.85/page)'
      }
    }
  }
  
  actions.job.setCost(newCost)
  actions.job.addComment(jobComment)
  
} // end of script
