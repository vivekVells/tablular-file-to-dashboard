import React, { FC } from 'react';
import Papa, { ParseResult } from 'papaparse';

interface TabularFileToJsonProps {
	jsonDataCallBkFn: Function;
}

const TabularFileToJson: FC<TabularFileToJsonProps> = ({
	jsonDataCallBkFn,
}) => {
	const handleUpload = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const fileInput: any = document.getElementById('upload-file');

		if (
			fileInput &&
			fileInput.files[0] &&
			fileInput.files[0].type === 'text/csv'
		) {
			Papa.parse(fileInput && fileInput.files[0], {
				header: true,
				skipEmptyLines: true,
				complete: function (results: ParseResult<any>) {
					console.log(results);
					jsonDataCallBkFn(results.data);
				},
			});
		} else {
			// todo: improve UX for this scenario
			alert(
				'file type not supported. only csv files are currently supported for now!'
			);
			jsonDataCallBkFn([]);
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
		</div>
	);
};

export default TabularFileToJson;
