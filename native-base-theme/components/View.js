import variable from "./../variables/platform";

export default (variables = variable) => {
  const viewTheme = {
    ".padder": {
      padding: variables.contentPadding
    }, 
	".list": {
		backgroundColor: "white", 
		marginTop: 11, 
		marginBottom: 27
	}, 
	".listHeading": {
	  	backgroundColor: "#e5edf1", 
		paddingLeft: 15, 
		paddingRight: 15, 
		paddingTop: 6, 
		paddingBottom: 11, 
		"NativeBase.Text": {
			fontSize: 14, 
			color: "#516578"
		}
  	}, 
	".noPadding": {
		paddingLeft: 0, 
		paddingRight: 0, 
		paddingTop: 0, 
		paddingBottom: 0
	}
  };

  return viewTheme;
};
