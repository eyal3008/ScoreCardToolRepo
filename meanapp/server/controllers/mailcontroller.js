var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');

module.exports = function handlemail(app, route) {

    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {
            encoding: 'utf-8'
        }, function(err, html) {
            if (err) {
                throw err;
                callback(err);
            } else {
                callback(null, html);
            }
        });
    };
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mohamad.massalha.93@gmail.com', // Your email id
            pass: '******'
        }
    });


    app.post('/SecurityMail', function(req, res) {

        readHTMLFile(__dirname + '/views/emailtemplate.html', function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                login: req.body.Login,
                position: req.body.PositionName,
                email: req.body.Email,
                password: req.body.Password,

            };
            var htmlToSend = template(replacements);

            var email = req.body.Email;
            var data = req.body.Login;

            var text = 'Your New User Was Successfully Created';
            var mailOptions = {
                from: 'mohamad.massalha.93@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'New User Credentials', // Subject line
                //   text: text, //, // plaintext body
                //    html: '<table style="border: 1px solid black;"> <tr> <td width="350" style="border: 1px solid black ;">Foo</td><td width="80" style="border: 1px solid black ;">Foo1</td><td width="65" style="border: 1px solid black ;">Foo2</td></tr><tr style="border: 1px solid black;"><td style="border: 1px solid black;">Bar1</td><td style="border: 1px solid black;">Bar2</td><td style="border: 1px solid black;">Bar3</td></tr><tr style="border: 1px solid black;"><td style="border: 1px solid black;">Bar1</td><td style="border: 1px solid black;">Bar2</td><td style="border: 1px solid black;">Bar3</td>  </tr></table>'
                //
                html: htmlToSend
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.json({
                        yo: 'error'
                    });
                } else {
                    console.log('Message sent: ' + info.response);
                    res.json({
                        yo: info.response
                    });
                };
            });
        });
    });
    return function(req, res, next) {
        next();
    };
}
