import { readdir, writeFile } from "node:fs/promises";

const imageExtensions = /\.(avif|gif|jpe?g|png|webp)$/i;

async function listImages(folder) {
	const entries = await readdir(folder, { withFileTypes: true });
	return entries
		.filter((entry) => entry.isFile() && imageExtensions.test(entry.name))
		.map((entry) => entry.name)
		.sort();
}

const imageList = {
	martinImages: await listImages("MartinsOwnImages"),
	notMartinImages: await listImages("NotMartinsImages")
};

if (imageList.martinImages.length < 2 || imageList.notMartinImages.length === 0) {
	throw new Error("Both image folders must contain enough images to play.");
}

await writeFile("image-list.json", `${JSON.stringify(imageList, null, 2)}\n`);
await writeFile("image-list.js", `window.puzzleImageList = ${JSON.stringify(imageList)};\n`);
