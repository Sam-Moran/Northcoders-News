import React from "react";

const UserSelection = ({ setUser }) => {
	return (
		<div>
			<label>Change logged in user: </label>

			<select onChange={setUser}>
				<option value="none" hidden>
					Select a user...
				</option>
				<option value="jessjelly">jessjelly</option>
				<option value="happyamy2016">happyamy2016</option>
				<option value="weegembump">weegembump</option>
				<option value="grumpy19">grumpy19</option>
				<option value="tickle122">tickle122</option>
			</select>
		</div>
	);
};

export default UserSelection;
