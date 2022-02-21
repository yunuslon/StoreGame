const User = require("./model");
const bcrypt = require("bcryptjs");

module.exports = {
  viewLogin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/login/v_login", {
          title: "Page Login",
          alert,
        });
      } else {
        res.redirect("/dashboard");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },

  actLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });

      if (check) {
        if (check.status === "Y") {
          const checkPass = await bcrypt.compare(password, check.password);
          if (checkPass) {
            req.session.user = {
              id: check._id,
              email: check.email,
              status: check.status,
              name: check.name,
              role: check.role,
            };
            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", "Your password is incorrect!!");
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash("alertMessage", "Your account is not active!!");
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", "Email not found!!");
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actLogout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
