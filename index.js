const TelegramApi = require('node-telegram-bot-api')

const token = '5624706679:AAFjM2MCHmE6j9C22NqSM7kb89NOzlsjWsI'

const bot = new TelegramApi(token, {polling: true})

let start = () => {
    bot.on('message', async (msg) => {
    
        const text = msg.text
        const chatId = msg.chat.id
    
        if (text === '/start') {
            await bot.sendMessage(chatId, 'Бро, считаю курс, форматы там и все эти вещи! Кидай список')
        } 

        if (text.includes("Куплю")) {
            const formatingResult = text.replace(/[+-]?\d+[.,к]\d+/g, (a) => {
                
                a = a.replace(",", ".")
                
                if (a[0] === '-') {
                    a = a.slice(1)
                    a = (1 - a/100 - 0.0015)
                } else if (a[0] === '+')  {
                    a = (1 + a/100 + 0.0015)
                } else if (a.includes("к")) {
                    a = "1,0015"
                }
                
                return a
            });
            
            await bot.sendMessage(chatId, formatingResult)
        }
    })
}

start()

    