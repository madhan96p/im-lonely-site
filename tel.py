from telegram.ext import Updater, CommandHandler

# Step 1: Add your bot token here
BOT_TOKEN = '8127347582:AAEUBfaITrMSyrV7RCwxDIoMpM3yCNmlRsE'

# Step 2: Define command
def start(update, context):
    update.message.reply_text("Hey 👋 Welcome to ShRish Travels! How can I help you today?")

# Step 3: Setup the bot
updater = Updater(token=BOT_TOKEN, use_context=True)
dispatcher = updater.dispatcher

# Step 4: Add command handler
dispatcher.add_handler(CommandHandler('start', start))

# Step 5: Start the bot
updater.start_polling()
print("🤖 Bot is running...")
updater.idle()
