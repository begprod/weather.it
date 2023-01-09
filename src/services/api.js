export const GEO_DB_API_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${process.env.REACT_APP_GEO_DB_API_KEY}`,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
	}
};
