$(document).ready(function() {
    function Job(string, done) {
	this.str = string,
	this.done = done
    }
	$("#job").bind("keydown", function(event) {
		if (event.which == 13) {
			$("#add").trigger("click");
		}
	});
    var jobs = [];
    let num = 0;
    //functionality for the add button
    $("#add").click(function() {
		let job = $("#job").val();
		if (job != "") {
            $("table").append("<tr><td id=" + num + ">" + job + "</td><td><input type=\"button\" value=\"Remove\" class=\"remove\" /></td></tr>");
			num++;
			$(".remove").click(function() {
				jobs[Number($(this).siblings()[0].attr("id"))].done = true;
				$(this).closest("tr").hide();
            });
			$("input[type=text]").val("");
			$("#job").focus();
		}
		jobs.push(new Job(job, false));
    });

    //functionality for the remove buttons
    $(".remove").click(function() {
		jobs[Number($(this).siblings()[0].attr("id"))].done = true;
		$(this).closest("tr").hide();
    });
    
    $("nav h2").click(function() {
		console.log($(this).text());
		for (var i = 0; i < jobs.length; i++) {
			$("#" + i + "").closest("tr").hide();
		}
		let text = $(this).text();
		for (var i = 0; i < jobs.length; i++) {
			console.log("iteration #" + i);
			if (text === "All") {
				$("#" + i + "").closest("tr").attr("style", "display: block");
				console.log("text == all");
			} else if (text === "Remaining" && !(jobs[i].done)) {
				$("#" + i + "").closest("tr").attr("style", "display: block");
				console.log("text === Remaining && !(jobs[i].done)");
			} else if (text === "Finished" && jobs[i].done) {
				$("#" + i + "").closest("tr").attr("style", "display: block");
				console.log("text === Finished && jobs[i].done");
			
			}
		}
		$(".remove").click(function() {
			jobs[Number($(this).siblings()[0].attr("id"))].done = true;
			$(this).closest("tr").hide();
        });
    });
});