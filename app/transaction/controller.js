const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find().populate("player");
      res.render("admin/transaction/v_transaction", {
        name: req.session.user.name,
        title: "Page transaction",
        transaction,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
  actStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      await Transaction.findByIdAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", `Berhasil ubah status`);
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
