var searchApi = require('./jiraSearch.js');
var localStorage = require('localStorage');
var nodemailer = require('nodemailer');
const sendmail = require('sendmail')();
var issue, ticketStatus, historyData, emailAddress, ticket;
var assignDates = [];
var assignDate = [];
var flag = false;

exports.setData = function (data) {
	issue = data;
	ticketStatus = issue.fields.status.name;
	if (ticketStatus == "V&A") {
		ticket = issue.key;
		console.log("\n" + ticket);
		console.log("Current Ticket Status - " + ticketStatus + "\n");
		historyData = issue.changelog.histories;
		for (let i = 0; i < historyData.length; i++) {
			debugger
			let date = historyData[i].created;
			let items = historyData[i].items;
			flag = false;
			for (let j = 0; j < items.length; j++) {
				let statusField = items[j].field;
				let assignee = items[j].toString;
				if (statusField == "More Info Requester") {
					debugger
					if (assignee == "Ritesh Aswal") {
						debugger
						let moveDate = date.split("T");
						let formatDate = new Date(moveDate[0]);
						assignDate = formatDate.getFullYear() + "-" + (formatDate.getMonth() + 1) + '-' + formatDate.getDate();
						assignDates = assignDate;
						console.log("assignee date " + assignDate);
						flag = true;
					}
				}
			}
			if (flag == true) {
				//first-assignee
				//emailAddress = historyData[i].author.emailAddress;
				emailAddress = issue.fields.assignee.emailAddress;
				let checkMail = emailAddress.endsWith("@niit.com");
				if (checkMail == true) {
					debugger
					console.log("email address " + emailAddress);
					sendeMail(emailAddress, ticket);
				}
			}
		}
	}
}

function sendeMail(emailAddress, ticket) {
	// var transporter = nodemailer.createTransport({
	// 	service: 'niit',
	// 	auth: {
	// 		user: 'raghav.sehgal',
	// 		pass: 'Apr@2019'
	// 	}
	// });
	// var mailOptions = {
	// 	from: 'raghav.sehgal@niit.com',
	// 	to: emailAddress,
	// 	subject: 'Mark complex your '+ticket+' ticket on-time',
	// 	text: 'Test mail'
	// };
	// transporter.sendMail(mailOptions, function (error, info) {
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log('Email sent: ' + info.response);
	// 	}
	// });


	sendmail({
		from: 'raghavsehgal739@gmail.com',
		to: 'raghav.sehgal@niit.com',
		subject: 'Mark complex your '+ticket+' ticket on-time',
		html: 'Mail of test sendmail ',
	  }, function(err, reply) {
		console.log(err && err.stack);
		console.dir(reply);
	});
}