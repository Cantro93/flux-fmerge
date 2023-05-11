const {app} = require('electron');
const fs = require('fs');
function merge(file) {
	let fl = fs.readFileSync(file).toString();
	let mergers = [...fl.matchAll(/(\$merge\(".*"\);)/g)];
	let q = '';
	let targarr, tvarr = [];
	if (mergers.length > 0) {
		targarr = [...fl.match(/(\$target\(".*"\);)/g)];
		console.log(targarr);
		console.log(targarr.length - 1);
		console.log(`Merger group 0: ${mergers[0]}`);
		if (mergers[0].length > 0) {
		for (let merger of mergers[0]) {
			console.log(`Merger: ${merger}`);
			q = merger.replace(/(\$merge\(")/g, '').replace(/("\);)/g, '');
			console.log(`Query: ${q}`);
			fl = fl.replaceAll(merger, merge(q));
		}
		}
		fl = fl.replace(/(\$target\(".*"\);)/g, '').replace(/(\r\n){2,}/g, '');
		for (let targ of targarr) {
			let tval = targ.replace(/(\$target\(")/g, '').replace(/("\);)/g, '');
			console.log(targ);
			console.log(tval);
			tvarr[tvarr.length] = tval;
		}
		for (let tval of tvarr) fs.writeFileSync(tval, fl);
	};
	return fl;
}
app.whenReady().then(() => {
	let a = ((process.argv[0] == 'electron') ? 0 : 1);
	console.log(process.argv[1 + a]);
	merge(process.argv[1 + a]);
});
