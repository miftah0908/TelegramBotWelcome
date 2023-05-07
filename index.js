const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const token = '6064499783:AAFE5igifDGWLTRShyzm6H_P2D9oora4fRY';
const welcomeAPI = 'https://rest-api.mikeykun8.repl.co/api/canvas/welcome-2?name=miftah&groupname=miftah&member=1&profilepicture=https://telegra.ph/file/438ba064eff21aa28514d.jpg&background=https://telegra.ph/file/438ba064eff21aa28514d.jpg&apikey=H6CNuKBr7g';
const leaveAPI = 'https://rest-api.mikeykun8.repl.co/api/canvas/goodbye-2?name=miftah&profilepicture=https://telegra.ph/file/438ba064eff21aa28514d.jpg&background=https://telegra.ph/file/438ba064eff21aa28514d.jpg&description=Hallo&apikey=H6CNuKBr7g';

const bot = new TelegramBot(token, { polling: true });

// Welcome message
bot.on('new_chat_members', async (msg) => {
  const randomWelcomeText = ['Welcome to the group!', 'Hello and welcome!', 'Nice to meet you!'];

  // Get random welcome text
  const welcomeText = randomWelcomeText[Math.floor(Math.random() * randomWelcomeText.length)];

  // Call the welcome API
  const response = await fetch(welcomeAPI);
  const buffer = await response.buffer();
  
  // Send message with photo and caption
  bot.sendPhoto(msg.chat.id, buffer, {
    caption: `${welcomeText}\n\nClick the button below to learn more about our group!`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Group rules',
            url: 'https://example.com/group-rules'
          },
          {
            text: 'Website',
            url: 'https://example.com'
          },
          {
            text: 'Contact us',
            url: 'https://example.com/contact'
          }
        ]
      ]
    }
  });
});

// Leave message
bot.on('left_chat_member', async (msg) => {
  const randomLeaveText = ['Goodbye!', 'Bye bye!', 'See you later!'];

  // Get random leave text
  const leaveText = randomLeaveText[Math.floor(Math.random() * randomLeaveText.length)];

  // Call the leave API
  const response = await fetch(leaveAPI);
  const buffer = await response.buffer();

  // Send message with photo and caption
  bot.sendPhoto(msg.chat.id, buffer, {
    caption: `${leaveText}\n\nWe're sorry to see you go! If you have any feedback or suggestions, feel free to contact us.`,
  });
});

// Help command
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, 'This bot welcomes new members and says goodbye to those who leave. There are no other commands available.');
});
