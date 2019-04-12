var friendsData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {

        var user = req.body,
            leastDiff = 0,
            totalDiffs = [],
            bestMatch = [];

        if (friendsData.length > 1) {   //more than 1 friend in comparison data; do the match routine

            friendsData.forEach(function (friend) {
                var diff = 0;

                for (var i=0; i < user.scores.length; i++)
                    diff += Math.abs(parseInt(user.scores[i]) - parseInt(friend.scores[i]));

                totalDiffs.push(diff);
            });

            leastDiff = Math.min.apply(null, totalDiffs);
            
            for (var i=0; i < totalDiffs.length; i++) {
                if (totalDiffs[i] === leastDiff)
                    bestMatch.push(friendsData[i]);
            }

            res.json(bestMatch);
        }
        else
            res.json(friendsData);  //only 1 friend in the comparison data; return it
        

        friendsData.push(req.body); //pushes record to existing friends data
    });
};