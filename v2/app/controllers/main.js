exports.index = function(req, res) {
  res.render('main/index');
};

exports.about = function(req, res) {
  res.render('main/about');
};

exports.download = function(req, res) {
  var models = req.app.models;
  models.version.all(function (err, versions) {
    if (err) {
      throw err;
    }

    var vls = {};
    var last_vl = null;
    versions.forEach(function(v, k) {
      var vl = v.linux_version_line;
      last_vl = last_vl || vl;
      vls[vl] = vls[vl] || {};
      vls[vl][v.linux_version_short] = v;
    });

    var current_version_line = req.query.vl || last_vl;

    res.render('main/download', {versions: versions, version_lines: vls, current_version_line: current_version_line});
  });
};
