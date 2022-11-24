let lat = document.querySelector("#latPos");
let long = document.querySelector("#longPos");

async function getId(url) {
	const res = await fetch(url);
	const j = await res.json();
	return j[0].id;
}

async function getPos(satelliteID) {
	const res = await fetch(
		`https://api.wheretheiss.at/v1/satellites/${satelliteID}`
	);
	const j = await res.json();

	updatePos(j.longitude, j.latitude);
}

function updatePos(longPos, latPos) {
	long.textContent = longPos;
	lat.textContent = latPos;
}

async function trackSatellite(urlID) {
	const id = await getId(urlID);
	setInterval(() => {
		getPos(id);
	}, 1000);
}
trackSatellite("https://api.wheretheiss.at/v1/satellites");
