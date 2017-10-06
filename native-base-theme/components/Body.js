import variable from './../variables/platform';

export default (variables = variable) => {
	const bodyTheme = {
		".right": {
		  alignItems: 'flex-end', 
		  marginRight: -9
		}, 
		flex: 1,
		alignItems: 'center',
		alignSelf: 'center',
	};

	return bodyTheme;
};
