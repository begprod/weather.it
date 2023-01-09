import {promises} from "dns";

const GEO_DB_API_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${process.env.REACT_APP_GEO_DB_API_KEY}`,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
	}
};

export interface ICity {
	name: string;
	country: string;
	latitude: number;
	longitude: number;
}

export async function getCities(name: string): Promise<any> {
	return await fetch(
		`${process.env.REACT_APP_GEO_DB_API_URL}/cities?limit=10&languageCode=en&minPopulation=500000&namePrefix=${name}`,
		GEO_DB_API_OPTIONS
	)
		.then(async (response) => {
			const citiesData = await response.json();

			return {
				cities: citiesData.data.map((city: ICity) => {
					return {
						name: city.name,
						country: city.country,
						latitude: city.latitude,
						longitude: city.longitude,
					}
				})
			}
		})
}
