const mongoose = require('mongoose');
const Chat = require("./models/chat");

main()
  .then(async () => {
    console.log("connection successful");

    // First delete all chats
    await Chat.deleteMany({});
    console.log("All chats deleted");

    // Then insert new ones
    const res = await Chat.insertMany([
      {
        from: "sushmit",
        to: "cutie",
        msg: "Send me your nudes",
        created_at: new Date()
      },
      {
        from: "sushmit",
        to: "cutie",
        msg: "Send me your notes",
        created_at: new Date()
      },
      {
        from: "sushmit",
        to: "cutixnlse",
        msg: "Send me link",
        created_at: new Date()
      }
    ]);
    console.log("Inserted successfully:", res);
  })
  .catch(err => {
    console.log("Error:", err);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
