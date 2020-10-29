const Article = require("../services/article.services.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const article = new Article({
    title: req.body.title,
    description: req.body.description
  });

  // Save Customer in the database
  Article.create(article, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Article.getAll((err, data) => {
	    if (err)
      	res.status(500).send({
      		code: "500",
          status: "failed",
        	message: err.message || "Some error occurred while retrieving articles."
      	});
	    else if (data.length > 0)
    	res.status(200).send({
    		code: "200",
        status: "success",
    		message: "OK",
      	data: data
  		});
	    else 
    	res.status(200).send({
    		code: "200",
        status: "failed",
      	message: "Data Not found"
  		});
  	});
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.articleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.articleId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Article.updateById(
    req.params.articleId,
    new Article(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.articleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.articleId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Article.remove(req.params.articleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.articleId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.articleId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Article.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
