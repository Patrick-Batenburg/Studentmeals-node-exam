const db = require('../config/db');

function isNotNumeric(input){
	return !/^-?[\d.]+(?:e-?\d+)?$/.test(input);
};


module.exports = {
    getAll(req, res, next){
        db.query('SELECT StudentNumber, Firstname, Insertion, Lastname, Email, PhoneNumber from Students', function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
        });
    },
    getById(req,res, next){
        if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])) {
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        } 
        db.query('SELECT StudentNumber, Firstname, Insertion, Lastname, Email, PhoneNumber from Students WHERE StudentNumber = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
    },
    create(req,res,next){
        if(req.body['studentNumber'] === undefined ||req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['insertion'] === undefined || req.body['email'] === undefined || req.body['phonenumber'] === undefined || req.body['password'] === undefined){
            console.log('ERROR 400',req.body);
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
        db.query('INSERT INTO Students (StudentNumber, FirstName, Insertion, LastName, Email, PhoneNumber, Password) VALUES (?,?,?,?,?,?,?)', [req.body['studentNumber'],req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['password']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(201).send(results);
          });
    },
    update(req,res,next){
        if(req.body['studentNumber'] === undefined || req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['insertion'] === undefined || req.body['email'] === undefined || req.body['phonenumber'] === undefined || req.body['password'] === undefined){
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
        if(req.body['password']!="" && req.body['password']!=undefined){
            db.query('UPDATE Students SET FirstName = ?, Insertion = ?, LastName = ?, Email =?, PhoneNumber = ?, Password = ? WHERE StudentNumber = ?', [req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['password'],req.body['studentNumber']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
        } else {
            db.query('UPDATE Students SET FirstName = ?, Insertion = ?, LastName = ?, Email =?, PhoneNumber = ? WHERE StudentNumber = ?', [req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['studentNumber']], function (error, results, fields) {
                if (error){
                    console.log(error);
                    res.status(500).send(error);
                    return;
                };
                res.status(200).send(results);
              });
        }
    },
    delete(req,res,next){
        if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])){
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        } else {
        db.query('DELETE FROM Students WHERE StudentNumber = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
        }
    },
    getImage(req,res,next){
        if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])) {
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
        db.query('SELECT Image from Students WHERE studentNumber = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
			res.setHeader('Content-Type', 'image/jpg' );
            res.status(200).send(results[0]['Image']);
          });
    }
}