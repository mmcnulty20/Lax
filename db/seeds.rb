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

welcome, search, dnd, secret = megan.admined_channels.create!([
    {
        name: "welcome",
        topic: "Welcome to Lax! Feel free to have a look around.",
    },
    {
        name: "search-for-channels",
        topic: "Use the top bar to find and join new channels!"
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

wiz = bellith.admined_channels.create!(
    name: "wizards-only",
    topic: "Discuss spell slots, the latest tomes, and which spell you should take on level up!",
).members = [bellith, caleb, bren, tiffan]

puts "Bellith created #wizards-only! Arcane casters have joined."

crit = caleb.admined_channels.create!(
    name: "mighty-nein",
    topic: "Talk all about critical role!"
).members = User.all[-5..-2]

puts "Caleb created #mighty-nein! Critical role characters have joined."

movies = demo_user.admined_channels.create!(
    name: "movies",
    topic: "For anyone that wants to talk about movies or plan movie nights!"
).members = [demo, megan]

puts "Bellith created #movies! Megan and the Demo User have joined.\n\n"
puts "All channels created!"
puts "-----"