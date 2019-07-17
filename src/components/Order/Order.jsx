import React from "react";

const Order = ({ setOrder }) => {
	return (
		<div>
			<select onChange={setOrder}>
				<option value="desc">Descending</option>
				<option value="asc">Ascending</option>
			</select>
		</div>
	);
};

export default Order;
