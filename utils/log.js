const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
				console.log(chalk.bold.hex("#FF0000").bold('» Lỗi « ') + data);
			break;
		case "error":
			console.log(chalk.bold.hex("#FF0000").bold('» Lỗi « ') + data);
			break;
		default:
				console.log(chalk.bold.hex("#FF0000").bold(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#C0C0C0").bold('»🐧Haruna🐧« ') + data);
			break;
		case "error":
		console.log(chalk.bold.hex("#C0C0C0").bold('»🐧Haruna🐧« ') + data);
			break;
		default:
			console.log(chalk.bold.hex("#C0C0C0").bold(`»🐧Haruna🐧«  `) + data);
			break;
	}
                  }