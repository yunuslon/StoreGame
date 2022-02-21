const mongoose = require("mongoose");
let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "nama game harus diisi"] },
      category: { type: String, require: [true, "Kategori harus diisi"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "Nama koin harus diisi"] },
      coinQuantity: {
        type: String,
        require: [true, "jumlah koin harus diisi"],
      },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, "nama harus diisi"] },
      type: { type: String, require: [true, "Type pembayaran harus diisi"] },
      bankName: { type: String, require: [true, "Nama Bank harus diisi"] },
      noRekening: {
        type: Number,
        require: [true, "Nomor rekening harus diisi"],
      },
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxlength: [255, "panjang nama harus antara 3 - 255 karakter"],
      minlength: [3, "panjang nama harus antara 3 - 255 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "Akun user harus diisi"],
      maxlength: [255, "panjang nama harus antara 3 - 255 karakter"],
      minlength: [3, "panjang nama harus antara 3 - 255 karakter"],
    },
    tax: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: { type: String, require: [true, "nama harus diisi"] },
      phoneNumber: {
        type: Number,
        require: [true, "Akun user harus diisi"],
        maxlength: [13, "panjang nama harus antara 9 - 13 karakter"],
        minlength: [9, "panjang nama harus antara 9 - 13 karakter"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
