import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleNews from "./SingleNews.jsx";
import SortingBar from "./SortingBar.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import SearchBar from "./SearchBar.jsx";

export default function NewsContainer() {
	const [data, setData] = useState([]);
	const url = "https://hn.algolia.com/api/v1/search?tags=front_page";
	const [isLoading, setIsLoading] = useState(false);

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(url);
			setData(response.data.hits);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<SearchBar data={data} setData={setData} />
			<SortingBar data={data} setData={setData} />
			{isLoading ? (
				<LoadingSpinner />
			) : (
				data
					.slice(0, 15)
					.map((item, index) => (
						<SingleNews data={data} item={item} index={index} key={index} />
					))
			)}
		</>
	);
}
