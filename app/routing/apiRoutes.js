var employeeData = require("../data/employees");

module.exports = function(app) {

    app.get("/api/employees", function(req, res) {
        
        res.json(employeeData);
    });

    app.post("/api/employees", function(req, res) {

        var user = req.body,
            leastDiff = 0,
            totalDiffs = [],
            bestMatch = [];

        if (employeeData.length > 1) {   //more than 1 employee in comparison data; do the match routine

            employeeData.forEach(function (employee) {
                var diff = 0;

                for (var i=0; i < user.scores.length; i++)
                    diff += Math.abs(parseInt(user.scores[i]) - parseInt(employee.scores[i]));

                totalDiffs.push(diff);
            });

            leastDiff = Math.min.apply(null, totalDiffs);
            
            for (var i=0; i < totalDiffs.length; i++) {
                if (totalDiffs[i] === leastDiff)
                    bestMatch.push(employeeData[i]);
            }

            res.json(bestMatch);
        }
        else
            res.json(employeeData);  //only 1 employee in the comparison data; return it
        

        employeeData.push(req.body); //pushes record to existing employees data
    });
};