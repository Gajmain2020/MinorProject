import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  bookId: String,
  bookName: String,
  bookAuthor: String,
  numberOfBooks: String,
  availableNumberOfBooks: String,
  priceOfBook: String,
  issuedTo: [
    {
      studentName: String,
      studentUrn: String,
      issueDate: Date,
    },
  ],
  pastIssuedTo: [
    {
      studentName: String,
      studentUrn: String,
      issueDate: Date,
      returnDate: Date,
    },
  ],
  createdAt: { type: Date, defaultValue: new Date() },
  updatedAt: { type: Date, defaultValue: new Date() },
});

export default mongoose.model("Book", bookSchema);
