// Inputs must be in the same <form>
// This is not Tested, if there are error comment please
var selectorFromInput = '.arrival';
var selectorToInput = '.departure';
var addDays = 7;
$(selectorFromInput + ", " + selectorToInput).datepicker({
	minDate: 0,
	firstDay: 1,
	onSelect: function(dateText, inst) {
		if ($(this).hasClass(selectorFromInput.replace('.', ''))) {
			var quickfinderform = $(this).parents('form:first');
			if (quickfinderform) {
				if ($(this).hasClass(selectorFromInput.replace('.', ''))) {
					var nextdate = $("input" + selectorToInput, quickfinderform);

					var currdate = $(this).datepicker("getDate");
					var dateTime = $(this).datepicker("getDate");

					var departureDate = quickfinderform.find('input' + selectorToInput).datepicker('getDate');
					nextdate.datepicker("option", "minDate", dateTime);
					if (currdate >= departureDate) {
						currdate.setDate(currdate.getDate() + addDays);
						nextdate.datepicker("setDate", currdate);
					}

				}
			}
		}
		$(this).trigger('change');
	}
});