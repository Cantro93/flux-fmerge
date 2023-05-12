const {app, dialog} = require('electron');
const fs = require('fs');
const path = require('path');
function merge(file) {
	let fl = fs.readFileSync(file).toString();
	let mergers = [...fl.matchAll(/(\$merge\(".*"\);)/g)];
	let q = '';
	let targarr = [], tvarr = [], fp = [];
	targarr = fl.match(/(\$target\(".*"\);)/g);
	if (mergers.length > 0) {
		if (mergers[0].length > 0) {
		for (let merger of mergers[0]) {
			q = merger.replace(/(\$merge\(")/g, '').replace(/("\);)/g, '');
			fl = fl.replaceAll(merger, merge(path.join(path.dirname(file), q)).content);
		}
		}
	};
	if (targarr != null) {
		fl = fl.replace(/(\$target\(".*"\);)/g, '').replace(/(\r\n){3,}/g, '\r\n');
		for (let targ of targarr) {
			let tval = targ.replace(/(\$target\(")/g, '').replace(/("\);)/g, '');
			tvarr[tvarr.length] = tval;
			fp[fp.length] = path.join(path.dirname(file), tval);
		}
		for (let tval of fp) fs.writeFileSync(tval, fl);
		return {content: fl, targets: fp};
	}
	else return {content: fl};
}
app.whenReady().then(() => {
	let a;
	console.log(`Running HX Flux FMerge on the following file ${process.argv[1]}`);
	let targets = merge(process.argv[1]).targets;
    console.log('Work ended');
	let list = '';
	for (let target of targets) {
		list += (target + '\r\n');
	}
	dialog.showMessageBoxSync({
		message: `File '${process.argv[1]}'\r\nwas successfully generated and exported to following locations:\r\n${list}`,
		type: 'none',
		buttons: ['OK'],
		title: 'HX Flux FMerge'
	});
	app.exit(0);
});
