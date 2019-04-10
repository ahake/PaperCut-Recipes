/*
* Color print jobs require user confirmation
*
* Color printing is expensive so users should be encouraged to print
* in grayscale whenever they print in color. No confirmation is required
* for grayscale jobs.
*/
function printJobHook(inputs, actions) {
	/*
	* This print hook will need access to all job details
	* so return if full job analysis is not yet complete.
	* The only job details that are available before analysis
	* are metadata such as username, printer name, and date.
	*
	* See reference documentation for full explanation.
	*/
	if (!inputs.job.isAnalysisComplete) {
		// No job details yet so return.
		return;
	}
	
	if (inputs.job.isColor) {
		/* Color job, ask the use if they want to print. The job cost is displayed
		* prominently to encourage users to consider black and white printing instead.
		*/
		var response = actions.client.promptPrintCancel(
		"<html>This print job is <span style='color:red'><b>color</b></span>"
		+ " and costs <b>" + inputs.utils.formatCost(inputs.job.cost)
		+ "</b>.  You can save money by printing the job in grayscale.<br><br>" 
		+ "Do you want to print this job?</html>",
			{"dialogTitle" : "Color print job", 
			"dialogDesc"  : "Consider printing in grayscale to reduce costs"});
		if (response == "CANCEL" || response == "TIMEOUT") {
			// User did not respond, cancel the job and exit script.
			actions.job.cancel();
			return;
		}
	}
}
