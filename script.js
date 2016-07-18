$(document).ready(function() {
    function Job(string, done) {
	this.str = string,
	this.done = done
    }
	$("#job").on("keydown", function(event) {
		if (event.which == 13) {
			$("#add").trigger("click");
		}
	});
    let jobs = [];
    let num = 0;
    let currentView = "remaining";
    //functionality for the add button
    $("#add").click(function() {
		let jobName = $("#job").val();
		if (jobName != "") {
			jobs.push(new Job(jobName, false));
            		$("tbody").append("<tr id=" + num + "><td>" + jobName + "</td><td><input type=checkbox class=checkbox></td></tr>");
			num++;
			$("#" + (num - 1) + " .checkbox").click(function() {
				jobs[Number($(this).closest("tr").attr("id"))].done ^= true;
            		});
			$("input[type=text]").val("");
			$("#job").focus();
		}
		
    });
    $("#remove").click(function() {
	for (let i = 0, index = 0; i < jobs.length; index++) {
	    if (jobs[i].done) {
		jobs.splice(i, 1);
		$("#" + index).remove();
	    } else {
		i++;
	    }
	}
	let trs = $(" tbody tr");
	for (let i = 0; i < trs.length; i++) {
	    $(trs[i]).attr("id", i);
	}
	num = trs.length;
    });
    $("nav h2").click(function() {
		for (let i = 0; i < jobs.length; i++) {
			$("#" + i + "").hide();
		}
		currentView = $(this).text();
		for (let i = 0; i < jobs.length; i++) {
			if (currentView === "All") {
				$("#" + i + "").show();
			} else if (currentView === "Remaining" && !(jobs[i].done)) {
				$("#" + i + "").show();
			} else if (currentView === "Finished" && jobs[i].done) {
				$("#" + i + "").show();
			}
		}
    	});
});