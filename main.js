const {app} = require('electron');
const fs = require('fs');
const path = require('path');
function merge(file) {
	let fl = fs.readFileSync(file).toString();
	let mergers = [...fl.matchAll(/(\$merge\(".*"\);)/g)];
	let q = '';
	let targarr, tvarr = [];
	if (mergers.length > 0) {
		targarr = [...fl.match(/(\$target\(".*"\);)/g)];
		if (mergers[0].length > 0) {
		for (let merger of mergers[0]) {
			q = merger.replace(/(\$merge\(")/g, '').replace(/("\);)/g, '');
			fl = fl.replaceAll(merger, merge(path.join(path.dirname(file), q)));
		}
		}
		fl = fl.replace(/(\$target\(".*"\);)/g, '').replace(/(\r\n){3,}/g, '');
		for (let targ of targarr) {
			let tval = targ.replace(/(\$target\(")/g, '').replace(/("\);)/g, '');
			tvarr[tvarr.length] = tval;
		}
		for (let tval of tvarr) fs.writeFileSync(path.join(path.dirname(file), tval), fl);
	};
	return fl;
}
app.whenReady().then(() => {
	let a = ((process.argv[0] == 'electron') ? 0 : 1);
	console.log(`Running HX Flux FMerge on the following file ${process.argv[1 + a]}`);
	merge(process.argv[1 + a]);
    	console.log('Work ended.');
});
