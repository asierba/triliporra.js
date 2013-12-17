
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Triliporra 2014' });
};