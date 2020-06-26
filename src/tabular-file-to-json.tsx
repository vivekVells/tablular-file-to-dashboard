import React, { FC, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';

const TabularFileToJson: FC = () => {
	const [jsonData, setjsonData] = useState<{}[]>();

	const handleUpload = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const fileInput: any = document.getElementById('upload-file');

		Papa.parse(fileInput && fileInput.files[0], {
			complete: function (results: ParseResult<any>) {
				console.log(results);

				setjsonData(results.data);
			},
		});
	};

	return (
		<div>
			<div>
				<input
					type='file'
					name='upload-file'
					id='upload-file'
					onChange={handleUpload}
				/>
			</div>
			<div style={{ marginTop: '32px' }}>JSONDATA: {jsonData}</div>
		</div>
	);
};

export default TabularFileToJson;
