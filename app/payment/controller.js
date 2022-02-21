const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("banks");
      res.render("admin/payment/v_payment", {
        name: req.session.user.name,
        title: "Page Payment",
        payment,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();
      res.render("admin/payment/create", {
        bank,
        name: req.session.user.name,
        title: "Page Create Payment",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;
      let payment = await Payment({ type, banks });
      await payment.save();

      req.flash("alertMessage", "Berhasil tambah payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.find();
      const payment = await Payment.findOne({ _id: id }).populate("banks");
      res.render("admin/payment/edit", {
        payment,
        bank,
        name: req.session.user.name,
        title: "Page Edit Payment",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;
      await Payment.findOneAndUpdate({ _id: id }, { type, banks });

      req.flash("alertMessage", "Data berhasil diupdate");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findOneAndRemove({ _id: id });

      req.flash("alertMessage", "Data berhasil dihapus!!");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actStatus: async (req, res) => {
    try {
      const { id } = req.params;

      let payment = await Payment.findOne({ _id: id });

      let status = payment.status === "Y" ? "N" : "Y";
      payment = await Payment.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );
      req.flash("alertMessage", "Berhasil ubah status!!");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
