import React, { FC, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';

const TabularFileToJson: FC = () => {
	const [jsonData, setjsonData] = useState<Array<Object>>();

	const handleUpload = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const fileInput: any = document.getElementById('upload-file');

		console.log(`fileInput: ${fileInput.files}`);
		console.log(fileInput.files);

		if (
			fileInput &&
			fileInput.files[0] &&
			fileInput.files[0].type === 'text/csv'
		) {
			Papa.parse(fileInput && fileInput.files[0], {
				complete: function (results: ParseResult<any>) {
					console.log(results);

					setjsonData(results.data);
				},
			});
		} else {
			alert(
				'file type not supported. only csv files are currently supported for now!'
			);
			setjsonData([]);
		}
	};

	return (
		<div style={{ marginTop: '48px' }}>
			<div>
				<input
					type='file'
					name='upload-file'
					id='upload-file'
					onChange={handleUpload}
				/>
			</div>
			<div>JSONDATA: {jsonData}</div>
		</div>
	);
};

export default TabularFileToJson;
