const fs = require("fs");
const path = require("path");

it("replaces all hashes in assets with circular hash dependencies", () => {
	const files = fs.readdirSync(__dirname);
	const a = files.find(file => /^a\.[a-f0-9]{8}\.js$/.test(file));
	const b = files.find(file => /^b\.[a-f0-9]{8}\.js$/.test(file));

	expect(a).toBeTruthy();
	expect(b).toBeTruthy();

	const aHash = a.match(/^a\.([a-f0-9]{8})\.js$/)[1];
	const bHash = b.match(/^b\.([a-f0-9]{8})\.js$/)[1];
	const aSource = fs.readFileSync(path.join(__dirname, a), "utf-8");
	const bSource = fs.readFileSync(path.join(__dirname, b), "utf-8");

	expect(aSource).toBe(`a:${aHash};b:${bHash}`);
	expect(bSource).toBe(`a:${aHash};b:${bHash}`);
	expect(aSource).not.toContain("aaaaaaaa");
	expect(aSource).not.toContain("bbbbbbbb");
});
