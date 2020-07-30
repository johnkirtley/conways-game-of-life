// Generate Titles For Dropdown Menus
export const titleGenerator = (value, label, defaultValue) => {
	return value ? `${label}: ${value}` : `${label}: ${defaultValue}`;
};
