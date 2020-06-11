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

users = User.create([
    {username: "test", email: "test@user.com", password: "password"},
    {username: "test2", email: "test2@user.com", password: "password"},
    {username: "test3", email: "test3@user.com", password: "password"},
    {username: "Demo User", email: "demouser@demo.com", password: "nobodyneedstoknowthisonelol"}
])

channels = Channel.create!([
    { name: "welcome",
    topic: "Welcome to Lax! Feel free to have a look around.",
    admin_id: users[2].id },
    { name: "test-channel-1",
        topic: "This is only temporary, but more info when I'm more creative",
        admin_id: users[2].id },
    { name: "test-channel-2",
        topic: "This is only temporary, but more info when I'm more creative",
        admin_id: users[0].id,
        is_private: false },
    { name: "dungeons-and-dragons",
        topic: "Talk about and plan your newest adventures",
        admin_id: users[1].id,
        is_private: false },
    { name: "dms-only",
        topic: "Only dungeon masters here, laugh about your players!",
        admin_id: users[1].id,
        is_private: true },
])

memberships = Membership.create([
    { user_id: users[0].id, joinable_id: channels[0].id, joinable_type: "Channel" },
    { user_id: users[1].id, joinable_id: channels[0].id, joinable_type: "Channel" },
    { user_id: users[2].id, joinable_id: channels[0].id, joinable_type: "Channel" },
    { user_id: users[3].id, joinable_id: channels[0].id, joinable_type: "Channel" },
    { user_id: users[1].id, joinable_id: channels[1].id, joinable_type: "Channel" },
    { user_id: users[0].id, joinable_id: channels[1].id, joinable_type: "Channel" },
    { user_id: users[2].id, joinable_id: channels[1].id, joinable_type: "Channel" },
    { user_id: users[3].id, joinable_id: channels[1].id, joinable_type: "Channel" },
    { user_id: users[0].id, joinable_id: channels[2].id, joinable_type: "Channel" },
    { user_id: users[2].id, joinable_id: channels[2].id, joinable_type: "Channel" },
    { user_id: users[0].id, joinable_id: channels[3].id, joinable_type: "Channel" },
    { user_id: users[1].id, joinable_id: channels[3].id, joinable_type: "Channel" },
    { user_id: users[2].id, joinable_id: channels[3].id, joinable_type: "Channel" },
    { user_id: users[3].id, joinable_id: channels[3].id, joinable_type: "Channel" },
    { user_id: users[1].id, joinable_id: channels[4].id, joinable_type: "Channel" },
    { user_id: users[2].id, joinable_id: channels[4].id, joinable_type: "Channel" },
])