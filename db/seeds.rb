# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Channel.destroy_all
Membership.destroy_all
DirectMessage.destroy_all
Message.destroy_all

puts "Creating users..."
megan, bellith, addy, tiffan, lothar, nissa, veth, caleb, bren, jester, demo_user = User.create!([
    { username: "Megan McNulty", email: "megan.mcnulty07@gmail.com", password: "welcometolax" },
    { username: "Bellith Brighton", email: "bellith@atrea.com", password: "suggestion" },
    { username: "Addy", email: "goliath@wildmother.com", password: "pinecones" },
    { username: "Tiffan", email: "bestbard@circus.com", password: "disguisekit" },
    { username: "Table (Lothar)", email: "notatable@rogues.com", password: "onlytwolegs" },
    { username: "Nissa", email: "druids@circleoftheland.com", password: "fuckdragons" },
    { username: "Veth", email: "goblin@ihategoblins.com", password: "yezzaandluc" },
    { username: "Caleb Widogast", email: "fire@fire.fire", password: "notrauma" },
    { username: "Bren Aldric Ermendrud", email: "fire@soltryce.edu", password: "killtrent" },
    { username: "Jester Lavore", email: "pranks@traveller.con", password: "realgod" },
    {username: "Demo User", email: "demouser@demo.com", password: "nobodyneedstoknowthisonelol"}
])

puts "11 users seeded!"
puts "-----"
puts "Seeding channels...\n\n"

welcome, dnd, secret = megan.admined_channels.create!([
    {
        name: "welcome",
        topic: "Welcome to Lax! Feel free to have a look around.",
    },
    {
        name: "dungeons-and-dragons",
        topic: "Talk about and plan your latest adventures!",
    },
    {
        name: "secret-mission",
        topic: "https://youtu.be/HLrpb8Z--fs",
        is_private: true
    }
]).each { |c| c.members = User.all }

puts "Megan created #welcome, #dungeons-and-dragons, and 🔒secret mission! All users have joined."

bellith.admined_channels.create!(
    name: "wizards-only",
    topic: "Discuss spell slots, the latest tomes, and which spell you should take on level up!",
).members = [bellith, caleb, bren, tiffan]
wiz = Channel.last

puts "Bellith created #wizards-only! Arcane casters have joined."

caleb.admined_channels.create!(
    name: "mighty-nein",
    topic: "Talk all about critical role!"
).members = User.all[-5..-2]
crit = Channel.last

puts "Caleb created #mighty-nein! Critical role characters have joined."

demo_user.admined_channels.create!(
    name: "movies",
    topic: "For anyone that wants to talk about movies or plan movie nights!"
).members = [demo_user, megan]
movies = Channel.last

puts "Demo created #movies! Megan and the Demo User have joined.\n\n"
puts "All channels created!"
puts "-----"
puts "Seeding channel messages...\n\n"

welcome.messages.create!([
    {
        body: "Welcome to Lax!",
        author: megan
    },
    {
        body: "Check out channels by searching through the top bar!\nOr you can make your own.",
        author: megan
    },
    {
        body: "Chat about anything you'd like!",
        author: megan
    }
])
puts "Megan wrote 3 messages in #welcome!"

dnd.messages.create!([
    {
        body: "Anyone up for a game?",
        author: megan
    },
    {
        body: "I have this idea for a new character I really want to play!",
        author: megan
    },
    {
        body: "What's the character?",
        author: demo_user
    },
    {
        body: "Well I don't really want to spoil too much of her backstory......",
        author: megan
    },
    {
        body: "But basically she's an artificer! I'd actually go full artificer this time! NOT a full caster. Gasp, I know.\n\nWell I can also say she's gonna be young and a little oldschool British. Her name's Guinevere",
        author: megan
    },
    {
        body: "💔",
        author: bellith
    },
    {
        body: "...I knoooow. I want to play a wizard again too :(",
        author: megan
    }
])
puts "Megan, Demo, and Bellith wrote 7 messages in #dungeons-and-dragons!"

secret.messages.create!([
    {
        body: "Weeeeeee're off on a secret mission~",
        author: lothar
    },
    {
        body: ".......",
        author: nissa
    }
])
puts "Lothar and Nissa wrote 2 messages in secret-mission!"

wiz.messages.create!([
    {
        body: "Anyone know if there's a way to use suggestion over a text channel?",
        author: bellith
    },
    {
        body: "Not for any particular reason...",
        author: bellith
    },
    {
        body: "Well you're not within 30 feet of them, so...it may require a different spell.",
        author: caleb
    },
    {
        body: "But they're within 30 feet of their computer!",
        author: bellith
    },
    {
        body: "What if I send them a video of a song with the spell?\nBards are close enough to wizards, right? We're both arcane ;)",
        author: tiffan
    },
    {
        body: "...Well you did give me that scroll.",
        author: bellith
    },
    {
        body: "We may bore you if all we talk about is books.",
        author: caleb
    }
])
puts "Bellith, Caleb, and Tiffan wrote 7 messages in #wizards-only!"

crit.messages.create!([
    {
        body: "Chaos Crew!",
        author: veth
    },
    {
        body: "Yes",
        author: caleb
    },
    {
        body: "Chaos Crew!!!!",
        author: jester
    },
    {
        body: "We're missing some people though :(",
        author: jester
    },
    {
        body: "We'll have to get them over here too.",
        author: veth
    }
])
puts "Veth, Caleb, and Jester wrote 5 messages in #mighty-nein!"

movies.messages.create!([
    {
        body: "Anyone want to get together for a digital?",
        author: demo_user
    },
    {
        body: "Sure! What movie?",
        author: megan
    }
])
puts "Demo and Megan wrote 2 messages in #movies!\n\n"

puts "All channel messages seeded!"
puts "-----"
puts "Seeding direct messages...\n\n"

DirectMessage.create!.members = [demo_user, megan]
d = DirectMessage.last
d.messages.create!([
    {
        body: "Hey, you can message people privately too!",
        author: megan
    },
    {
        body: "Just hit the plus by DMs in the sidebar to create a new DM conversation between one or multiple users!",
        author: megan
    },
    {
        body: "Cool, thanks!",
        author: demo_user
    },
    
])
puts "Demo and Megan wrote 3 messages in a Direct Message between the 2 of them!"

DirectMessage.create!.members = [demo_user, nissa, addy, lothar, veth]
d2 = DirectMessage.last

d2.messages.create!([
    {
        body: "You all seem like normal enough people...wanna chat?",
        author: demo_user
    },
    {
        body: "Everyone here seems cool. Relax. Have a pinecone. :)",
        author: addy
    },
    {
        body: "FLUFFERNUTTER!!!!!!!",
        author: veth
    },
    {
        body: "You mean you won't just call me a table? :D",
        author: lothar
    },
    {
        body: "...I'm sorry about them.",
        author: nissa
    },
    {
        body: "...",
        author: demo_user
    }
])
puts "Demo, Nissa, Addy, Lothar, and Veth wrote 6 messages between the 5 of them!\n\n"

puts "All direct messages seeded!"
puts "-----"
puts "Seeding complete!\n\n"