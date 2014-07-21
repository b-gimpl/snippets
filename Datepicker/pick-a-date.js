var disableDate = new Date();

var arrival = $('#arrival').pickadate({
	format: 'dd.mm.yyyy',
	formatSubmit: 'dd.mm.yyyy',
	today: "",
	clear: "",
	min: disableDate,
	onStart: function() {
		var arrivalDate = this.get().split('.'),
			arrivalMonth = parseInt(arrivalDate[1]) - 1;
		this.set('select', [parseInt(arrivalDate[2]), arrivalMonth, parseInt(arrivalDate[0])]);
	}
});
var arrivalPicker = arrival.pickadate('picker');

var departureDisable = new Date(disableDate.setDate(disableDate.getDate() + 1));
var departure = $('#departure').pickadate({
	format: 'dd.mm.yyyy',
	formatSubmit: 'dd.mm.yyyy',
	today: "",
	clear: "",
	min: departureDisable,
	onStart: function() {
		var departureDate = this.get().split('.'),
			departureMonth = parseInt(departureDate[1]) - 1;
		this.set('select', [departureDate[2], departureMonth, departureDate[0]]);
	}
});
var departurePicker = departure.pickadate('picker');

arrivalPicker.on('set', function(_e) {
	var _from = new Date(_e.select),
		_to = departurePicker.get('select').obj;

	var newDepDate = new Date(newDep),
		newDepMonth = _from.getMonth();
	departurePicker.set('min', [_from.getFullYear(), newDepMonth, _from.getDate() + 1]);

	if (_from.getTime() >= _to.getTime()) {
		var newDep = _from.setDate(_from.getDate() + 7);
		departurePicker.set('select', newDep);
	}

});